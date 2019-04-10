import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  width: 14rem;
  height: 4rem;
  border-radius: 0.3rem;
  display: inline-block;
  margin-right: 2rem;
  background-color: ${props => props.bgColor || '#EDEDED'};
  color: ${props => (props.bgColor === '#4285F4' ? 'white' : 'black')};
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.25);
  border: none;

  &:hover {
    background-color: ${props =>
      props.bgColor === '#4285F4'
        ? 'rgba(41, 108, 219, 1)'
        : 'rgba(212, 212, 212, 1)'};
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Button = props => (
  <>
    <Container
      type={props.btnType === 'submit' ? 'submit' : 'button'}
      bgColor={props.bgColor}
    >
      {props.content}
    </Container>
  </>
);

export default Button;
