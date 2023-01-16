import {
	AsideContainer,
	Body,
	Column,
	SubTitle,
} from "../../assets/common/common.styles"
import LunchTableDetail from "./LunchTableDetail"

const LunchAside = ({ theme, ids }) => {
	return (
		<AsideContainer theme={theme}>
			<SubTitle>Tables</SubTitle>
			<Body theme={theme}>
				<Column>
					{ids.map((id) => (
						<LunchTableDetail key={"detail-" + id} id={id} />
					))}
				</Column>
			</Body>
		</AsideContainer>
	)
}

export default LunchAside
