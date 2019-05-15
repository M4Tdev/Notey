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
  border-left: 0.1rem solid var(--color-border);
  border-bottom: 0.1rem solid var(--color-border);

  &::placeholder {
    font-size: 1.8rem;
    letter-spacing: 0.1rem;
  }

  &[data-error='true'] {
    border-color: red;
  }

  @media ${props => props.theme.mediaQueries.large} {
    margin: 5rem auto 0;
    width: 80%;
    font-size: 1.7rem;

    &::placeholder {
      font-size: 1.7rem;
    }
  }

  @media ${props => props.theme.mediaQueries.medium} {
    margin: 4rem auto 0;
    width: 80%;
    font-size: 1.6rem;

    &::placeholder {
      font-size: 1.6rem;
    }
  }

  @media ${props => props.theme.mediaQueries.small} {
    margin: 3rem auto 0;
    width: 90%;
    font-size: 1.6rem;

    &::placeholder {
      font-size: 1.6rem;
    }
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    margin: 2rem auto 0;
    width: 90%;
    font-size: 1.6rem;

    &::placeholder {
      font-size: 1.6rem;
    }
  }
`;

const TextArea = styled.textarea`
  display: block;
  margin: 2.5rem auto 0;
  width: 60%;
  min-height: 30rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  box-shadow: 0.15rem 0.15rem 0.5rem 0.2rem var(--color-border);
  border: none;
  border-radius: 0.5rem;
  resize: vertical;

  &::placeholder {
    font-size: 1.8rem;
    letter-spacing: 0.1em;
  }

  &[data-error='true'] {
    box-shadow: 0.15rem 0.15rem 0.5rem 0.2rem var(--color-error);
  }

  @media ${props => props.theme.mediaQueries.large} {
    width: 80%;
    font-size: 1.6rem;

    &::placeholder {
      font-size: 1.6rem;
    }
  }

  @media ${props => props.theme.mediaQueries.medium} {
    width: 80%;
    font-size: 1.6rem;

    &::placeholder {
      font-size: 1.6rem;
    }
  }

  @media ${props => props.theme.mediaQueries.small} {
    width: 90%;
    font-size: 1.6rem;

    &::placeholder {
      font-size: 1.6rem;
    }
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    width: 90%;
    font-size: 1.6rem;

    &::placeholder {
      font-size: 1.6rem;
    }
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

  @media ${props => props.theme.mediaQueries.large} {
    width: 80%;
  }

  @media ${props => props.theme.mediaQueries.medium} {
    width: 80%;
  }

  @media ${({ theme }) => theme.mediaQueries.small} {
    width: 90%;
  }

  @media ${({ theme }) => theme.mediaQueries.smallest} {
    width: 90%;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 60%;
  margin: 3rem auto 1rem;
  flex-direction: row;
  justify-content: flex-start;

  @media ${props => props.theme.mediaQueries.large} {
    width: 80%;
    justify-content: flex-start;
  }

  @media ${props => props.theme.mediaQueries.medium} {
    width: 80%;
    justify-content: flex-start;
  }

  @media ${({ theme }) => theme.mediaQueries.small} {
    width: 90%;
    justify-content: center;
  }

  @media ${({ theme }) => theme.mediaQueries.smallest} {
    width: 90%;
    margin: 2.5rem auto 1rem;
    justify-content: center;
  }
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
          <Button btnType="submit" content="Save" bgColor="primary" />
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
