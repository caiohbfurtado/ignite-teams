/* eslint-disable no-useless-catch */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'

import { GROUP_COLLECTION } from '../storageConfig'
import { getAllGroups } from './getAllGroups'

export async function createGroup(newGroup: string) {
  try {
    if (!newGroup.trim()) {
      throw new AppError('Informe o nome do grupo.')
    }

    const storagedGroups = await getAllGroups()

    const groupAlreadyExists = storagedGroups.some(
      (group) => group.toUpperCase() === newGroup.toUpperCase(),
    )

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome')
    }

    const newGroups = JSON.stringify([...storagedGroups, newGroup])
    await AsyncStorage.setItem(GROUP_COLLECTION, newGroups)
  } catch (error) {
    throw error
  }
}
