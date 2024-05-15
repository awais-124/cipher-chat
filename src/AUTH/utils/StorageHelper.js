import AsyncStorage from '@react-native-async-storage/async-storage'

const saveItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error('Error saving data: ', error)
    return false
  }
}

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing item: ', error)
    return false
  }
}

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value !== null ? value : false
  } catch (error) {
    console.error('Error getting item: ', error)
    return false
  }
}

const clearAll = async () => {
  try {
    const value = await AsyncStorage.clear()
    console.log({Success: 'Storage Cleared Successfully!'})
    return value || false
  } catch (error) {
    console.error('Error Clearing Storage: ', error)
    return false
  }
}

const StorageService = {
  removeItem,
  getItem,
  saveItem,
  clearAll,
}

export default StorageService
