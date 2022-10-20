import React, { useState } from 'react'
import { Alert } from 'react-native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

import * as S from './styles'
import { useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import { createGroup } from '@storage/group/createGroup'

export function NewGroup() {
  const navigation = useNavigation()
  const [group, setGroup] = useState('')

  async function handleNewGroup() {
    try {
      await createGroup(group)
      navigation.navigate('Players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message)
      } else {
        Alert.alert('Novo grupo', 'Não foi possível criar um novo grupo.')
        console.log(error)
      }
    }
  }

  return (
    <S.Container>
      <Header showBackButton />

      <S.Content>
        <S.Icon />

        <Highlight
          title="Novo Grupo"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={setGroup}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </S.Content>
    </S.Container>
  )
}
