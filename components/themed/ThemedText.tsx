import { styled } from 'nativewind'
import { Text as RNText, TextProps } from 'react-native'

type Props = TextProps & {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const Text = ({ variant = 'primary', style, ...otherProps }: Props) => {
  // Marc totally just came up with these randomly....edit as needed
  const colors = (() => {
    if (variant === 'primary') {
      return 'text-gray-600 dark:text-gray-100'
    } else if (variant === 'secondary') {
      return 'text-gray-400 dark:text-gray-300'
    } else if (variant === 'tertiary') {
      return 'text-gray-300 dark:text-gray-400'
    }
    return undefined
  })()

  return <RNText className={colors} style={style} {...otherProps} />
}

export const ThemedText = styled(Text)
