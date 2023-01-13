import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { ArtTitle, Column } from "../../../../assets/styles/common.styles"

const MenuFilter = ({ filter, setFilter }) => {
	const handleTypeFilter = (e) => {
		setFilter(e.target.value)
	}

	return (
		<Column>
			<ArtTitle>Filters</ArtTitle>
			<RadioGroup
				row
				aria-labelledby="radio-buttons-group-label"
				value={filter}
				name="location-group"
				onChange={handleTypeFilter}
			>
				<FormControlLabel value="all" control={<Radio />} label="All" />
				<FormControlLabel
					value="starter"
					control={<Radio />}
					label="Starters"
				/>
				<FormControlLabel value="main" control={<Radio />} label="Mains" />
				<FormControlLabel value="desert" control={<Radio />} label="Deserts" />
			</RadioGroup>
		</Column>
	)
}

export default MenuFilter
