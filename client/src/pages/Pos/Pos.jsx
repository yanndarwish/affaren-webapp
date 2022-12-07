import { useSelector } from "react-redux"
import Button from "../../components/Button/Button.component"
import Input from "../../components/Input/Input.component"
import { Body, Container, Header, SearchSection, SubTitle, Title } from "../../assets/styles/common.styles"
import BarcodeInput from "../../components/BarcodeInput/BarcodeInput"
import { Box, Grid } from "@mui/material"

const Pos = () => {
	const theme = useSelector((state) => state.theme.theme)
	return (
		<Grid item xs>
			<Box xs={12}>
				<Title theme={theme}>Pos</Title>
			</Box>
			<SearchSection>
				<BarcodeInput />
				<Button title="No Barcode" />
			</SearchSection>
			<Body theme={theme}>
				<div>
					<SubTitle>Panier</SubTitle>
				</div>
				<div></div>

				<div>
					<div>
						<Button title="Receipt" />
						<Button title="Drawer" />
						<Button title="Discount" />
					</div>
					<div>
						<Button color="success" title="Continue to Payment" />
					</div>
				</div>
			</Body>
		</Grid>
	)
}

export default Pos
