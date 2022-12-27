import Input from "../../common/Input/Input.component"
import { useDispatch } from "react-redux"
import { setDate } from "../../../redux/features/dashboard"
import { useEffect } from "react"

const DateInput = () => {
	const dateInput = document.getElementById("dashboard-input")
	const dispatch = useDispatch()

	const handleInputChange = (e) => {
		dispatch(setDate({ date: e }))
	}

    const setTodayDate = () => {
			const timestamp = new Date()
			let day = timestamp.getDate()
			let month = timestamp.getMonth() + 1
			let year = timestamp.getFullYear()

			let date = year + "-" + month + "-" + day
			if (dateInput) {
				dateInput.value = date
			}
			dispatch(setDate({ date: date }))
		}
	useEffect(() => {
		setTodayDate()
	}, [])
	return (
		<div>
			<Input type="date" id="dashboard-input" onChange={handleInputChange} />
		</div>
	)
}

export default DateInput
