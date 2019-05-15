import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import base from '../base';

// Components
import ModalLoader from './ModalLoader';
import TopBar from './TopBar';
import NotesList from './NotesList';
import Editor from './Editor';
import Footer from './Footer';
import BurgerMenu from './BurgerMenu';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.div`
  height: calc(100% - 6.5rem);
  display: flex;
  flex-direction: row;

  @media ${props => props.theme.mediaQueries.large} {
    display: flex;
  }

  @media ${props => props.theme.mediaQueries.medium} {
    display: flex;
  }

  @media ${props => props.theme.mediaQueries.small} {
    display: block;
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    display: block;
  }
`;

class App extends React.Component {
  state = {
    mobile: null,
    menuOpen: false,
  };

  componentDidMount() {
    this.changeMobile();
    window.addEventListener('resize', this.changeMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.changeMobile);
  }

  changeMobile = () => {
    // check if passed media query matches with window dimensions
    window.matchMedia('(max-width: 37.5em)').matches
      ? this.setState({ mobile: true })
      : this.setState({ mobile: false });
  };

  handleStateChange = state => {
    this.setState({ menuOpen: state.isOpen });
  };

  checkRoute = () => {
    if (this.props.location.pathname !== '/notes') {
      return true;
    }
    return false;
  };

  showMenu = () => {
    this.setState({ menuOpen: true });
  };

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
          <NotesList isMobile={this.state.mobile} showMenu={this.showMenu} />
          {this.state.mobile ? (
            <>
              {/* eslint-disable */}
              <BurgerMenu width={ '100%' } isOpen={ this.state.menuOpen } onStateChange={this.handleStateChange} />
              {/* eslint-enable */}
            </>
          ) : (
            <Editor />
          )}
        </InnerContainer>
        <Footer />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userEmail: state.auth.userEmail,
});

export default connect(mapStateToProps)(App);
