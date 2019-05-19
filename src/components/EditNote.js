import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Action Creator
import { fetchNote, editNote, fetchNotes, deleteNote } from '../actions';

// Components
import Form from './Form';
import Loader from './Loader';

import '../css/spinningLoader.scss';

const StyledDiv = styled.div`
  position: relative;
`;

const StyledLoader = styled.div`
  z-index: 99;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const EditNote = props => {
  const [showLoader, setShowLoader] = useState(false);

  const { id } = props.match.params;

  const onSubmit = async formValues => {
    setShowLoader(true);
    await props.editNote(props.match.params.id, formValues);
    await props.fetchNotes();
    await props.fetchNote(id);
    setShowLoader(false);
  };

  const onNoteDelete = async () => {
    setShowLoader(true);
    await props.deleteNote(props.match.params.id);
    await props.fetchNotes();
  };

  /* eslint-disable */
  useEffect(() => {
    async function fetch() {
      await props.fetchNote(id);
    }

    fetch();

    return () => {
      setShowLoader(false);
    };
  }, [id]);
  /* eslint-enable */

  if (!props.note) {
    return <Loader />;
  }

  return (
    <StyledDiv>
      {showLoader ? <StyledLoader className="spinning-loader" /> : ''}
      <Form
        onSubmit={onSubmit}
        initialValues={props.note}
        onNoteDelete={onNoteDelete}
      />
    </StyledDiv>
  );
};

EditNote.propTypes = {
  fetchNote: PropTypes.func,
  editNote: PropTypes.func,
  fetchNotes: PropTypes.func,
  deleteNote: PropTypes.func,
  note: PropTypes.shape({
    id: PropTypes.string,
    note: PropTypes.string,
    timeStamp: PropTypes.string,
    title: PropTypes.string,
  }),
};

const mapStateToProp = state => ({
  note: state.notes.selectedNote,
});

export default connect(
  mapStateToProp,
  { fetchNote, editNote, fetchNotes, deleteNote }
)(EditNote);
