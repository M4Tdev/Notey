import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Action Creator
import { fetchNote, editNote, fetchNotes } from '../actions';

// Components
import Form from './Form';

const EditNote = props => {
  const { id } = props.match.params;

  const onSubmit = async formValues => {
    await props.editNote(props.match.params.id, formValues);
    await props.fetchNotes();
  };

  const onNoteDelete = () => {
    console.log('Deleting note with id:', props.match.params.id);
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
      <Form
        onSubmit={onSubmit}
        selectedNote={props.note}
        onNoteDelete={onNoteDelete}
      />
    </div>
  );
};

const mapStateToProp = state => ({
  note: state.notes.selectedNote,
});

export default connect(
  mapStateToProp,
  { fetchNote, editNote, fetchNotes }
)(EditNote);
