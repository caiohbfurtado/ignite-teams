import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

type Props = TouchableOpacityProps & {
  active?: boolean
  title: string
}

export function Filter({ active = false, title, ...rest }: Props) {
  return (
    <S.Container isActive={active} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}
