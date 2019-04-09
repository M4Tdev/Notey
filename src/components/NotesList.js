import React from 'react';
import styled from 'styled-components';

// Components
import Note from './Note';

const Notes = styled.div`
  width: 400px;
  height: 100%;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
`;

const Heading = styled.h2`
  letter-spacing: 0.1em;
  font-size: 26px;
  font-weight: 300;
  margin: 5px 0 0;
`;

const Line = styled.hr`
  color: rgba(0, 0, 0, 0.3);
  margin: 0 auto 5px;
  width: 56px;
`;

class NotesList extends React.Component {
  render() {
    return (
      <Notes>
        <Heading>Notes</Heading>
        <Line />
        <ul>
          <Note>Test1</Note>
          <Note>Test2</Note>
          <Note>Test3</Note>
        </ul>
      </Notes>
    );
  }
}

export default NotesList;
