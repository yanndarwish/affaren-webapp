import Button from "../../common/Button/Button.component"
import {
	CenterContainer,
	ColumnSpace,
	HorizontalEnd,
	SubTitle,
} from "../../../assets/common/common.styles"
import { Container, Text } from "../Card.styles"

const RefreshDialog = ({ theme }) => {
	const refreshPage = () => {
		window.location.reload()
	}

	return (
		<CenterContainer theme={theme}>
			
		<Container theme={theme}>
			<ColumnSpace>
				<SubTitle>Warning</SubTitle>
				<Text>Only one tab can be open</Text>
				<HorizontalEnd>
					<Button
						title="Refresh"
						color="success"
						onClick={refreshPage}
						></Button>
				</HorizontalEnd>
			</ColumnSpace>
		</Container>
						</CenterContainer>
	)
}

export default RefreshDialog
