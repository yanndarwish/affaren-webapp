import { useSelector } from "react-redux"
import Button from "../../components/Button/Button.component"
import Input from "../../components/Input/Input.component"

const Pos = () => {
	const theme = useSelector((state) => state.theme.theme)
	return (
		<div>
			<div>
				<h1>Pos</h1>
			</div>
			<div>
				<Input theme={theme} />
				<Button color="purple" title="No Barcode" />
			</div>
			<div>
				<div>
					<h2>Panier</h2>
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
			</div>
		</div>
	)
}

export default Pos
