import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

export default class DeviceStorage {
  static async getItem(key: string) {
    try {
      const item = await AsyncStorage.getItem(key)

      if (item) {
        return JSON.parse(item)
      }
    } catch {}
  }

  static async setItem(key: string, value: unknown) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }

  static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch {}
  }

  static async getSecureItem(key: string) {
    try {
      const itemJSON = await SecureStore.getItemAsync(key)

      if (itemJSON) {
        const item = JSON.parse(itemJSON)
        return item
      }
    } catch {}
  }

  static async setSecureItem(key: string, value: unknown) {
    try {
      await SecureStore.setItemAsync(key, JSON.stringify(value))
    } catch {}
  }

  static async removeSecureItem(key: string) {
    try {
      await SecureStore.deleteItemAsync(key)
    } catch {}
  }
}
