import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Spacer } from './Spacer'
type QueueType = {
  size?: number
  role?: string
  children: any
  otherStyle?: any
  justifyContent?:
    | 'flex-start'
    | 'space-between'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-evenly'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  height?: number | string
  width?: number | string
  padding?: number
}
export const Queue: FC<QueueType> = (props) => {
  const {
    size = 0,
    children,
    role,
    justifyContent,
    alignItems,
    padding,
  } = props
  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: role,
      justifyContent,
      alignItems,
      padding: padding,
    },
  })
  return (
    <View style={style.container}>
      {React.Children.toArray(children).map((child, index) => {
        if ((index = 0)) {
          return { child }
        }
        return (
          <View key={index}>
            <Spacer horizontal={false} size={size} />
            {child}
          </View>
        )
      })}
    </View>
  )
}
