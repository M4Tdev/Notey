import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  width: 14rem;
  height: 4rem;
  border-radius: 0.3rem;
  display: inline-block;
  margin-right: 2rem;
  background-image: ${props =>
    props.bgColor === 'primary'
      ? `linear-gradient(to bottom right, var(--color-lightMain), var(--color-main))`
      : `linear-gradient(to bottom right, var(--color-deleteBtnLight), var(--color-deleteBtn))`};
  color: ${props => (props.bgColor === 'primary' ? 'white' : 'black')};
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
`;

const noteDeleteAction = onNoteDelete => {
  if (onNoteDelete) {
    onNoteDelete();
  }
};

const Button = props => (
  <>
    <Container
      type={props.btnType === 'submit' ? 'submit' : 'button'}
      bgColor={props.bgColor}
      onClick={() => noteDeleteAction(props.onNoteDelete)}
    >
      {props.content}
    </Container>
  </>
);

export default Button;
