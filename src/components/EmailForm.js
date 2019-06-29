import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

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
`;

const AuthError = styled.div`
  text-align: center;
  color: red;
  margin-bottom: 5rem;
`;

const StyledForm = styled.form`
  width: 30rem;
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
`;

const ForgotPassword = styled.div`
  margin-bottom: 0.5rem;

  & > button {
    border: none;
    border-bottom: 2px solid #ccc;
    background-color: transparent;
    transition: border-bottom 0.2s ease;

    &:hover {
      border-bottom-color: black;
    }
  }
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

const ChangeActionDiv = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const StyledActionSwitch = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #ccc;
  transition: border-bottom 0.2s ease;

  &:hover {
    border-bottom-color: black;
  }
`;

const EmailForm = props => {
  const switchAction = () => {
    if (props.action === 'register') {
      props.switchToLogin();
    }

    if (props.action === 'login') {
      props.switchToRegister();
    }
  };

  return (
    <Wrapper>
      <StyledHeader>
        {props.action === 'register' ? 'Register' : 'Login'} with Email and
        Password
      </StyledHeader>
      <AuthError>{props.errorMessage}</AuthError>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required!';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required!';
          } else if (values.password.length > 0 && values.password.length < 8) {
            errors.password = 'Too short, at least 8 characters';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values);
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
            <FormItem>
              <StyledLabel htmlFor="password">Password</StyledLabel>
              <FocusWrapper>
                <StyledInput
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  autoComplete="current-password"
                />
                <span className="focus-border"></span>
              </FocusWrapper>
              <StyledError>
                {errors.password && touched.password && errors.password}
              </StyledError>
              {props.action === 'login' ? (
                <ForgotPassword>
                  Forgot password?{' '}
                  <button type="button" onClick={props.onForgotPassword}>
                    Reset
                  </button>
                </ForgotPassword>
              ) : null}
            </FormItem>
            <StyledButton type="submit" disabled={isSubmitting}>
              {props.action === 'register' ? 'Register' : 'Login'}
            </StyledButton>
            <ChangeActionDiv>
              <span>
                {props.action === 'register'
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <StyledActionSwitch type="button" onClick={switchAction}>
                  {props.action === 'register' ? 'Log In' : 'Register'}
                </StyledActionSwitch>
              </span>
            </ChangeActionDiv>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default EmailForm;
