import { styled } from 'nativewind'
import { TextInputProps } from 'react-native'

import { ThemedText } from '~components/themed/ThemedText'

const InputLabel = ({
  showAsterisk,
  children,
  style,
}: TextInputProps & { showAsterisk?: boolean }) => {
  return (
    <ThemedText variant="secondary" style={style} className="text-base mb-2">
      {showAsterisk && <ThemedText className="text-red-400">*</ThemedText>}{' '}
      {children}
    </ThemedText>
  )
}

export const ThemedInputLabel = styled(InputLabel)
