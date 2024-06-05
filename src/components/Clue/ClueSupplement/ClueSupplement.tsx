import React, { useContext } from 'react';
import './ClueSupplement.css';
import { AudioSupplementContext, SupplementContext, TextSupplementContext } from '../../../Context';
import playIcon from '../../../public/assets/playIcon.png';
import audioWaveform from '../../../public/assets/audioWaveform.png';

const ClueSupplement = () => {

    const {textSupplementActive} = useContext(TextSupplementContext);
    const {audioSupplementActive} = useContext(AudioSupplementContext);
    const {supplementActive} = useContext(SupplementContext);

    const handleAudioClick = () => {
        console.log("audio clicked")
    }

  return (
    supplementActive && (
        <div id='clue-supplement-wrapper'>
            {audioSupplementActive && (
                <div id='clue-audio-div'>
                    <button id='audio-play-button' onClick={handleAudioClick}>
                        <img src={playIcon} alt='audio-play-icon' id='audio-play-icon' />
                    </button>
                    <img src={audioWaveform} alt='audio-waveform' id='audio-waveform' />
                </div>
            )}
            {textSupplementActive && (
                <form id='clue-notes-form'>
                    <textarea name='clue-notes' id='clue-notes' maxLength={250} autoCorrect='on' form='clue-notes-form'></textarea>
                </form>
            )}
        </div>
    )
  )
}

export default ClueSupplement