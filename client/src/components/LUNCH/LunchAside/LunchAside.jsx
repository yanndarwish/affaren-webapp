import { formatMuiErrorMessage } from "@mui/utils"
import { useEffect, useState } from "react"
import {
	AsideContainer,
	Body,
	Column,
	SubTitle,
} from "../../../assets/common/common.styles"
import LunchTableDetail from "../LunchTableDetail/LunchTableDetail"

const LunchAside = ({ theme, dishes }) => {
	const [formatted, setFormatted] = useState([])
	
	const format = () => {
		console.log(dishes)
		let final =  {}

		dishes?.forEach(dish => {
			// check if final contains the table id
			console.log(Object.keys(final).includes(dish.table_id))
			if (!Object.keys(final).includes(dish.table_id)) {

			}

		})
		
	}
	useEffect(() => {
		format()
	}, [dishes])
	return (
		<AsideContainer theme={theme}>
			<SubTitle>Tables</SubTitle>
			<Body theme={theme}>
				<Column>
					{/* {ids.map((id) => (
						<LunchTableDetail key={"detail-" + id} id={id} />
					))} */}
				</Column>
			</Body>
		</AsideContainer>
	)
}

export default LunchAside
