import { useSelector } from "react-redux"
import {
	CenterContainer,
	Container,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/common/common.styles"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { TextCenter } from "./Help.styles"

const Help = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const navigate = useNavigate()
	const theme = useSelector((state) => state.theme.theme)

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	useEffect(() => {
		redirect()
	}, [])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Help</Title>
			</SpaceHeader>
			<CenterContainer theme={theme}>
				<TextCenter>
					Find all the help you need{" "}
					<a
						href="https://scribehow.com/workspace#documents__dMpU7MXpQo2U2RPEA-JX_A"
						target="_blank"
						rel="noreferrer"
					>
						here
					</a>
				</TextCenter>
			</CenterContainer>
		</Container>
	)
}

export default Help
