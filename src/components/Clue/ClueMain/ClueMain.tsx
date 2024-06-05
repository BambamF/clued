import React, { useState } from 'react';
import './ClueMain.css';
import videoIcon from '../../../public/assets/videoIcon.png';
import imageIcon from '../../../public/assets/imageIcon.png';
import audioWaveformIcon from '../../../public/assets/audioWaveform.png';
import fileIcon from '../../../public/assets/fileIcon.png';

const ClueMain = () => {

    const [clueDate, setClueDate] = useState(new Date());
    const [clueTitle, setClueTitle] = useState("Title");
    const clueTime = clueDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const clueDay = clueDate.getDate();
    const clueMonth = clueDate.getMonth();
    const clueYear = clueDate.getFullYear();
    const fullDate = [clueDay, clueMonth+1, clueYear].join('/');


  return (
    <div id='clue-main-div'>
        <div id='clue-main-header'>
            <div id='clue-main-header-date'>{fullDate}</div>
            <div id='clue-main-header-title'>{clueTitle}</div>
            <div id='clue-main-header-time'>{clueTime}</div>
        </div>
        <div id='clue-main-thumbnail'>
            <div id='clue-thumbnail-top-row' className='clue-main-thumbnail-row'>
                <button id='video-thumbnail-button' className='clue-main-thumbnail-button'><img id='video-thumbnail-image' className='clue-main-thumbnail-image' src={videoIcon} alt='video-thumbnail-image'/></button>
                <button id='image-thumbnail-button' className='clue-main-thumbnail-button'><img id='image-thumbnail-image' className='clue-main-thumbnail-image' src={imageIcon} alt='image-thumbnail-image'/></button>
            </div>
            <div id='clue-thumbnail-bottom-row' className='clue-main-thumbnail-row'>
                <button id='audio-thumbnail-button' className='clue-main-thumbnail-button'><img id='audio-thumbnail-image' className='clue-main-thumbnail-image' src={audioWaveformIcon} alt='audio-thumbnail-image'/></button>
                <button id='file-thumbnail-button' className='clue-main-thumbnail-button'><img id='file-thumbnail-image' className='clue-main-thumbnail-image' src={fileIcon} alt='file-thumbnail-image'/></button>
            </div>
        </div>
        <div id='clue-main-footer'>
            location
        </div>
    </div>
  )
}

export default ClueMain