import { useSelector } from "react-redux"
import Button from "../../components/Button/Button.component"
import Input from "../../components/Input/Input.component"
import { Body, Container, Header, SearchSection, SubTitle, Title } from "../../assets/styles/common.styles"

const Pos = () => {
	const theme = useSelector((state) => state.theme.theme)
	return (
		<Container theme={theme}>
			<Header>
				<Title theme={theme}>Pos</Title>
			</Header>
			<SearchSection>
				<Input theme={theme} />
				<Button color="purple" title="No Barcode" />
			</SearchSection>
			<Body theme={theme}>
				<div>
					<SubTitle>Panier</SubTitle>
				</div>
				<div></div>

				<div>
					<div>
						<Button color="purple" title="Receipt" />
						<Button color="purple" title="Drawer" />
						<Button color="purple" title="Discount" />
					</div>
					<div>
						<Button color="green" title="Continue to Payment" />
					</div>
				</div>
			</Body>
		</Container>
	)
}

export default Pos
