import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
	ArtTitle,
	AsideContainer,
	Body,
	ColumnCenter,
	Container,
	FullCenter,
	FullFlex,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"

import { useNavigate } from "react-router-dom"
import InfoMessage from "../../components/common/InfoMessage/InfoMessage"
import LunchMain from "../../components/LUNCH/LunchMain"
import LunchAside from "../../components/LUNCH/LunchAside"
import { useGetActiveTablesQuery } from "../../redux/services/tablesApi"
import { tablePaginationUnstyledClasses } from "@mui/base"

const Lunch = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
    const [tableIds, setTableIds] = useState([])
    const { data } = useGetActiveTablesQuery()

    console.log(data)

    const getActiveTablesIds = (data) => {
        let ids = []
        data?.forEach(table => {
            ids.push(table.table_id)
        })
        setTableIds(ids)
    }

    console.log(tableIds)

	const navigate = useNavigate()

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

    useEffect(() => {
        if (data?.length > 0) {
            getActiveTablesIds(data)
        }
    }, [data])
	useEffect(() => {
		redirect()
	}, [])

	return (
		<FullFlex>
			<LunchMain theme={theme} ids={tableIds} />
			<LunchAside theme={theme} ids={tableIds} />
		</FullFlex>
	)
}

export default Lunch
