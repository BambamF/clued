import React from 'react';
import './MyClues.css';
import CreateClue from '../../../components/Clue/CreateClue';

const MyClues = () => {
  return (
    <div id='my-clues-wrapper'>
      <CreateClue/>
      <CreateClue/>
      <CreateClue/>
      <CreateClue/>
      <CreateClue/>
    </div>
  )
}

export default MyClues