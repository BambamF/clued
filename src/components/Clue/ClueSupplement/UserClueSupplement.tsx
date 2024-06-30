import React, { useContext } from 'react';
import './UserClueSupplement.css';
import { ClueContext, UserContext } from '../../../Context';
import playIcon from '../../../public/assets/playIcon.png';
import audioWaveform from '../../../public/assets/audioWaveform.png';

const UserClueSupplement = () => {

  const {user} = useContext(UserContext);
  const {clueData} = useContext(ClueContext);

  const handleAudioClick = () => {
    console.log("audio clicked")
}

  return (
    <div id='user-clue-supplement-wrapper'>
      {clueData.audio && (
                <div id='user-clue-audio-div'>
                    <button id='audio-play-button' onClick={handleAudioClick}>
                        <img src={playIcon} alt='audio-play-icon' id='audio-play-icon' />
                    </button>
                    <img src={audioWaveform} alt='audio-waveform' id='audio-waveform' />
                </div>
      )}
      {clueData.notes && (
                <form id='clue-notes-form'>
                    <textarea name='clue-notes' id='clue-notes' maxLength={250} autoCorrect='on' form='clue-notes-form' readOnly={user?.id !== clueData.userId} value={clueData.notes}/>
                </form>
      )}
    </div>
  )
}

export default UserClueSupplement