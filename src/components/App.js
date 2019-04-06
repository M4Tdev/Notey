import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SignOutAlt } from 'styled-icons/fa-solid';

// Components
import ModalLoader from './ModalLoader';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const TopBar = styled.div`
  width: 100vw;
  height: 45px;
  background-color: #4285f4;
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 45px;
  grid-template-areas: '. logo user';
`;

const Logo = styled.h1`
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 0.2em;
  grid-area: logo;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const User = styled.div`
  grid-area: user;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0 15px 0 0;
`;

const SignOutBtn = styled.button`
  background-color: transparent;
  border: none;
  margin: 0 0 0 10px;
`;

const SignOutIcon = styled(SignOutAlt)`
  color: white;
  width: 30px;
`;

class App extends React.Component {
  onSignOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  render() {
    if (!this.props.isSignedIn) {
      return <ModalLoader />;
    }
    return (
      <Container>
        <TopBar>
          <Logo>Notey</Logo>
          <User>
            {this.props.userEmail}
            <SignOutBtn onClick={this.onSignOut}>
              <SignOutIcon />
            </SignOutBtn>
          </User>
        </TopBar>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.auth.userEmail,
});

export default connect(mapStateToProps)(App);
