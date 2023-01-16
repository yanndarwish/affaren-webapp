import { useSelector } from "react-redux"
import { useState } from "react"
import Input from "../../components/common/Input/Input.component"
import Button from "../../components/common/Button/Button.component"
import {
	ArtTitle,
	Container,
	FitContainer,
	Flex,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/common/common.styles"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { help } from "../../data/helpData"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Help = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const navigate = useNavigate()
	const theme = useSelector((state) => state.theme.theme)
	const [searchString, setSearchString] = useState("")
	const [expanded, setExpanded] = useState(false)

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	const handleSearch = () => {
		let string = searchString.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")
		let pattern = new RegExp(`${string}`, "gi")
		const paragraphs = document.querySelectorAll("p")
		paragraphs.forEach((p) => {
			let index = p.innerHTML.indexOf(string)
			p.innerHTML = p.textContent.replace(pattern, match => `<mark>${match}</mark>`)
			if (index >= 0) {
				setExpanded(p.id.slice(0, 3))
			}
		})
	}

	useEffect(() => {
		redirect()
	}, [])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Help</Title>
				<Flex>
					<Input label="Help" value={searchString} onChange={setSearchString} />
					<Button title="Search" onClick={handleSearch} />
				</Flex>
			</SpaceHeader>
			<FitContainer theme={theme} id="help-content">
				<div>
					<SubTitle>Sections</SubTitle>
				</div>
				<div>
					{help.map((page) => (
						<Accordion
							key={page.title}
							expanded={expanded === page.id}
							onChange={handleChange(page.id)}
						>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1bh-content"
								id="panel1bh-header"
							>
								<Typography sx={{ width: "33%", flexShrink: 0 }}>
									{page.title}
								</Typography>
								<Typography sx={{ color: "text.secondary" }}>
									{page.subtitle}
								</Typography>
							</AccordionSummary>
							{page.sections.map((section, i) => (
								<AccordionDetails id={section.id} key={section.id + i}>
									<ArtTitle>{section.name}</ArtTitle>
									{section.content.map((content, i) => (
										<Typography key={i} id={section.id + i}>
											{content}
										</Typography>
									))}
								</AccordionDetails>
							))}
						</Accordion>
					))}
				</div>
			</FitContainer>
		</Container>
	)
}

export default Help
