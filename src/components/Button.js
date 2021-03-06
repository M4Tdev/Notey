import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

const Container = styled(animated.button)`
  width: 14rem;
  height: 4rem;
  border-radius: 0.3rem;
  display: inline-block;
  margin-right: 2rem;
  background-image: ${props =>
    props.bgcolor === 'primary'
      ? `linear-gradient(to bottom right, var(--color-lightMain), var(--color-main))`
      : `linear-gradient(to bottom right, var(--color-deleteBtnLight), var(--color-deleteBtn))`};
  color: ${props => (props.bgcolor === 'primary' ? 'white' : 'black')};
  font-weight: 500;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.25);
  border: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-0.3rem);
  }

  &:last-child {
    margin-right: 0;
  }

  @media ${props => props.theme.mediaQueries.largest} {
    width: 15rem;
  }

  @media ${props => props.theme.mediaQueries.large} {
    width: 14rem;
  }

  @media ${({ theme }) => theme.mediaQueries.medium} {
    width: 14rem;
  }

  @media ${({ theme }) => theme.mediaQueries.smallMedium} {
    width: 13rem;
  }

  @media ${({ theme }) => theme.mediaQueries.small} {
    width: 13rem;
  }

  @media ${({ theme }) => theme.mediaQueries.smallest} {
    width: 12rem;
  }
`;

const noteDeleteAction = onNoteDelete => {
  if (onNoteDelete) {
    onNoteDelete();
  }
};

const Button = props => {
  const fade = useSpring({
    config: { duration: 150 },
    from: { opacity: 0, transform: 'scale(0.5)' },
    to: { opacity: 1, transform: 'scale(1)' },
  });

  return (
    <>
      <Container
        style={fade}
        type={props.btnType === 'submit' ? 'submit' : 'button'}
        bgcolor={props.bgColor}
        onClick={() => noteDeleteAction(props.onNoteDelete)}
      >
        {props.content}
      </Container>
    </>
  );
};

Button.propTypes = {
  btnType: PropTypes.string,
  bgColor: PropTypes.string,
  content: PropTypes.string,
};

export default Button;
