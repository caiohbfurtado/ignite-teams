/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '../storageConfig'

import { getAllGroups } from './getAllGroups'

export async function deleteGroupByName(group: string) {
  try {
    const storagedGroups = await getAllGroups()
    const filteredGroups = storagedGroups.filter(
      (currentGroup) => currentGroup !== group,
    )
    const groups = JSON.stringify(filteredGroups)
    await AsyncStorage.setItem(GROUP_COLLECTION, groups)
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`)
  } catch (error) {
    throw error
  }
}
