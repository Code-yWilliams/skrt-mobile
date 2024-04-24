import { styled } from 'nativewind'
import React from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

export type ThemedButtonProps = TouchableOpacityProps & {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'link'
  compressed?: boolean
  endIcon?: React.ReactNode
  textClassName?: string
  numberOfLines?: number
}

export const ThemedButton = React.forwardRef(
  (
    {
      style,
      onPress,
      disabled,
      loading,
      variant = 'primary',
      children,
      compressed,
      endIcon,
      textClassName,
      numberOfLines,
    }: ThemedButtonProps,
    _,
  ) => {
    const height = compressed ? 'h-[32px]' : 'h-[50px]'
    const textColor = variant === 'primary' ? 'text-white' : 'text-green-500'
    const backgroundColor = (() => {
      if (variant === 'primary') {
        return 'bg-green-500'
      } else if (variant === 'secondary') {
        return 'bg-white'
      }
      return undefined
    })()
    const disabledStyle = disabled && 'bg-gray-300'
    const borderStyle = variant === 'secondary' && 'border'

    return (
      <TouchableOpacity
        className={`${height} border-green-500 items-center justify-center px-2 flex-row rounded-full ${backgroundColor} ${textColor} ${disabledStyle} ${borderStyle}`}
        style={style}
        onPress={onPress}
        disabled={disabled ?? loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <Text
              numberOfLines={numberOfLines}
              className={`text-center text-base font-semibold ${textColor} ${
                disabled && 'text-opacity-80'
              } ${endIcon && 'max-w-[90%]'} ${textClassName}`}
            >
              {children}
            </Text>
            {endIcon && endIcon}
          </>
        )}
      </TouchableOpacity>
    )
  },
)
