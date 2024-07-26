import React, { useContext, useState } from 'react';
import './ClueEditbar.css';
import addIcon from '../../../public/assets/addIcon.png';
import audioIcon from '../../../public/assets/audioIcon.png';
import textIcon from '../../../public/assets/textIcon.png';
import linkIcon from '../../../public/assets/linkIcon.png';
import { TextSupplementContext, AudioSupplementContext, SupplementContext, SupportContext, ClueMainFileContext, ClueTitleContext, ClueTimeContext, ClueDateContext, UserContext, ClueNotesContext, ClueRawFileContext, ClueRawFileTypeContext, FullDateContext, EditClueContext, ClueContext } from '../../../Context';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import editIcon from '../../../public/assets/editIcon.png';



const ClueEditbar: React.FC<{isUserClue: boolean}> = ({isUserClue}) => {
    const {textSupplementActive, setTextSupplementActive} = useContext(TextSupplementContext);
    const {audioSupplementActive, setAudioSupplementActive} = useContext(AudioSupplementContext);
    const {setSupplementActive} = useContext(SupplementContext);
    const {supportActive, setSupportActive} = useContext(SupportContext);
    const [addButtonHover, setAddButtonHover] = useState(false);
    const {clueMainFile} = useContext(ClueMainFileContext);
    const {clueTitle} = useContext(ClueTitleContext);
    const {clueTime} = useContext(ClueTimeContext);
    const {fullDate} = useContext(FullDateContext);
    const {user} = useContext(UserContext);
    const {clueNotes} = useContext(ClueNotesContext);
    const {rawFile} = useContext(ClueRawFileContext);
    const navigate = useNavigate();
    const {rawFileType} = useContext(ClueRawFileTypeContext);    
    const {editClue, setEditClue} = useContext(EditClueContext);
    const {clueData, setClueData} = useContext(ClueContext);

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
    
    
    // handler to save clue creation
    const handleClueSave = async () => {

      if (clueMainFile && clueTitle && rawFile) {
        const formData = new FormData();
        formData.append('userId', user?.id || '');
        formData.append('collectionId', '');
        formData.append('dateCreated', fullDate);
        formData.append('timeCreated', clueTime || '');
        formData.append('userClueTitle', clueData.userClueTitle || '');
        formData.append('clueLocation', 'location');
        formData.append('userClueNotes', clueData.userClueNotes || '');
        formData.append('clueAudio', 'audio');
        formData.append('clueLinks', '');
        formData.append('clueMain', rawFile); // Append the actual file object
        formData.append('clueMainType', rawFileType || "unknown");
        
    
        console.log('Payload:', formData);

       await axios.post(`http://localhost:5000/create-clue/${user?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
      }
       })
        .then((response)=> {
          console.log(response)
          navigate(`/clues/${user?.id}`)
        })
        .catch(e => console.log(e))
      

      
    }}

    // handler for the edit clue save button
    const handleClueSave2 = async () => {

      if (!clueData) {
        console.error("No clue data available");
        return;
      }

      const formData = new FormData();

      formData.append('userId', user?.id || '');
      formData.append('collectionId', '');
      formData.append('dateCreated', clueData.dateCreated);
      formData.append('timeCreated', clueData.timeCreated || '');
      formData.append('userClueTitle', clueData.userClueTitle || '');
      formData.append('clueLocation', 'location');
      formData.append('userClueNotes', clueData.userClueNotes || '');
      formData.append('clueAudio', 'audio');
      formData.append('clueLinks', '');
      if(rawFile) formData.append('clueMain', rawFile); // Append the actual file object
      formData.append('clueMainType', rawFileType); 
      
      console.log('Payload:', formData);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      if(rawFile && formData.get('userClueTitle')){
       await axios.put(`http://localhost:5000/update-clue/${clueData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
        }
         })
         .then((response) => {
          console.log(response)
          setEditClue(false);
          navigate(`/clues/${user?.id}`)
         })
         .catch(e => console.log(e))
      }
    }

    const handleSetEditClue = () => {
      setEditClue(true);
    }

  const UserEditClueButton: React.FC<{isUserClue: boolean; editClue: boolean}> = ({isUserClue, editClue}) => {
    return isUserClue ? (
      editClue ? (
          <button id='clue-editbar-save-button2' onClick={handleClueSave2}>save clue</button>
      ) : (
          <button id='clue-edit-button' onClick={handleSetEditClue}>
              <img src={editIcon} id='clue-edit-image' alt='clue-edit-image'/>
          </button>
      )
    ) : null;

  }

  return (
    <div id='clue-editbar-div'>
        {(addButtonHover && editClue) && 
          <div id='add-text-audio-options'>
            <button id='add-text-button' onClick={handleTextSupplementClick} className='text-audio-options'><img src={textIcon} className='text-audio-icon'/></button>
            <button id='add-audio-button' onClick={handleAudioSupplementClick} className='text-audio-options'><img src={audioIcon} className='text-audio-icon'/></button>
            <button id='add-link-button' onClick={handleSupportClick} className='text-audio-options'><img src={linkIcon} className='text-audio-icon'/></button>
          </div>
        }
        { (isUserClue && editClue) && (
          <button  id='add-button' onClick={handleAddButtonClick}><img onMouseOver={handleMouseOver} src={addIcon} alt='add-button-icon' id='add-button-icon' /></button>
          )}
          { !isUserClue && (
          <button  id='add-button' onClick={handleAddButtonClick}><img onMouseOver={handleMouseOver} src={addIcon} alt='add-button-icon' id='add-button-icon' /></button>
          )}
        {(clueMainFile && clueTitle) && (
          <button id='clue-editbar-save-button' onClick={handleClueSave}>save clue</button>
          )}
        <UserEditClueButton isUserClue={isUserClue} editClue={editClue}/>
    </div>
  )
}

export default ClueEditbar