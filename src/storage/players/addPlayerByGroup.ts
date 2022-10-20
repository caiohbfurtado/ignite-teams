/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AppError } from '@utils/AppError'

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '../storageConfig'
import { getPlayersByGroup } from './getPlayersByGroup'

export async function addPlayerByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
) {
  try {
    if (!newPlayer.name.trim()) {
      throw new AppError('Preencha corretamente o campo com o nome do jogador.')
    }

    const storagedPlayers = await getPlayersByGroup(group)

    const playerAlreadyExists = storagedPlayers.some(
      (player) => player.name.toUpperCase() === newPlayer.name.toUpperCase(),
    )
    if (playerAlreadyExists) {
      throw new AppError('Já existe um jogador nesse grupo com o mesmo nome.')
    }

    const newPlayersStoraged = JSON.stringify([newPlayer, ...storagedPlayers])
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      newPlayersStoraged,
    )
  } catch (error) {
    throw error
  }
}
