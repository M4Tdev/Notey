import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Action Creator
import { fetchNote } from '../actions';

// Components
import Form from './Form';

const EditNote = props => {
  const { id } = props.match.params;

  const onSubmit = formValues => {
    console.log(formValues);
  };
  /* eslint-disable */
  useEffect(() => {
    async function fetch() {
      await props.fetchNote(id);
    }

    fetch();
  }, [id]);
  /* eslint-enable */

  return (
    <div>
      Edit Note
      <Form onSubmit={onSubmit} selectedNote={props.note} />
    </div>
  );
};

const mapStateToProp = state => ({
  note: state.notes.selectedNote,
});

export default connect(
  mapStateToProp,
  { fetchNote }
)(EditNote);
