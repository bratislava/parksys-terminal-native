import * as React from 'react'
import { ViewProps } from 'react-native'
import {
  DescriptionsSC,
  TLayout,
  DescriptionContentTextSC,
} from './Descriptions.styled'
import DescriptionsItem, { DescriptionsItemProps } from './DescriptionsItem'

type TDescriptions = React.FunctionComponent<DescriptionsProps> & {
  Item: typeof DescriptionsItem
  Text: typeof DescriptionContentTextSC
}

interface DescriptionsProps extends ViewProps {
  /**
   * Vertical layout displays label above content and horizontal side by side
   */
  layout?: TLayout
  /**
   * Display colon after label
   */
  colon?: boolean
  children?:
    | React.ReactElement<DescriptionsItemProps>
    | React.ReactElement<DescriptionsItemProps>[]
}

/**
 * Component to display description list
 */
const Descriptions: TDescriptions = ({
  children,
  style,
  layout = 'vertical',
  colon = true,
  ...rest
}: DescriptionsProps) => {
  return (
    <DescriptionsSC {...rest} style={style as any}>
      {React.Children.toArray(children).map((child, index) =>
        React.cloneElement(child as any, {
          layout,
          colon,
          key: index,
        })
      )}
    </DescriptionsSC>
  )
}

Descriptions.Item = DescriptionsItem
Descriptions.Text = DescriptionContentTextSC

export default Descriptions
