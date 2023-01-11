import styled from "styled-components"

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 2rem;
	border-radius: 5px;
	color: ${(props) => props.disabled === true && "rgb(0, 0, 0, 0.4)"};

	background-color: ${(props) =>
		props.disabled === true
			? "rgb(206, 207, 199, 0.3)"
			: props.color === "blue"
			? "rgb(64, 98, 187, 0.3)"
			: props.color === "yellow"
			? "rgb(255, 212, 73, 0.3)"
			: props.color === "red"
			? "rgb(238, 66, 102, 0.3)"
			: props.color === "green" && "rgb(153, 209, 123, 0.3)"};
`

export const Name = styled.h2`
    min-width:20ch;
`

export const Price = styled.h3`
	width: 5ch;
`
