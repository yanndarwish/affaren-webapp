import React from 'react'
import { AsideContainer, Body, ColumnCenter, FullCenter, SubTitle } from '../../assets/styles/common.styles'

const LunchAside = ({theme, ids}) => {
    

  return (
		<AsideContainer theme={theme}>
			<SubTitle>Tables</SubTitle>
			<Body theme={theme}>
				<FullCenter>
					<ColumnCenter></ColumnCenter>
				</FullCenter>
			</Body>
		</AsideContainer>
	)
}

export default LunchAside
