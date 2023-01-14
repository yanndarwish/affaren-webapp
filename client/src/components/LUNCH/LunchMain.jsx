import { useEffect, useState } from "react"
import {
	Container,
	Body,
	ColumnCenter,
	FullCenter,
	Title,
} from "../../assets/styles/common.styles"
import { useGetTableProductsQuery } from "../../redux/services/tableProductsApi"

const LunchMain = ({ theme, ids }) => {
	const [skip, setSkip] = useState(true)
	const [selectedId, setSelectedId] = useState("")
    const [tables, setTables] = useState([])
	const { data } = useGetTableProductsQuery({ id: selectedId }, { skip })

	const getTableProducts = () => {
		ids?.forEach((id) => {
			setSelectedId(id)
			setSkip(false)
            console.log(data)
		})
	}

    const formatTable = (data) => {
        setTables(current => [...current, data])
    }

	console.log(tables)
	useEffect(() => {
		getTableProducts()
	}, [ids])

    useEffect(() => {
        if (data?.length > 0) {
            formatTable(data)
        }
    }, [data])
	return (
		<Container theme={theme}>
			<Title>Lunch Orders</Title>
			<Body theme={theme}>
				<FullCenter>
					<ColumnCenter></ColumnCenter>
				</FullCenter>
			</Body>
		</Container>
	)
}

export default LunchMain
