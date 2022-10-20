/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getPlayersByGroup } from '@storage/players/getPlayersByGroup'
import { PLAYER_COLLECTION } from '../storageConfig'

export async function deletePlayerByGroup(group: string, name: string) {
  try {
    const storagedPlayers = await getPlayersByGroup(group)
    const newPlayers = JSON.stringify(
      storagedPlayers.filter((player) => player.name !== name),
    )

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, newPlayers)
  } catch (error) {
    throw error
  }
}
