import React from 'react';
import styled from 'styled-components';
import { SignOutAlt } from 'styled-icons/fa-solid';

const Container = styled.div`
  width: 100vw;
  height: 4.5rem;
  background-color: var(--color-main);
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 4.5rem;
  grid-template-areas: '. logo user';

  @media ${props => props.theme.mediaQueries.medium} {
    grid-template-columns: 1fr 1fr;
    grid-template: 'logo user';
  }

  @media ${props => props.theme.mediaQueries.small} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'logo user';
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'logo user';
  }
`;

const Logo = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  letter-spacing: 0.2em;
  grid-area: logo;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 2.4rem;
    margin: 0 0 0 2rem;
    justify-content: flex-start;
    align-items: center;
  }

  @media ${props => props.theme.mediaQueries.small} {
    font-size: 2.2rem;
    margin: 0 0 0 1rem;
    justify-content: flex-start;
    align-items: center;
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    font-size: 2rem;
    margin: 0 0 0 1rem;
    justify-content: flex-start;
    align-items: center;
  }
`;

const User = styled.div`
  grid-area: user;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0 1.5rem 0 0;
  font-size: 1.4rem;

  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 1.3rem;
  }

  @media ${props => props.theme.mediaQueries.small} {
    font-size: 1.2rem;
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    font-size: 1.1rem;
  }
`;

const SignOutBtn = styled.button`
  background-color: transparent;
  border: none;
  margin: 0 0 0 1rem;
`;

const SignOutIcon = styled(SignOutAlt)`
  color: white;
  width: 3rem;

  @media ${props => props.theme.mediaQueries.medium} {
    width: 2.5rem;
  }

  @media ${props => props.theme.mediaQueries.small} {
    width: 2.3rem;
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    width: 2rem;
  }
`;

class TopBar extends React.Component {
  render() {
    return (
      <Container>
        <Logo>Notey</Logo>
        <User>
          {this.props.userEmail}
          <SignOutBtn onClick={this.props.onSignOut}>
            <SignOutIcon />
          </SignOutBtn>
        </User>
      </Container>
    );
  }
}

export default TopBar;
