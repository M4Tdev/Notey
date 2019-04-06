import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

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
  height: calc(100% - 45px);
  display: flex;
  flex-direction: row;
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
        <TopBar userEmail={this.props.userEmail} />
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
