import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Montserrat', sans-serif;
		outline: none;
	}

	html {
		font-size: 62.5%;
		--color-main: ${props => props.theme.colors.main};
		--color-lightMain: ${props => props.theme.colors.lightMain};
		--color-grey: ${props => props.theme.colors.grey};
		--color-lightGrey: ${props => props.theme.colors.lightGrey};
		--color-white: ${props => props.theme.colors.white};
		--color-green: ${props => props.theme.colors.green};
		--color-confirmBtn: ${props => props.theme.colors.confirmBtnColor};
		--color-cancelBtn: ${props => props.theme.colors.cancelBtnColor};
		--color-deleteBtnLight: ${props => props.theme.colors.deleteBtnLight};
		--color-deleteBtn: ${props => props.theme.colors.deleteBtn};
		--color-border: ${props => props.theme.colors.borderColor};
		--color-error: ${props => props.theme.colors.errorColor};
		--color-noteHover: ${props => props.theme.colors.noteHover};
		--color-shadow: ${props => props.theme.colors.shadowColor};
	}

	body {
		font-size: 1rem;
	}

	button {
		cursor: pointer;
		outline: none;
	}
`;
