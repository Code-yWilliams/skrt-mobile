import Toast from 'react-native-toast-message'

type ToastType = 'success' | 'error' | 'info' | 'neutral'

type SecondaryArgs = {
  text2?: string
  visibilityTime?: number
  onPress?: () => void
}

const showToast = (
  type: ToastType,
  text1?: string,
  secondaryArgs?: SecondaryArgs,
) => {
  const arg = {
    type,
    text1,
    autoHide: true,
    ...secondaryArgs,
  }

  Toast.show({
    ...arg,
  })
}

const toaster = {
  success: (text1: string, secondaryArgs?: SecondaryArgs) => {
    showToast('success', text1, secondaryArgs)
  },

  error: (text1?: string, secondaryArgs?: SecondaryArgs) => {
    showToast('error', text1, secondaryArgs)
  },

  info: (text1?: string, secondaryArgs?: SecondaryArgs) => {
    showToast('info', text1, secondaryArgs)
  },

  neutral: (text1?: string, secondaryArgs?: SecondaryArgs) => {
    showToast('neutral', text1, secondaryArgs)
  },

  hide: () => {
    Toast.hide()
  },
}

export default toaster
