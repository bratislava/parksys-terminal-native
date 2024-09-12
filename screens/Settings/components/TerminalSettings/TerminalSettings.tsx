/* eslint-disable react-native/no-raw-text */
import React from 'react'
import {
  ItemLabel,
  SectionTitle,
  SettingsItem,
  TerminalSettingsSC,
} from './TerminalSettings.styled'
import i18n from 'i18n-js'
import { Switch } from 'react-native'
import { useFormik } from 'formik'
import {
  initialValues,
  ITerminalForm,
  validationSchema,
} from './TerminalSettings.schema'
import { useMutation } from '@tanstack/react-query'
import { setupTerminal } from '@services/external/papaya.api'
import { Button } from '@components/ui'

const t = i18n.t

const mutation = (data: ITerminalForm) => setupTerminal(data)

const TerminalSettings: React.FunctionComponent = () => {
  const { mutate, isPending } = useMutation({ mutationFn: mutation })

  const onSubmit = React.useCallback(
    (data: ITerminalForm) => {
      mutate(data)
    },
    [mutate]
  )

  const { values, setFieldValue, submitForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <TerminalSettingsSC>
      <SectionTitle>{t('components.terminalSettings.title')}</SectionTitle>
      <SettingsItem>
        <ItemLabel>
          {t('components.terminalSettings.hideFrontActivity')}
        </ItemLabel>
        <Switch
          onValueChange={(e) => {
            setFieldValue('hideFrontActivity', e)
          }}
          value={values.hideFrontActivity}
        />
      </SettingsItem>
      <SettingsItem>
        <ItemLabel> {t('components.terminalSettings.isKioskMode')}</ItemLabel>
        <Switch
          onValueChange={(e) => {
            setFieldValue('isKioskMode', e)
          }}
          value={values.isKioskMode}
        />
      </SettingsItem>
      <Button
        size="small"
        title={t('components.terminalSettings.saveAction')}
        style={{ marginTop: 8 }}
        variant="tertiary"
        loading={isPending}
        onPress={() => submitForm()}
      />
    </TerminalSettingsSC>
  )
}

export default React.memo(TerminalSettings)
