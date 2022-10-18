import React from 'react'
import { ButtonIcon } from '@components/ButtonIcon'

import * as S from './styles'

type Props = {
  name: string
  onDelete: () => void
}

export function PlayerCard({ name, onDelete }: Props) {
  return (
    <S.Container>
      <S.Icon name="person" />
      <S.Name>{name}</S.Name>

      <ButtonIcon icon="close" type="secondary" onPress={onDelete} />
    </S.Container>
  )
}
