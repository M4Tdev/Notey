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
	}

	body {
		font-size: 1rem;
	}

	button {
		cursor: pointer;
		outline: none;
	}
`;
