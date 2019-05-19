import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Action Creators
import { createNote, fetchNotes } from '../actions';

// Components
import Form from './Form';

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

const CreateNote = props => {
  const [showLoader, setShowLoader] = useState(false);

  const onSubmit = async formValues => {
    setShowLoader(true);
    await props.createNote(formValues);
    await props.fetchNotes();
    setShowLoader(false);
  };

  return (
    <StyledDiv>
      {showLoader ? <StyledLoader className="spinning-loader" /> : ''}
      <Form onSubmit={onSubmit} />
    </StyledDiv>
  );
};

CreateNote.propTypes = {
  createNote: PropTypes.func,
  fetchNotes: PropTypes.func,
};

export default connect(
  null,
  { createNote, fetchNotes }
)(CreateNote);
