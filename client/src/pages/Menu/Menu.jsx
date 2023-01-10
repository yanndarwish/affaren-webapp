import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Title } from '../../assets/styles/common.styles'

const Menu = () => {
	const theme = useSelector((state) => state.theme.theme)

  return (
		<Container theme={theme}>
			<Title>Kitchen</Title>
		</Container>
	)
}

export default Menu
