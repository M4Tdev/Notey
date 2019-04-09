import React from 'react';
import styled from 'styled-components';

// Components
import Button from './Button';

const Container = styled.form`
  text-align: center;
  /* height: 100%; */
`;

const Title = styled.input`
  display: inline-block;
  margin: 5rem auto 0;
  width: 60%;
  height: 4.5rem;
  padding: 0.5rem 1rem;
  font-size: 2rem;

  border: none;
  border-left: 0.1rem solid rgba(0, 0, 0, 0.25);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.25);

  &::placeholder {
    font-size: 1.8rem;
    letter-spacing: 0.1em;
  }
`;

const Note = styled.textarea`
  display: block;
  margin: 5rem auto 0;
  width: 60%;
  min-height: 30rem;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  box-shadow: 0.15rem 1rem 2rem rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 0.5rem;
  resize: vertical;

  &::placeholder {
    font-size: 1.8rem;
    letter-spacing: 0.1em;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 60%;
  margin: 3rem auto 1rem;
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
