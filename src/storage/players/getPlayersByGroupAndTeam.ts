/* eslint-disable no-useless-catch */
import { getPlayersByGroup } from './getPlayersByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function getPlayersByGroupAndTeam(group: string, team: string) {
  try {
    const storagedPlayersByGroup = await getPlayersByGroup(group)
    const playersByTeam: PlayerStorageDTO[] = storagedPlayersByGroup.filter(
      (player) => player.team === team,
    )

    return playersByTeam
  } catch (error) {
    throw error
  }
}
