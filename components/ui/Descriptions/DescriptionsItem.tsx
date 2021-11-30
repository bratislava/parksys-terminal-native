import * as React from 'react'
import { ViewStyle } from 'react-native'
import {
  DescriptionContentSC,
  DescriptionLabelSC,
  DescriptionLabelTextSC,
  DescriptionsItemSC,
  TLayout,
} from './Descriptions.styled'

export interface DescriptionsItemProps {
  /**
   * Label to display
   */
  label?: string
  /**
   * Layout of item
   */
  layout?: TLayout
  /**
   * Display colon after label
   */
  colon?: boolean
  /**
   * Content of description
   */
  children?: React.ReactElement | React.ReactElement[]
  /**
   * Style of body
   */
  style?: StyleProp<ViewStyle>
}

const DescriptionsItem: React.FunctionComponent<DescriptionsItemProps> = ({
  label,
  layout,
  children,
  colon,
  style,
}) => {
  return (
    <DescriptionsItemSC layout={layout}>
      <DescriptionLabelSC layout={layout}>
        {/* eslint-disable-next-line react-native/no-raw-text */}
        <DescriptionLabelTextSC>{`${label}${
          colon ? ':' : ''
        }`}</DescriptionLabelTextSC>
      </DescriptionLabelSC>
      <DescriptionContentSC style={style} layout={layout}>
        {children}
      </DescriptionContentSC>
    </DescriptionsItemSC>
  )
}

export default DescriptionsItem
