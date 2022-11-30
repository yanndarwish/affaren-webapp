
import { useSelector } from "react-redux" 
import Input from "../../components/Input/Input.component"
import Button from "../../components/Button/Button.component"
import { Body, Container, Flex, SpaceHeader, SubTitle, Title } from "../../assets/styles/common.styles"

const Help = () => {
	const theme = useSelector((state) => state.theme.theme)

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Help</Title>
				<Flex>
					<Input theme={theme} />
					<Button color="purple" title="Search" />
				</Flex>
			</SpaceHeader>
			<Body theme={theme}>
				<div>
					<SubTitle>Section</SubTitle>
				</div>
				<div></div>

				<div>
					<div></div>
					<div></div>
				</div>
			</Body>
		</Container>
	)
}

export default Help
