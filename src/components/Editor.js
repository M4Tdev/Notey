import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// Components
import CreateNote from './CreateNote';
import EditNote from './EditNote';

const Container = styled.div`
  text-align: center;
  width: calc(100% - 40rem);
  margin: 0 auto;
`;

class Editor extends React.Component {
  render() {
    return (
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
    );
  }
}

export default Editor;
