import { useSelector } from "react-redux"
import Input from "../../components/common/Input/Input.component"
import Button from "../../components/common/Button/Button.component"
import {
	Body,
	Container,
	Flex,
	Header,
	SearchSection,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import InventoryTable from "../../components/INVENTORY/InventoryTable/InventoryTable"
import { useState } from "react"

const Inventory = () => {
	const theme = useSelector((state) => state.theme.theme)
	const [searchString, setSearchString] = useState("")

	const handleSearch = () => {
		console.log(searchString)
	}

	const handleExport = () => {
		console.log("export")
	}

	return (
		<Container theme={theme}>
			<Header>
				<Title>Inventory</Title>
			</Header>
			<SearchSection>
				<Flex>
					<Input label="Barcode" />
					<Button title="Search" />
				</Flex>
				<Flex>
					<Input label="Name" value={searchString} onChange={setSearchString} />
					<Button title="Search" onClick={handleSearch}/>
				</Flex>
			</SearchSection>
			<Body theme={theme}>
				<SpaceHeader>
					<SubTitle>Products</SubTitle>
					<Button title="Export" onClick={handleExport}/>
				</SpaceHeader>
				<div>
					<InventoryTable />
				</div>

				<div>
					<div></div>
					<div></div>
				</div>
			</Body>
		</Container>
	)
}

export default Inventory
