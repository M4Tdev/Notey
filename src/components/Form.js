import React, { useRef } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import _ from 'lodash';
import PropTypes from 'prop-types';

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

  @media ${props => props.theme.mediaQueries.largest} {
    margin: 5rem auto 0;
    width: 70%;
    font-size: 1.8rem;

    &::placeholder {
      font-size: 1.8rem;
    }
  }

  @media ${props => props.theme.mediaQueries.large} {
    margin: 5rem auto 0;
    width: 80%;
    font-size: 1.8rem;

    &::placeholder {
      font-size: 1.8rem;
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

  @media ${props => props.theme.mediaQueries.smallMedium} {
    margin: 4rem auto 0;
    width: 95%;
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

  @media ${props => props.theme.mediaQueries.largest} {
    width: 70%;
    font-size: 1.8rem;

    &::placeholder {
      font-size: 1.8rem;
    }
  }

  @media ${props => props.theme.mediaQueries.large} {
    width: 80%;
    font-size: 1.8rem;

    &::placeholder {
      font-size: 1.8rem;
    }
  }

  @media ${props => props.theme.mediaQueries.medium} {
    width: 80%;
    font-size: 1.6rem;

    &::placeholder {
      font-size: 1.6rem;
    }
  }

  @media ${props => props.theme.mediaQueries.smallMedium} {
    width: 95%;
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

const StyledErrorMessage = styled.span`
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

  @media ${props => props.theme.mediaQueries.largest} {
    width: 70%;
  }

  @media ${props => props.theme.mediaQueries.large} {
    width: 80%;
  }

  @media ${props => props.theme.mediaQueries.medium} {
    width: 80%;
  }

  @media ${props => props.theme.mediaQueries.smallMedium} {
    width: 95%;
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

  @media ${props => props.theme.mediaQueries.largest} {
    width: 70%;
    justify-content: flex-start;
  }

  @media ${props => props.theme.mediaQueries.large} {
    width: 80%;
    justify-content: flex-start;
  }

  @media ${props => props.theme.mediaQueries.medium} {
    width: 80%;
    justify-content: flex-start;
  }

  @media ${props => props.theme.mediaQueries.smallMedium} {
    width: 95%;
    justify-content: center;
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

const FormComponent = props => {
  const formRef = useRef(null);

  return (
    <div>
      <Formik
        enableReinitialize="true"
        initialValues={{
          title: props.initialValues.title,
          note: props.initialValues.note,
        }}
        validate={values => {
          const errors = {};
          if (!values.title.trim()) {
            errors.title = 'Required';
          }

          if (!values.note.trim()) {
            errors.note = 'Required';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values);
          setSubmitting(false);
          formRef.current.reset();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
        }) => (
          <StyledForm
            onReset={handleReset}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <FieldContainer>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <StyledErrorMessage>
                {errors.title && touched.title && errors.title}
              </StyledErrorMessage>
            </FieldContainer>
            <FieldContainer>
              <TextArea
                name="note"
                placeholder="Note"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.note}
              />
              <StyledErrorMessage>
                {errors.note && touched.note && errors.note}
              </StyledErrorMessage>
            </FieldContainer>
            <Buttons>
              <Button
                btnType="submit"
                content="Save"
                bgColor="primary"
                disabled={isSubmitting}
              />
              {_.has(props.initialValues, 'id') ? (
                <Button content="Delete" onNoteDelete={props.onNoteDelete} />
              ) : (
                ''
              )}
            </Buttons>
          </StyledForm>
        )}
      </Formik>
    </div>
  );
};

FormComponent.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    note: PropTypes.string,
  }),
  onSubmit: PropTypes.func,
  onNoteDelete: PropTypes.func,
};

export default FormComponent;
