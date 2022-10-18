import React, { useMemo } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native'

import * as S from './styles'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: 'primary' | 'secondary'
}

export function ButtonIcon({ type = 'primary', icon, ...rest }: Props) {
  const theme = useTheme()

  const iconColor = useMemo(
    () => (type === 'primary' ? theme.COLORS.GREEN_700 : theme.COLORS.RED),
    [theme, type],
  )

  return (
    <S.Container type={type} {...rest}>
      <MaterialIcons name={icon} color={iconColor} size={24} />
    </S.Container>
  )
}
