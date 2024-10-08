import { useState } from 'react';
import './Clues.css';
import CluesFeed from './CluesFeed/CluesFeed';
import MyClues from './MyClues/MyClues';

const Clues = () => {

  const [feedView, setFeedView] = useState(false);

  const handleFeedView = () => {
    setFeedView(true);
  }

  const handleCluesView = () => {
    setFeedView(false);
  }

  return (
    <div id='clues-wrapper'>
      <div id='clues-header-tabs'>
        <button id='clues-header-tab' className='clues-header-tab' onClick={handleCluesView}>my clues</button>
        <button id='clues-header-tab' className='clues-header-tab' onClick={handleFeedView}>feed</button>
      </div>
      <div id='clues-feeds'>
        {feedView ?
        <CluesFeed/>
        :
        <MyClues/>
        }
      </div>
    </div>
  )
}

export default Clues