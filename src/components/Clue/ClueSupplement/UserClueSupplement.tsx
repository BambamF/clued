import React, { useContext, useState } from 'react';
import './UserClueSupplement.css';
import { ClueContext, EditClueContext} from '../../../Context';
import playIcon from '../../../public/assets/playIcon.png';
import audioWaveform from '../../../public/assets/audioWaveform.png';

interface EditClueNotesProps {
  editClue: boolean;
  clueNotes: string;
}

const EditClueNotes: React.FC<EditClueNotesProps> = ({editClue, clueNotes}) => {
  const { clueData, setClueData } = useContext(ClueContext);
  const [clueNotesChange, setClueNotesChange] = useState(clueData.userClueNotes);

  const handleClueNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      //this handler lets the clue-notes textarea track text onChanges in the clueNotesChange state variable
      setClueNotesChange(e.target.value)
  }

  const handleClueNotesSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClueData(prevData => ({
      ...prevData,
      userClueNotes: clueNotesChange
    }));
    console.log(clueData);
  }


  if(editClue && clueNotes !== ''){
    return (
                <form id='clue-notes-form' onSubmit={handleClueNotesSave}>
                    <textarea name='clue-notes' id='clue-notes' maxLength={900} autoCorrect='on' form='clue-notes-form' value={clueNotesChange} onChange={handleClueNotesChange}/>
                    {clueNotesChange && <button id='clue-notes-save-button' type='submit'>{clueData.userClueNotes == clueNotesChange ? 'saved' : 'save'}</button>}
                </form>
    );
  }
  else{
    return (
      <div id='clue-notes-text-higherWrapper'>
        <div id='clue-notes-text-wrapper'>
          <div id='clue-notes-text'>
            {clueNotesChange !== '' ? clueNotesChange : clueNotes}
          </div>
          
        </div>
      </div>
      

    );
  }

}

const UserClueSupplement = () => {

  const {clueData} = useContext(ClueContext);
  const {editClue} = useContext(EditClueContext)
  

  const handleAudioClick = () => {
    console.log("audio clicked")
}



  return (
    <div id='user-clue-supplement-wrapper'>
      {clueData.userClueNotes && (
                <div id='user-clue-audio-div'>
                    <button id='audio-play-button' onClick={handleAudioClick}>
                        <img src={playIcon} alt='audio-play-icon' id='audio-play-icon' />
                    </button>
                    <img src={audioWaveform} alt='audio-waveform' id='audio-waveform' />
                </div>
      )}
      {clueData.userClueNotes && <EditClueNotes editClue={editClue} clueNotes={clueData.userClueNotes} />}
    </div>
  )
}

export default UserClueSupplement