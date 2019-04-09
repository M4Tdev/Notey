import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 10px;
  display: inline-block;
  margin-right: 20px;
  background-color: ${props => props.bgColor || '#EDEDED'};
  color: ${props => (props.bgColor === '#4285F4' ? 'white' : 'black')};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
  border: none;

  &:hover::after {
    content: '';
    background: none;
    border: 1px solid black;
    width: 100px;
    height: 30px;
    transform: translate(-10px);
  }

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
