import React from 'react';
import { connect } from 'react-redux';

// Action Creators
import { createNote, fetchNotes } from '../actions';

// Components
import Form from './Form';

class CreateNote extends React.Component {
  onSubmit = async formValues => {
    await this.props.createNote(formValues);
    await this.props.fetchNotes();
  };

  render() {
    return (
      <div>
        Create Note
        <Form onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createNote, fetchNotes }
)(CreateNote);
