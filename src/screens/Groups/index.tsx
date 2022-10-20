import { useCallback, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

import { getAllGroups } from '@storage/group/getAllGroups'

import * as S from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  async function fetchGroups() {
    try {
      const storagedGroups = await getAllGroups()
      setGroups(storagedGroups)
    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    }
  }

  function handleGoToNewGroup() {
    navigation.navigate('NewGroup')
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('Players', { group })
  }

  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            key={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        }
      />

      <Button title="Criar nova turma" onPress={handleGoToNewGroup} />
    </S.Container>
  )
}
