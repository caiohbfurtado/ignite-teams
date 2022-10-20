/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLLECTION } from '../storageConfig'
import { getAllGroups } from './getAllGroups'

export async function deleteGroup(group: string) {
  try {
    const storagedGroups = await getAllGroups()
    const newGroups = JSON.stringify(
      storagedGroups.filter((currentGroup) => currentGroup !== group),
    )

    await AsyncStorage.setItem(GROUP_COLLECTION, newGroups)
  } catch (error) {
    throw error
  }
}
