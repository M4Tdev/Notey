import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';
import base from '../base';

// Components
import ModalLoader from './ModalLoader';
import TopBar from './TopBar';
import NotesList from './NotesList';
import Editor from './Editor';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.div`
  height: calc(100% - 4.5rem);
  display: flex;
  flex-direction: row;
`;

class App extends React.Component {
  onSignOut = async () => {
    await base.auth().signOut();
  };

  render() {
    if (!this.props.isSignedIn) {
      return <ModalLoader />;
    }
    return (
      <Container>
        <TopBar userEmail={this.props.userEmail} onSignOut={this.onSignOut} />
        <InnerContainer>
          <NotesList />
          <Editor />
        </InnerContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.auth.userEmail,
});

export default connect(mapStateToProps)(App);
