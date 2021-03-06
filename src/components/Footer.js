import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const StyledFooter = styled(animated.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  font-size: 1.4rem;
  background-color: var(--color-lightGrey);
  font-weight: 500;

  @media ${props => props.theme.mediaQueries.largest} {
    height: 2rem;
    font-size: 1.4rem;
  }

  @media ${props => props.theme.mediaQueries.large} {
    height: 2rem;
    font-size: 1.4rem;
  }

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

const Footer = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return <StyledFooter style={fade}>&copy; Mateusz Lesiuk</StyledFooter>;
};

export default Footer;
