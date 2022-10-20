import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'

import * as S from './styles'

import { AppError } from '@utils/AppError'
import { addPlayerByGroup } from '@storage/players/addPlayerByGroup'
import { getPlayersByGroupAndTeam } from '@storage/players/getPlayersByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/players/PlayerStorageDTO'
import { deletePlayerByGroup } from '@storage/players/deletePlayerByGroup'
import { deleteGroupByName } from '@storage/group/deleteGroupByName'

type RouteParams = {
  group: string
}

export function Players() {
  const route = useRoute()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [team, setTeam] = useState('Time A')
  const [newPlayerName, setNewPlayerName] = useState('')
  const newPlayerNameInputRef = useRef<TextInput>(null)
  const { group } = route.params as RouteParams

  function handleChangeActiveTeam(currentTeam: string) {
    setTeam(currentTeam)
  }

  async function hadnleAddPlayer() {
    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await addPlayerByGroup(newPlayer, group)
      setPlayers((prevState) => [newPlayer, ...prevState])
      newPlayerNameInputRef.current?.blur()
      setNewPlayerName('')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo jogador', error.message)
      } else {
        Alert.alert(
          'Novo jogaodr',
          'Não foi possível adicionar um novo jogador',
        )
      }
    }
  }

  async function handleDeletePlayerByGroup(name: string) {
    try {
      await deletePlayerByGroup(group, name)
      setPlayers((prevState) =>
        prevState.filter((player) => player.name !== name),
      )
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Deletar jogador',
        'Não foi possível deletar o jogador selecionado',
      )
    }
  }

  async function removeGroup() {
    try {
      await deleteGroupByName(group)
      navigation.navigate('Groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Deletar grupo', 'Não foi possível deletar o grupo.')
    }
  }

  function handleDeleteGroup() {
    Alert.alert('Deletar grupo', 'Deseja remover o grupo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => removeGroup() },
    ])
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)
      const playersByTeam = await getPlayersByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar os jogadores do time selecionado',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <S.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={hadnleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={hadnleAddPlayer} />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              active={team === item}
              onPress={() => handleChangeActiveTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <S.NumberOfPlayers>{players.length}</S.NumberOfPlayers>
      </S.HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onDelete={() => handleDeletePlayerByGroup(item.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ListEmpty message="Ainda não há nenhum jogador nesse time" />
          }
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover grupo"
        type="secondary"
        onPress={handleDeleteGroup}
      />
    </S.Container>
  )
}
