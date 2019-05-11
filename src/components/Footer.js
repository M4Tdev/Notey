import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  width: 100%;
  height: 2rem;
  font-size: 1.4rem;
  text-align: center;
  background-color: ${props => props.theme.lightGrey};
  font-weight: 500;
`;

const Footer = () => <StyledFooter>&copy; Mateusz Lesiuk</StyledFooter>;

export default Footer;
