import * as React from 'react'
import { Picker as BasePicker } from '@react-native-picker/picker'
import { PickerPlaceholder, PickerSC, PickerWrapper } from './Picker.styled'
import {
  DynamicColorIOS,
  Keyboard,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import { PickerProps } from './pickerType'
import Modal from '@components/Modal'
import Button from '../Button'
import i18n from 'i18n-js'
import { MaterialIcons } from '@expo/vector-icons'

const WIDTH = Dimensions.get('screen').width * 0.8

type TPicker = <T>(
  props: PickerProps<T> & { ref?: React.ForwardedRef<BasePicker<T>> }
) => ReturnType<typeof _Picker>

const _Picker = <T extends any>(
  {
    children,
    error,
    placeholder,
    selectedValue,
    onValueChange,
    containerStyle,
    itemStyle,
    dropdownIconColor,
    ...rest
  }: PickerProps<T>,
  ref: React.Ref<BasePicker<T>>
) => {
  const [modalVisible, setModalVisible] = React.useState(false)

  const [state, setState] = React.useState<{
    itemValue?: T
    itemIndex?: number
  }>({})

  /**
   * Change internal state based on ouside value
   */
  React.useEffect(() => {
    setState({
      itemValue: selectedValue,
      itemIndex: 0,
    })
  }, [selectedValue])

  /**
   * Internal on change to handle changes.
   * It is used for mainly for cancel antion,
   * so user can edit content and change real value after done click
   */
  const _onChange = React.useCallback((itemValue: T, itemIndex: number) => {
    setState({ itemValue, itemIndex })
  }, [])

  /**
   * Show modal picker
   */
  const toggleModal = React.useCallback(() => {
    Keyboard.dismiss()
    setModalVisible((old) => !old)
  }, [])

  /**
   * If user press done, fure onChange enet and hide modal
   */
  const onDone = React.useCallback(() => {
    if (state.itemValue && state.itemIndex !== undefined) {
      onValueChange?.(state.itemValue, state.itemIndex)
      setModalVisible((old) => !old)
    }
  }, [state, onValueChange])

  /**
   * Handle cancel action
   */
  const onCancel = React.useCallback(() => {
    setModalVisible((old) => !old)
    setState?.({
      itemValue: selectedValue,
      itemIndex: 0,
    })
  }, [selectedValue])

  /**
   * Extract options from children
   */
  const _options = React.useMemo(() => {
    return React.Children.map(children, (child: any) => ({
      value: child.props.value,
      label: child.props.label,
    }))
  }, [children])

  /**
   * Find selected value to display in fake input
   */
  const _selected = React.useMemo(
    () => _options?.find((opt) => opt.value === selectedValue)?.label || '-',
    [_options, selectedValue]
  )

  return (
    <PickerSC style={containerStyle}>
      <PickerWrapper onPress={toggleModal} error={error}>
        <PickerPlaceholder>{_selected || placeholder}</PickerPlaceholder>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={dropdownIconColor ?? 'black'}
        />
      </PickerWrapper>
      <Modal visible={modalVisible} onClose={onCancel}>
        <View style={{ height: 250, width: WIDTH }}>
          <BasePicker
            selectedValue={state.itemValue}
            onValueChange={_onChange}
            itemStyle={[itemStyle, styles.item]}
            ref={ref}
            {...rest}
          >
            <Picker.Item label="-" value="" />
            {children}
          </BasePicker>
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
    </PickerSC>
  )
}

const styles = StyleSheet.create({
  item: {
    color: DynamicColorIOS({
      light: 'black',
      dark: 'white',
    }),
  },
})

export const Picker = React.forwardRef(_Picker) as unknown as TPicker & {
  Item: typeof BasePicker.Item
}

Picker.Item = BasePicker.Item
