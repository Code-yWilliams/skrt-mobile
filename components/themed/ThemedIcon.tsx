import Feather from '@expo/vector-icons/Feather'
import { styled, StyledComponent } from 'nativewind'
import React, { ComponentProps } from 'react'

type ThemedIconProps = ComponentProps<typeof Feather> & {
  className?: string
}

const Icon = ({ size = 24, ...props }: ThemedIconProps) => {
  return (
    <StyledComponent
      component={Feather}
      size={size}
      className="text-gray-400 dark:text-gray-100"
      {...props}
    />
  )
}

export const ThemedIcon = styled(Icon)
