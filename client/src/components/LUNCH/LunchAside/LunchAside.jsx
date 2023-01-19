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
		let final = {}
		let formattedArray = []
		dishes?.forEach((dish) => {
			// check if final contains the table id
			if (!Object.keys(final).includes(dish.table_id)) {
				let array = [dish]
				final[dish.table_id] = array
			} else {
				final[dish.table_id].push(dish)
			}
		})
		Object.keys(final).forEach(id => {
			formattedArray.push(final[id])
		})
		setFormatted(formattedArray)
	}
	useEffect(() => {
		format()
	}, [dishes])
	return (
		<AsideContainer theme={theme}>
			<SubTitle>Tables</SubTitle>
			<Body theme={theme}>
				<Column>
					{formatted.map((table) => (
						<LunchTableDetail key={table[0].table_id} table={table} />
					))}
				</Column>
			</Body>
		</AsideContainer>
	)
}

export default LunchAside
