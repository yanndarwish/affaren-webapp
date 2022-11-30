
import { useSelector } from "react-redux" 
import Input from "../../components/Input/Input.component"
import Button from "../../components/Button/Button.component"

const Help = () => {
	const theme = useSelector((state) => state.theme.theme)

	return (
		<div>
			<div>
				<h1>Help</h1>
				<div>
					<Input theme={theme} />
					<Button color="purple" title="Search" />
				</div>
			</div>
			<div>
				<div>
					<h2>Products</h2>
				</div>
				<div></div>

				<div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	)
}

export default Help
