import React from 'react';
import styled from 'styled-components';

// Components
import Button from './Button';

const Container = styled.form`
  text-align: center;
  /* height: 100%; */
`;

const Title = styled.input`
  display: block;
  margin: 50px auto 0;
  width: 60%;
  height: 45px;
  padding: 5px 10px;
  font-size: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 5px;

  &::placeholder {
    font-size: 18px;
    letter-spacing: 0.1em;
  }
`;

const Note = styled.textarea`
  display: block;
  margin: 50px auto 0;
  width: 60%;
  min-height: 300px;
  padding: 5px 10px;
  font-size: 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 5px;
  resize: vertical;

  &::placeholder {
    font-size: 18px;
    letter-spacing: 0.1em;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 60%;
  margin: 30px auto 10px;
  flex-direction: row;
  justify-content: flex-start;
`;

class Form extends React.Component {
  render() {
    return (
      <Container>
        <Title type="text" placeholder="Title" name="title" />
        <Note placeholder="Note" name="note" />
        <Buttons>
          <Button content="Save" bgColor="#4285F4" />
          <Button content="Delete" />
        </Buttons>
      </Container>
    );
  }
}

export default Form;
