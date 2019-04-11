import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

// Components
import CreateNote from './CreateNote';
import EditNote from './EditNote';

const Container = styled.div`
  text-align: center;
  width: calc(100% - 40rem);
`;

class Editor extends React.Component {
  onNoteCreate = formValues => {
    console.log('Form submit:', formValues);
  };

  onNoteEdit = formValues => {
    console.log('Form Edit:', formValues);
  };

  render() {
    return (
      <Container>
        <Switch>
          <Route
            path="/notes"
            exact
            render={props => (
              <CreateNote {...props} onSubmit={this.onNoteCreate} />
            )}
          />
          <Route
            path="/notes/:id"
            exact
            render={props => <EditNote {...props} onSubmit={this.onNoteEdit} />}
          />
        </Switch>
      </Container>
    );
  }
}

export default Editor;
