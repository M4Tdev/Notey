import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { InfoCircle } from 'styled-icons/fa-solid';
import { useSpring, animated } from 'react-spring';

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

const AuthError = styled.div`
  text-align: center;
  color: red;
  margin-bottom: 5rem;

  @media ${({ theme }) => theme.mediaQueries.small} {
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 3rem;
  }

  @media ${({ theme }) => theme.mediaQueries.smallest} {
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 2rem;
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

const FlexSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  @media ${({ theme }) => theme.mediaQueries.medium} {
    text-align: center;
  }
`;

const Info = styled.div`
  margin-right: 1rem;
  position: relative;
  overflow-x: visible;

  & label {
    cursor: pointer;
  }

  & input {
    display: none;
  }
`;

const StyledInfoCircle = styled(InfoCircle)`
  height: 1.8rem;
  width: auto;
  color: ${props =>
    props.toggle ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.7)'};
`;

const InfoContent = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 100%;
  margin-top: 0.1rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 0.1rem solid rgba(0, 0, 0, 0.4);
  cursor: default;
  min-width: 18rem;
  font-size: 1.2rem;
  background-color: white;

  & h4 {
    margin: 0 0 0.3rem 0;
    text-align: center;
  }

  & p {
    margin: 0.2rem 0.3rem;
  }

  & span.boldText {
    font-weight: 700;
    display: block;
  }

  @media ${({ theme }) => theme.mediaQueries.medium} {
    top: 100%;
    left: -200%;
    margin-top: 0.5rem;
    margin-left: 0;
  }

  @media ${({ theme }) => theme.mediaQueries.small} {
    top: 100%;
    left: unset !important;
    right: -200%;
    margin-top: 0.5rem;
    margin-left: 0;
    z-index: 10;
  }

  @media ${({ theme }) => theme.mediaQueries.smallest} {
    top: 100%;
    right: -120%;
    margin-top: 0.5rem;
    margin-left: 0;
    z-index: 10;
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

  @media ${({ theme }) => theme.mediaQueries.medium} {
    margin: 2rem auto 0;
    display: block;
  }
`;

const ChangeActionDiv = styled.div`
  text-align: center;
  margin-top: 2rem;

  @media ${({ theme }) => theme.mediaQueries.medium} {
    margin-top: 3rem;
  }
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

const EmailForm = ({
  action,
  switchToLogin,
  switchToRegister,
  errorMessage,
  onSubmit,
  onForgotPassword,
}) => {
  const switchAction = () => {
    if (action === 'register') {
      switchToLogin();
    }

    if (action === 'login') {
      switchToRegister();
    }
  };

  const [isInfoToggled, setInfoToggled] = useState(false);

  const fadeInOut = useSpring({
    display: isInfoToggled ? 'flex' : 'none',
    opacity: isInfoToggled ? 1 : 0,
  });

  return (
    <Wrapper>
      <StyledHeader>
        {action === 'register' ? 'Register' : 'Login'} with Email and Password
      </StyledHeader>
      <AuthError>{errorMessage}</AuthError>
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
          onSubmit(values);
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
            </FormItem>
            <div>
              {action === 'login' ? (
                <FlexSection>
                  <ForgotPassword>
                    Forgot password?{' '}
                    <button type="button" onClick={onForgotPassword}>
                      Reset
                    </button>
                  </ForgotPassword>
                  <Info>
                    <label htmlFor="infoToggle">
                      <StyledInfoCircle toggle={isInfoToggled} />
                    </label>
                    <input
                      type="checkbox"
                      className="infoToggle"
                      id="infoToggle"
                      onClick={() => setInfoToggled(!isInfoToggled)}
                    />
                    <InfoContent style={fadeInOut}>
                      <h4>Test account credentials</h4>
                      <p>
                        <span className="boldText">Email:</span>{' '}
                        test@mateuszlesiuk.dev
                      </p>
                      <p>
                        <span className="boldText">Password:</span> 12345678
                      </p>
                    </InfoContent>
                  </Info>
                </FlexSection>
              ) : null}
            </div>
            <StyledButton type="submit" disabled={isSubmitting}>
              {action === 'register' ? 'Register' : 'Login'}
            </StyledButton>
            <ChangeActionDiv>
              <span>
                {action === 'register'
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <StyledActionSwitch type="button" onClick={switchAction}>
                  {action === 'register' ? 'Log In' : 'Register'}
                </StyledActionSwitch>
              </span>
            </ChangeActionDiv>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};

EmailForm.propTypes = {
  action: PropTypes.string,
  switchToLogin: PropTypes.func,
  switchToRegister: PropTypes.func,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
  onForgotPassword: PropTypes.func,
};

export default EmailForm;
