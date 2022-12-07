
import { useSelector } from "react-redux" 
import Input from "../../components/Input/Input.component"
import Button from "../../components/Button/Button.component"
import { Grid } from "@mui/material"
import { Body, Container, Flex, SpaceHeader, SubTitle, Title } from "../../assets/styles/common.styles"

const Help = () => {
	const theme = useSelector((state) => state.theme.theme)

	return (
		<Grid item>
			<SpaceHeader>
				<Title>Help</Title>
				<Flex>
					<Input label="Help"/>
					<Button title="Search" />
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
		</Grid>
	)
}

export default Help
