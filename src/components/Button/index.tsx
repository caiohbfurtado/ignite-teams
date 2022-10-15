import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

type Props = TouchableOpacityProps & {
  title: string
  type?: 'primary' | 'secondary'
}

export function Button({ title, type = 'primary', ...rest }: Props) {
  return (
    <S.Container type={type} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}
