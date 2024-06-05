import React, { useContext, useState } from 'react';
import './ClueEditbar.css';
import addIcon from '../../../public/assets/addIcon.png';
import audioIcon from '../../../public/assets/audioIcon.png';
import textIcon from '../../../public/assets/textIcon.png';
import linkIcon from '../../../public/assets/linkIcon.png';
import { TextSupplementContext, AudioSupplementContext, SupplementContext, SupportContext } from '../../../Context';

const ClueEditbar = () => {
    const {textSupplementActive, setTextSupplementActive} = useContext(TextSupplementContext);
    const {audioSupplementActive, setAudioSupplementActive} = useContext(AudioSupplementContext);
    const {setSupplementActive} = useContext(SupplementContext);
    const {supportActive, setSupportActive} = useContext(SupportContext);
    const [addButtonHover, setAddButtonHover] = useState(false);

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
    }

    const handleSupportClick = () => {
      setSupportActive(!supportActive);
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
    </div>
  )
}

export default ClueEditbar