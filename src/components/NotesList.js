import React from 'react';
import styled from 'styled-components';

// Components
import Note from './Note';

const Notes = styled.div`
  width: 400px;
  height: 100%;
  text-align: center;
`;

class NotesList extends React.Component {
  render() {
    return (
      <Notes>
        Notes
        <ul>
          <Note>Test1</Note>
          <Note>Test2</Note>
        </ul>
      </Notes>
    );
  }
}

export default NotesList;
