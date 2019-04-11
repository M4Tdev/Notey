import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';

// Components
import Button from './Button';

const Container = styled.form`
  text-align: center;
  /* height: 100%; */
`;

const Title = styled(Field).attrs({
  component: 'input',
  placeholder: 'Title',
})`
  display: inline-block;
  margin: 5rem auto 0;
  width: 60%;
  height: 4.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;

  border: none;
  border-left: 0.1rem solid rgba(0, 0, 0, 0.25);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.25);

  &::placeholder {
    font-size: 1.8rem;
    letter-spacing: 0.1em;
  }
`;

const Note = styled(Field).attrs({
  component: 'textarea',
  placeholder: 'Note',
})`
  display: block;
  margin: 5rem auto 0;
  width: 60%;
  min-height: 30rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  box-shadow: 0.15rem 0.5rem 1rem rgba(0, 0, 0, 0.25);
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
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Container onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Title name="title" type="text" />
        <Note name="note" />
        <Buttons>
          <Button btnType="submit" content="Save" bgColor="#4285F4" />
          <Button content="Delete" />
        </Buttons>
      </Container>
    );
  }
}

export default reduxForm({
  form: 'editor',
})(Form);
