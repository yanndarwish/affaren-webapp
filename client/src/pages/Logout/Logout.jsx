import { useSelector } from "react-redux"
import { CenterContainer } from "../../assets/common/common.styles.js"
import { ModalLogout } from "../../components/Cards/ModalLogout/ModalLogout.js"
import { useModal } from "../../components/shared/modal/index.jsx"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
	const theme = useSelector((state) => state.theme.theme)
	const modalLogout = useModal()
	const navigate = useNavigate()

	const handleCancel = () => {
		navigate(-1)
	}

	useEffect(() => {
		modalLogout.openModal()
	}, [])

	return (
		<CenterContainer theme={theme}>
			<ModalLogout controller={modalLogout} onCancel={handleCancel} />
		</CenterContainer>
	)
}
export default Logout
