import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

// Components
import Button from './Button';

const StyledForm = styled.form`
  text-align: center;
  /* height: 100%; */
`;

const FieldContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  display: inline-block;
  margin: 5rem auto 0;
  width: 60%;
  height: 4.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;

  border: none;
  border-left: 0.1rem solid ${props => props.theme.borderColor};
  border-bottom: 0.1rem solid ${props => props.theme.borderColor};

  &::placeholder {
    font-size: 1.8rem;
    letter-spacing: 0.1em;
  }

  &[data-error='true'] {
    border-color: red;
  }
`;

const TextArea = styled.textarea`
  display: block;
  margin: 2.5rem auto 0;
  width: 60%;
  min-height: 30rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  box-shadow: 0.15rem 0.15rem 0.5rem 0.2rem ${props => props.theme.borderColor};
  border: none;
  border-radius: 0.5rem;
  resize: vertical;

  &::placeholder {
    font-size: 1.8rem;
    letter-spacing: 0.1em;
  }

  &[data-error='true'] {
    box-shadow: 0.15rem 0.15rem 0.5rem 0.2rem ${props => props.theme.errorColor};
  }
`;

const ErrorMessage = styled.span`
  position: absolute;
  left: 50%;
  bottom: -2rem;
  transform: translateX(-50%);
  width: 60%;
  display: block;
  color: red;
  text-align: left;
  font-size: 14px;
  font-weight: bold;
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
    this.props.reset();
  };

  required = value => (value ? undefined : 'Required');

  renderField = ({ input, placeholder, type, name, meta }) => (
    <FieldContainer>
      {input.name === 'title' ? (
        <Input
          {...input}
          placeholder={placeholder}
          name={name}
          type={type}
          data-error={!!(meta.touched && meta.error)}
        />
      ) : (
        <TextArea
          {...input}
          placeholder={placeholder}
          name={name}
          data-error={!!(meta.touched && meta.error)}
        />
      )}
      {meta.touched &&
        (meta.error && <ErrorMessage>{meta.error}</ErrorMessage>)}
    </FieldContainer>
  );

  render() {
    return (
      <StyledForm onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field
          name="title"
          type="text"
          placeholder="Title"
          component={this.renderField}
          validate={this.required}
        />
        <Field
          name="note"
          placeholder="Note"
          component={this.renderField}
          validate={this.required}
        />
        <Buttons>
          <Button btnType="submit" content="Save" bgColor="#4285F4" />
          {_.has(this.props.initialValues, 'id') ? (
            <Button content="Delete" onNoteDelete={this.props.onNoteDelete} />
          ) : (
            ''
          )}
        </Buttons>
      </StyledForm>
    );
  }
}

export default reduxForm({
  form: 'editor',
  enableReinitialize: true,
})(Form);
