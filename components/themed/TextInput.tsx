import React, { useImperativeHandle, useMemo, useRef } from 'react'
import {
  Button,
  InputAccessoryView,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'

import { ThemedInputLabel } from '~components/themed/ThemedInputLabel'
import { t } from '~lib/i18n'
import { colors } from 'theme'

import { ThemedText } from './ThemedText'

export type ThemedTextInputProps = TextInputProps & {
  inputClassName?: string
  errorClassName?: string
  error?: string
  showInputAccessoryView?: boolean
  halfWidth?: boolean
  label?: string
  required?: boolean
  labelClassName?: string
  adornment?: React.ReactNode
  adornmentPosition?: 'start' | 'end'
}

export const ThemedTextInput = React.forwardRef(
  (
    {
      style,
      inputClassName,
      error,
      errorClassName,
      showInputAccessoryView,
      halfWidth,
      label,
      required,
      labelClassName,
      multiline,
      adornment,
      adornmentPosition = 'start',
      ...otherProps
    }: ThemedTextInputProps,
    ref: React.Ref<TextInput>,
  ) => {
    const innerRef = useRef<TextInput>(null)

    useImperativeHandle(ref, () => innerRef.current!)

    const bgColor = error ? 'bg-red-100' : 'bg-gray-200'
    const height = multiline ? 'h-[120px]' : 'h-[50px]'
    const width = halfWidth ? 'w-1/2' : 'w-full'
    const paddingVertical = multiline ? 'py-2' : 'py-1'
    const inputBasis =
      adornment && adornmentPosition === 'end' ? 'basis-[90%]' : 'basis-[100%]'

    const inputAccessoryViewID = useMemo(() => {
      return `inputAccessoryViewID-${Math.random()}`
    }, [])

    return (
      <View style={style}>
        {(label ?? required) && (
          <ThemedInputLabel showAsterisk={required} className={labelClassName}>
            {label}
          </ThemedInputLabel>
        )}
        <View
          className={`${bgColor} flex-row items-center justify-between rounded overflow-hidden ${width}`}
        >
          {adornment && adornmentPosition === 'start' && (
            <View className="pl-4">{adornment}</View>
          )}
          <TextInput
            ref={innerRef}
            inputAccessoryViewID={inputAccessoryViewID}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'auto'}
            placeholderTextColor={error ? colors.red[500] : undefined}
            className={`${inputBasis} ${height} bg-transparent text-gray-600 border-gray-300 rounded border-1 ${paddingVertical} px-2 border-radius-1 text-base leading-5 ${inputClassName}`}
            {...otherProps}
          />
          {adornment && adornmentPosition === 'end' && (
            <View className="items-center justify-center basis-[10%] pr-2">
              {adornment}
            </View>
          )}
        </View>
        {showInputAccessoryView && (
          <InputAccessoryView nativeID={inputAccessoryViewID}>
            <View className="flex-row justify-end px-2 bg-gray-200 border-t border-gray-300 ">
              <Button
                onPress={() => innerRef.current?.blur()}
                title={t('done')}
              />
            </View>
          </InputAccessoryView>
        )}

        {error && (
          <ThemedText className={`text-red-500 text-xs mt-1 ${errorClassName}`}>
            {error}
          </ThemedText>
        )}
      </View>
    )
  },
)
