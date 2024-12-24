import { createContext, useState, useContext, useEffect } from "react"

const DailyTotalContext = createContext()

const DailyTotalProvider = ({ children }) => {
	const [cash, setCash] = useState(0)
	const [credit, setCredit] = useState(0)
	const [check, setCheck] = useState(0)
	const [total, setTotal] = useState(0)

	return (
		<DailyTotalContext.Provider
			value={{ cash, credit, check, total, setCash, setCredit, setCheck, setTotal }}
		>
			{children}
		</DailyTotalContext.Provider>
	)
}

export const useDailyTotal = () => {
	const context = useContext(DailyTotalContext)

	if (!context) {
		throw new Error("useDailyTotal must be used within a DailyTotalProvider")
	}
	return context
}

export default DailyTotalProvider
