/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import BasePicker, {
  AndroidEvent,
} from '@react-native-community/datetimepicker'
import { PickerDateProps } from './types'
import {
  DatePickerWrapper,
  DateTimePickerPlaceholder,
} from './DateTimePicker.styled'
import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core'
import { displayFormats } from './formats'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

/**
 * Combine date and time to one timestamp on android
 * @param date date from date picker
 * @param time date from time picker
 */
function combineDateTime(date?: Date, time?: Date) {
  const year = date!.getFullYear()
  const month = date!.getMonth()
  const day = date!.getDate()
  const hours = time?.getHours()
  const minutes = time?.getMinutes()
  return new Date(year, month, day, hours, minutes)
}

type DateTimePickerProps = PickerDateProps

const _DateTimePicker = ({
  value,
  mode = 'date',
  placeholder,
  containerStyle,
  onChange,
  customFormItemRenderer,
  error,
  ...rest
}: DateTimePickerProps) => {
  const [isVisible, setIsVisible] = React.useState(false)

  const currentDateRef = React.useRef(value)
  const [currentMode, setCurrentMode] = React.useState<any>(undefined)
  const [state, setState] = React.useState<Date | undefined>()

  /**
   * Change internal state based on ouside value
   */
  React.useEffect(() => {
    setState(value)
  }, [value])

  /**
   * Show modal picker
   */
  const toggleModal = React.useCallback(() => {
    if (!value) {
      setState?.(new Date())
    }
    setIsVisible((old) => !old)
  }, [value])

  /**
   * Effect to determin mode on android.
   * Androit doesnt have datetiem picker, so we have to symulate it.
   */
  React.useEffect(() => {
    if (isVisible && currentMode === null) {
      setCurrentMode(mode === 'time' ? 'time' : 'date')
    } else if (!isVisible) {
      setCurrentMode(null)
    }
  }, [isVisible, currentMode, mode])

  /**
   * Listen for change in picer.
   *
   * @param event Event
   * @param date selected date
   */
  const _onChange = React.useCallback(
    (event: AndroidEvent, date?: Date) => {
      /** if user click cancel, set previous value and close */
      if (event.type === 'dismissed') {
        setIsVisible(false)
        return
      }

      /** else if datetime, process two steps */
      if (mode === 'datetime') {
        if (currentMode === 'date') {
          setCurrentMode('time')
          currentDateRef.current = date ? new Date(date) : new Date()
          return
        } else {
          setIsVisible(false)
          onChange?.(combineDateTime(currentDateRef.current, date))
        }
      } else {
        /** else close modal and call change */
        setIsVisible(false)
        onChange?.(date)
      }
    },
    [currentMode, mode, onChange]
  )

  const _itemRenderer = React.useMemo(() => {
    return customFormItemRenderer ? (
      customFormItemRenderer(toggleModal, value)
    ) : (
      <DatePickerWrapper onPress={toggleModal} error={error}>
        <DateTimePickerPlaceholder>
          {value && mode
            ? ZonedDateTime.parse(value.toISOString()).format(
                DateTimeFormatter.ofPattern(displayFormats[mode])
              )
            : placeholder}
        </DateTimePickerPlaceholder>
        <MaterialIcons name="date-range" size={16} color="black" />
      </DatePickerWrapper>
    )
  }, [customFormItemRenderer, mode, placeholder, toggleModal, value, error])

  return (
    <View style={containerStyle}>
      {_itemRenderer}
      {!(!isVisible || !currentMode) && (
        <BasePicker
          {...rest}
          onChange={_onChange as any}
          value={state!}
          mode={currentMode}
        />
      )}
    </View>
  )
}

export const DateTimePicker = React.memo(_DateTimePicker)
