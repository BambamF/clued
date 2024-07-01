import React, { useContext, useState } from 'react';
import './ClueEditbar.css';
import addIcon from '../../../public/assets/addIcon.png';
import audioIcon from '../../../public/assets/audioIcon.png';
import textIcon from '../../../public/assets/textIcon.png';
import linkIcon from '../../../public/assets/linkIcon.png';
import { TextSupplementContext, AudioSupplementContext, SupplementContext, SupportContext, ClueMainFileContext, ClueTitleContext, ClueTimeContext, ClueDateContext, UserContext, ClueNotesContext, ClueRawFileContext, ClueRawFileTypeContext } from '../../../Context';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ClueEditbar = () => {
    const {textSupplementActive, setTextSupplementActive} = useContext(TextSupplementContext);
    const {audioSupplementActive, setAudioSupplementActive} = useContext(AudioSupplementContext);
    const {setSupplementActive} = useContext(SupplementContext);
    const {supportActive, setSupportActive} = useContext(SupportContext);
    const [addButtonHover, setAddButtonHover] = useState(false);
    const {clueMainFile} = useContext(ClueMainFileContext);
    const {clueTitle} = useContext(ClueTitleContext);
    const {clueTime} = useContext(ClueTimeContext);
    const {clueDate} = useContext(ClueDateContext);
    const {user} = useContext(UserContext);
    const {clueNotes} = useContext(ClueNotesContext);
    const {rawFile} = useContext(ClueRawFileContext);
    const navigate = useNavigate();
    const {rawFileType} = useContext(ClueRawFileTypeContext);    

    const handleAudioSupplementClick = () => {
      setSupplementActive(true);
      setAudioSupplementActive(!audioSupplementActive);
    }

    const handleTextSupplementClick = () => {
      setSupplementActive(true);
      setTextSupplementActive(!textSupplementActive);
    }

    const handleMouseOver = () => {
      setAddButtonHover(!addButtonHover);
    }

    const handleAddButtonClick = () => {
      setSupplementActive(false);
      setSupportActive(false);
    }

    const handleSupportClick = () => {
      setSupportActive(!supportActive);
    }
    

    const handleClueSave = async () => {

      const data = {
        userId: user?.id,
        collectionId: null,
        dateCreated: clueDate.toISOString(),
        timeCreated: clueTime,
        clueTitle: clueTitle,
        clueLocation: 'location',
        clueNotes: 'notes',
        clueAudio: 'audio',
        clueLinks: null,
        clueMain: rawFile,
        clueMainType: rawFileType || "unknown"
      }

      console.log('Payload:', data);

      if(clueMainFile && clueTitle){
       await axios.post(`http://localhost:5000/create-clue/${user?.id}`, data, {
        headers: {
          'Content-Type': 'application/json'
      }
       })
        .then((response)=> {
          console.log(response)
          navigate(`/clues/${user?.id}`)
        })
        .catch(e => console.log(e))
      }
    }

  return (
    <div id='clue-editbar-div'>
        {addButtonHover && 
          <div id='add-text-audio-options'>
            <button id='add-text-button' onClick={handleTextSupplementClick} className='text-audio-options'><img src={textIcon} className='text-audio-icon'/></button>
            <button id='add-audio-button' onClick={handleAudioSupplementClick} className='text-audio-options'><img src={audioIcon} className='text-audio-icon'/></button>
            <button id='add-link-button' onClick={handleSupportClick} className='text-audio-options'><img src={linkIcon} className='text-audio-icon'/></button>
          </div>
        }
        <button  id='add-button' onClick={handleAddButtonClick}><img onMouseOver={handleMouseOver} src={addIcon} alt='add-button-icon' id='add-button-icon' /></button>
        {(clueMainFile && clueTitle) && <button id='clue-editbar-save-button' onClick={handleClueSave}>save clue</button>}
    </div>
  )
}

export default ClueEditbar