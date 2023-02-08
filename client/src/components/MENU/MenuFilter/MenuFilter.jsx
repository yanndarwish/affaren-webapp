import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ArtTitle, Column } from "../../../assets/common/common.styles"
import { useDispatch } from "react-redux"
import {
	setMenuStatusFilter,
	setMenuTypeFilter,
} from "../../../redux/features/dishes"

const MenuFilter = () => {
	const statusFilter = useSelector((state) => state.dishes.statusFilter)
	const typeFilter = useSelector((state) => state.dishes.typeFilter)
	const dispatch = useDispatch()

	const handleStatusFilter = (e) => {
		dispatch(setMenuStatusFilter(e.target.value))
	}

	const handleTypeFilter = (e) => {
		dispatch(setMenuTypeFilter(e.target.value))
	}

	return (
		<Column>
			<ArtTitle>Filters</ArtTitle>
			<RadioGroup
				row
				aria-labelledby="demo-radio-buttons-group-label"
				value={statusFilter}
				name="status-group"
				onChange={handleStatusFilter}
			>
				<FormControlLabel value="all" control={<Radio />} label="All" />
				<FormControlLabel value="true" control={<Radio />} label="Active" />
				<FormControlLabel value="false" control={<Radio />} label="Inactive" />
			</RadioGroup>
			<RadioGroup
				row
				aria-labelledby="radio-buttons-group-label"
				value={typeFilter}
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
				<FormControlLabel value="drink" control={<Radio />} label="Drinks" />
				<FormControlLabel
					value="formula"
					control={<Radio />}
					label="Formulas"
				/>
			</RadioGroup>
		</Column>
	)
}

export default MenuFilter
