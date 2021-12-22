import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import {
  DescriptionContentSC,
  DescriptionLabelSC,
  DescriptionLabelTextSC,
  DescriptionsItemSC,
  DescriptionsContentSC,
  TLayout,
  PrefixSC,
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
  children?: React.ReactNode | React.ReactNodeArray
  /**
   * Style of body
   */
  style?: StyleProp<ViewStyle>
  /**
   * Prefix element for row
   */
  prefix?: React.ReactNode
}

const DescriptionsItem: React.FunctionComponent<DescriptionsItemProps> = ({
  label,
  layout,
  children,
  colon,
  style,
  prefix,
}) => {
  return (
    <DescriptionsItemSC>
      {prefix ? <PrefixSC>{prefix}</PrefixSC> : null}
      <DescriptionsContentSC layout={layout}>
        <DescriptionLabelSC layout={layout}>
          {/* eslint-disable-next-line react-native/no-raw-text */}
          <DescriptionLabelTextSC>{`${label}${
            colon ? ':' : ''
          }`}</DescriptionLabelTextSC>
        </DescriptionLabelSC>
        <DescriptionContentSC style={style} layout={layout}>
          {children}
        </DescriptionContentSC>
      </DescriptionsContentSC>
    </DescriptionsItemSC>
  )
}

export default DescriptionsItem
