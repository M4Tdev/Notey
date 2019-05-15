import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-lightGrey);
  font-weight: 500;

  @media ${props => props.theme.mediaQueries.medium} {
    height: 1.8rem;
    font-size: 1.3rem;
  }

  @media ${props => props.theme.mediaQueries.small} {
    height: 1.7rem;
    font-size: 1.2rem;
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    height: 1.5rem;
    font-size: 1rem;
  }
`;

const Footer = () => <StyledFooter>&copy; Mateusz Lesiuk</StyledFooter>;

export default Footer;
