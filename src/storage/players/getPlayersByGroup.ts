/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '../storageConfig'

export async function getPlayersByGroup(group: string) {
  try {
    const storage =
      (await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)) ?? '[]'
    const players: PlayerStorageDTO[] = JSON.parse(storage)

    return players
  } catch (error) {
    throw error
  }
}
