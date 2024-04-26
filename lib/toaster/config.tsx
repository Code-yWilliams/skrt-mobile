import React from 'react'
import { DimensionValue } from 'react-native'
import { BaseToast, BaseToastProps } from 'react-native-toast-message'

import { ThemedIcon } from '~components/themed'
import { colors } from '~theme'

type CommonToastPropsArgs = {
  backgroundColor: string
  contentColor: string
}

const commonToastProps = ({
  backgroundColor,
  contentColor,
}: CommonToastPropsArgs) => ({
  style: {
    backgroundColor,
    borderLeftWidth: 0,
    borderRadius: 8,
    width: '96%' as DimensionValue,
    height: 'auto' as DimensionValue,
  },
  contentContainerStyle: { paddingHorizontal: 16, paddingVertical: 12 },
  text1Style: {
    color: contentColor,
    fontSize: 14,
    fontWeight: '700' as '700',
  },
  text2Style: {
    color: contentColor,
    fontSize: 14,
    fontWeight: '500' as '500',
  },
})

const colorMap = {
  success: colors.green[500],
  error: colors.red[500],
  info: colors.blue[500],
  neutral: colors.gray[600],
}

const Toast = ({ backgroundColor }: { backgroundColor: string }) => {
  return (props: BaseToastProps) => {
    const { onPress } = props

    return (
      <BaseToast
        {...props}
        {...commonToastProps({
          backgroundColor,
          contentColor: 'white',
        })}
        renderTrailingIcon={
          onPress && onPress.name !== 'noop'
            ? () => (
                <ThemedIcon
                  name="chevron-right"
                  className="text-white self-center mr-2"
                />
              )
            : undefined
        }
      />
    )
  }
}

type ToastComponent = (props: BaseToastProps) => JSX.Element

type Config = {
  success?: ToastComponent
  error?: ToastComponent
  info?: ToastComponent
  neutral?: ToastComponent
}

const config: Config = {
  success: Toast({ backgroundColor: colorMap.success }),
  error: Toast({ backgroundColor: colorMap.error }),
  info: Toast({ backgroundColor: colorMap.info }),
  neutral: Toast({ backgroundColor: colorMap.neutral }),
}

export default config
