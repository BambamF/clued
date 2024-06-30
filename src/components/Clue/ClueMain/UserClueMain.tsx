import React, { useContext } from 'react';
import './UserClueMain.css';
import { ClueContext, UserContext } from '../../../Context';

const UserClueMain = () => {

  const {user} = useContext(UserContext);
  const {clueData} = useContext(ClueContext);

  return (
    <div id='user-clue-main-div'>
      <div id='user-clue-main-header'>
        <div id='user-clue-main-header-date'>{clueData.dateCreated}</div>
        <div id='user-clue-main-header-title'>{clueData.title}</div>
        <div id='user-clue-main-header-time'>{clueData.timeCreated}</div>
      </div>
      <div id='user-clue-main-file'>
            {clueData.mainFileType == "image/jpeg" ?
                <img src={clueData.main} id='user-clue-file' alt='user-clue-file-'/>
                :
                <iframe src={clueData.main} id='user-clue-file-pdf'/>
            }
      </div>
      <div id='user-clue-main-footer'>
            location
      </div>
    </div>
  )
}

export default UserClueMain