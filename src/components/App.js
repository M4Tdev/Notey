import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import base from '../base';

// Components
import ModalLoader from './ModalLoader';
import TopBar from './TopBar';
import NotesList from './NotesList';
import Editor from './Editor';
import Footer from './Footer';
import BurgerMenu from './BurgerMenu';

const Container = styled(animated.div)`
  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.div`
  height: calc(100% - 6.5rem);
  display: flex;
  flex-direction: row;

  @media ${props => props.theme.mediaQueries.largest} {
    display: flex;
  }

  @media ${props => props.theme.mediaQueries.large} {
    display: flex;
  }

  @media ${props => props.theme.mediaQueries.medium} {
    display: flex;
  }

  @media ${props => props.theme.mediaQueries.smallMedium} {
    display: flex;
  }

  @media ${props => props.theme.mediaQueries.small} {
    display: block;
  }

  @media ${props => props.theme.mediaQueries.smallest} {
    display: block;
  }
`;

const App = props => {
  const [isMobile, setMobile] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const fade = useSpring({
    config: {
      duration: 500,
    },
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  /* eslint-disable */
  const changeMobile = () => {
    // check if passed media query matches with window dimensions
    window.matchMedia('(max-width: 37.5em)').matches
      ? setMobile(true)
      : setMobile(false);
  };
  /* eslint-enable */

  const handleStateChange = state => {
    setMenuOpen(state.isOpen);
  };

  const showMenu = () => {
    setMenuOpen(true);
  };

  const onSignOut = async () => {
    await base.auth().signOut();
  };

  useEffect(() => {
    changeMobile();
    window.addEventListener('resize', changeMobile);

    return () => {
      window.removeEventListener('resize', changeMobile);
    };
  }, []);

  if (!props.isSignedIn) {
    return <ModalLoader />;
  }

  return (
    <Container style={fade}>
      <TopBar userEmail={props.userEmail} onSignOut={onSignOut} />
      <InnerContainer>
        <NotesList isMobile={isMobile} showMenu={showMenu} />
        {isMobile ? (
          <>
            {/* eslint-disable */}
            <BurgerMenu width={'100%'} isOpen={isMenuOpen} onStateChange={handleStateChange} />
            {/* eslint-enable */}
          </>
        ) : (
          <Editor />
        )}
      </InnerContainer>
      <Footer />
    </Container>
  );
};

App.propTypes = {
  isSignedIn: PropTypes.bool,
  userEmail: PropTypes.string,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  userEmail: state.auth.userEmail,
});

export default connect(mapStateToProps)(App);
