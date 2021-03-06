import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

import base from '../base';
import history from '../history';

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledHeader = styled.h1`
  color: var(--color-grey);
  font-size: 3rem;
  margin-bottom: 2rem;

  @media ${({ theme }) => theme.mediaQueries.large} {
    text-align: center;
    margin: 0 1rem 2rem;
  }

  @media ${({ theme }) => theme.mediaQueries.medium} {
    text-align: center;
    font-size: 2.8rem;
    margin: 0 1rem 2rem;
  }

  @media ${({ theme }) => theme.mediaQueries.small} {
    text-align: center;
    font-size: 2.4rem;
    margin: 0 1rem 2rem;
  }

  @media ${({ theme }) => theme.mediaQueries.smallest} {
    text-align: center;
    font-size: 2.4rem;
  }
`;

const EmailStatus = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  max-width: 42rem;

  & span.sent {
    color: green;
  }

  & span.error {
    color: red;
  }
`;

const StyledForm = styled.form`
  width: 30rem;

  @media ${({ theme }) => theme.mediaQueries.medium} {
    width: 35rem;
  }

  @media ${({ theme }) => theme.mediaQueries.small} {
    width: 80%;
  }

  @media ${({ theme }) => theme.mediaQueries.smallest} {
    width: 90%;
  }
`;

const FormItem = styled.div`
  margin: 1.5rem auto 0.5rem;
  width: 100%;
  overflow: hidden;

  &:last-child {
    margin-top: 1rem;
  }
`;

const StyledLabel = styled.label`
  display: block;
  color: black;
  width: inherit;
  font-size: 1.6rem;
`;

const FocusWrapper = styled.div`
  position: relative;
  width: inherit;
`;

const StyledInput = styled.input`
  display: block;
  width: inherit;
  padding: 0.7rem 0;
  background-color: var(--color-lightGrey);
  border: none;
  border-bottom: solid 2px #ccc;

  & ~ .focus-border {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0.2rem;
    width: 100%;
    transform: translateX(-100%);
    background-color: var(--color-main);
    transition: transform 0.3s ease;
  }

  &:focus ~ .focus-border {
    transform: translateX(0);
  }
`;

const StyledError = styled.span`
  color: red;
  font-weight: 500;
  font-size: 1.2rem;
  min-height: 1.5rem;
  display: block;
  margin-left: 0.5rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => theme.mediaQueries.medium} {
    width: 90%;
    margin: 0 auto;
  }
`;

const GoBackButton = styled.button`
  border: none;
  background-color: transparent;
  color: #ccc;
`;

const StyledButton = styled.button`
  padding: 1rem 2rem;
  background-color: var(--color-main);
  border: none;
  color: white;
  border-radius: 0.5rem;
  transition: transform 0.2s ease;
  margin: 1rem 0 0;

  &:hover {
    transform: translateY(-0.3rem);
  }
`;

const GoToLoginPageButton = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #ccc;
  transition: border-bottom 0.2s ease;

  &:hover {
    border-bottom-color: black;
  }
`;

const EmailReset = () => {
  const [emailStatus, setEmailStatus] = useState(null);

  const onGoBack = () => {
    history.goBack();
  };

  const goToLoginPage = () => {
    history.push('/email-login');
  };

  const resetPassword = email => {
    base
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // console.log('Email sent');
        setEmailStatus(
          <>
            <span className="sent">Email sent</span>{' '}
            <GoToLoginPageButton type="button" onClick={goToLoginPage}>
              Go to login page
            </GoToLoginPageButton>
          </>
        );
      })
      .catch(err => {
        // console.log('Something went wrong', err.message);
        setEmailStatus(<span className="error">{err.message}</span>);
      });
  };

  return (
    <Wrapper>
      <StyledHeader>Send reset password email</StyledHeader>
      <EmailStatus>{emailStatus}</EmailStatus>
      <Formik
        initialValues={{ email: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values.email);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <FormItem>
              <StyledLabel htmlFor="email">Email</StyledLabel>
              <FocusWrapper>
                <StyledInput
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="email@example.com"
                  autoComplete="email"
                />
                <span className="focus-border"></span>
              </FocusWrapper>
              <StyledError>
                {errors.email && touched.email && errors.email}
              </StyledError>
            </FormItem>
            <ButtonWrapper>
              <GoBackButton type="button" onClick={onGoBack}>
                Go back
              </GoBackButton>
              <StyledButton type="submit" disabled={isSubmitting}>
                Send
              </StyledButton>
            </ButtonWrapper>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default EmailReset;
