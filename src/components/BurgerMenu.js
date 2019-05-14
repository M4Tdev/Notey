import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

// Components
import CreateNote from './CreateNote';
import EditNote from './EditNote';

const Container = styled.div`
  text-align: center;
  height: 100%;
  width: 100%;
`;

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '3.6rem',
    height: '3rem',
    left: '2rem',
    top: '5.3rem',
  },
  bmBurgerBars: {
    background: 'var(--color-grey)',
    borderRadius: '2rem',
    height: '15%',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '3rem',
    width: '3rem',
  },
  bmCross: {
    background: '#bdc3c7',
    width: '0.5rem',
    height: '3rem',
  },
  bmMenuWrap: {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
  },
};

const BurgerMenu = props => (
  <Menu {...props} styles={styles} customBurgerIcon={false}>
    <Container>
      <Switch>
        <Route
          path="/notes"
          exact
          render={props => <CreateNote {...props} />}
        />
        <Route
          path="/notes/:id"
          exact
          render={props => <EditNote {...props} />}
        />
      </Switch>
    </Container>
  </Menu>
);

export default BurgerMenu;
