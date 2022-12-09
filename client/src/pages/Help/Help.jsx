import { useSelector } from "react-redux"
import { useState } from "react"
import Input from "../../components/common/Input/Input.component"
import Button from "../../components/common/Button/Button.component"
import {
	Body,
	Container,
	Flex,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const Help = () => {
	const theme = useSelector((state) => state.theme.theme)
	const [searchString, setSearchString] = useState("")
	const [expanded, setExpanded] = useState(false)

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	const handleSearch = () => {
		console.log(searchString)
		const paragraphs = document.querySelectorAll('p')
		paragraphs.forEach(p => {
			if (p.textContent.includes(searchString)) {
				console.log(p.textContent)
			}
		})
	}
	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Help</Title>
				<Flex>
					<Input label="Help" value={searchString} onChange={setSearchString} />
					<Button title="Search" onClick={handleSearch} />
				</Flex>
			</SpaceHeader>
			<Body theme={theme}>
				<div>
					<SubTitle>Section</SubTitle>
				</div>
				<div>
					<Accordion
						expanded={expanded === "panel1"}
						onChange={handleChange("panel1")}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Typography sx={{ width: "33%", flexShrink: 0 }}>
								Point of Sale
							</Typography>
							<Typography sx={{ color: "text.secondary" }}>
								I am an accordion
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
								<Accordion
									expanded={expanded === "panel1.1"}
									onChange={handleChange("panel1.1")}
								>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1bh-content"
										id="panel1bh-header"
									>
										<Typography sx={{ width: "33%", flexShrink: 0 }}>
											Point of Sale
										</Typography>
										<Typography sx={{ color: "text.secondary" }}>
											I am an accordion
										</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Typography>
											Nulla facilisi. Phasellus sollicitudin nulla et quam
											mattis feugiat. Aliquam eget maximus est, id dignissim
											quam.
										</Typography>
									</AccordionDetails>
								</Accordion>
						</AccordionDetails>
					</Accordion>
					<Accordion
						expanded={expanded === "panel2"}
						onChange={handleChange("panel2")}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2bh-content"
							id="panel2bh-header"
						>
							<Typography sx={{ width: "33%", flexShrink: 0 }}>
								Users
							</Typography>
							<Typography sx={{ color: "text.secondary" }}>
								You are currently not an owner
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Donec placerat, lectus sed mattis semper, neque lectus feugiat
								lectus, varius pulvinar diam eros in elit. Pellentesque
								convallis laoreet laoreet.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion
						expanded={expanded === "panel3"}
						onChange={handleChange("panel3")}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel3bh-content"
							id="panel3bh-header"
						>
							<Typography sx={{ width: "33%", flexShrink: 0 }}>
								Advanced settings
							</Typography>
							<Typography sx={{ color: "text.secondary" }}>
								Filtering has been entirely disabled for whole web server
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
								Integer sit amet egestas eros, vitae egestas augue. Duis vel est
								augue.
							</Typography>
						</AccordionDetails>
					</Accordion>
					<Accordion
						expanded={expanded === "panel4"}
						onChange={handleChange("panel4")}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel4bh-content"
							id="panel4bh-header"
						>
							<Typography sx={{ width: "33%", flexShrink: 0 }}>
								Personal data
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>
								Nunc vitae orci ultricies, auctor nunc in, volutpat nisl.
								Integer sit amet egestas eros, vitae egestas augue. Duis vel est
								augue.
							</Typography>
						</AccordionDetails>
					</Accordion>
				</div>

				<div>
					<div></div>
					<div></div>
				</div>
			</Body>
		</Container>
	)
}

export default Help
