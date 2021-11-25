/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import BasePicker from '@react-native-community/datetimepicker'
import { PickerDateProps } from './types'
import {
  DatePickerWrapper,
  DateTimePickerPlaceholder,
} from './DateTimePicker.styled'
import { DateTimeFormatter, ZonedDateTime } from '@js-joda/core'
import { displayFormats, IconMap } from './formats'
import { Dimensions, Keyboard, View } from 'react-native'
import Modal from '@components/Modal'
import Button from '@components/ui/Button'
import { MaterialIcons } from '@expo/vector-icons'
import i18n from 'i18n-js'

const WIDTH = Dimensions.get('screen').width * 0.8

type DateTimePickerProps = PickerDateProps

const _DateTimePicker = ({
  placeholder,
  containerStyle,
  value,
  onChange,
  customFormItemRenderer,
  mode = 'date',
  display = 'spinner',
  error,
  ...rest
}: DateTimePickerProps) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [state, setState] = React.useState<Date | undefined>()

  /**
   * Change internal state based on ouside value
   */
  React.useEffect(() => {
    setState(value)
  }, [value])

  /**
   * Internal on change to handle changes.
   * It is used for mainly for cancel antion,
   * so user can edit content and change real value after done click
   */
  const _onChange = React.useCallback(
    (_: any, selectedDate?: Date | undefined) => {
      setState(selectedDate)
    },
    []
  )

  /**
   * Show modal picker
   */
  const toggleModal = React.useCallback(() => {
    Keyboard.dismiss()
    if (!state) {
      setState?.(new Date())
    }
    setModalVisible((old) => !old)
  }, [state])

  /**
   * If user press done, fure onChange enet and hide modal
   */
  const onDone = React.useCallback(() => {
    setModalVisible((old) => !old)
    onChange?.(state)
  }, [state, onChange])

  /**
   * Handle cancel action
   */
  const onCancel = React.useCallback(() => {
    setModalVisible((old) => !old)
    setState(value)
  }, [value])

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
        <MaterialIcons name={IconMap.get(mode)} size={14} color="black" />
      </DatePickerWrapper>
    )
  }, [customFormItemRenderer, mode, placeholder, toggleModal, value, error])

  return (
    <View style={containerStyle}>
      <Modal visible={modalVisible} onClose={onDone}>
        <View style={{ height: 250, width: WIDTH }}>
          {state && (
            <BasePicker
              value={state}
              onChange={_onChange}
              {...rest}
              display={display as any}
              mode={mode as any}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              textColor="#000000"
            />
          )}
          <Button.Group style={{ paddingHorizontal: 16 }}>
            <Button
              title={i18n.t('components.dateTimePicker.cancelAction')}
              variant="secondary"
              onPress={onCancel}
            />
            <Button
              title={i18n.t('components.dateTimePicker.saveAction')}
              onPress={onDone}
            />
          </Button.Group>
        </View>
      </Modal>
      {_itemRenderer}
    </View>
  )
}

export const DateTimePicker = React.memo(_DateTimePicker)
