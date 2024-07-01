import React from 'react';
import './MyClues.css';
import CreateClue from '../../../components/Clue/CreateClue';
import UserClue from '../../../components/Clue/UserClue/UserClue';

const MyClues = () => {
  return (
    <div id='my-clues-wrapper'>
      <UserClue/>
    </div>
  )
}

export default MyClues