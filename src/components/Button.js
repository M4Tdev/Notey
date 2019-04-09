import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  width: 10rem;
  height: 3rem;
  border-radius: 0.3rem;
  display: inline-block;
  margin-right: 2rem;
  background-color: ${props => props.bgColor || '#EDEDED'};
  color: ${props => (props.bgColor === '#4285F4' ? 'white' : 'black')};
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.25);
  border: none;

  &:last-child {
    margin-right: 0;
  }
`;

const Button = props => (
  <>
    <Container bgColor={props.bgColor}>{props.content}</Container>
  </>
);

export default Button;
