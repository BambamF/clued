import React, { useContext, useState } from 'react';
import './ClueSupplement.css';
import { AudioSupplementContext, SupplementContext, TextSupplementContext, ClueNotesContext } from '../../../Context';
import playIcon from '../../../public/assets/playIcon.png';
import audioWaveform from '../../../public/assets/audioWaveform.png';
import cancelIcon from '../../../public/assets/cancelIcon.png'

const ClueSupplement = () => {

    const {textSupplementActive} = useContext(TextSupplementContext);
    const {audioSupplementActive} = useContext(AudioSupplementContext);
    const {supplementActive} = useContext(SupplementContext);
    const {clueNotes, setClueNotes} = useContext(ClueNotesContext);
    const [clueNotesChange, setClueNotesChange] = useState("")

    const handleAudioClick = () => {
        console.log("audio clicked")
    }

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        //this handler lets the clue-notes textarea track text onChanges in the clueNotesChange state variable
        setClueNotesChange(e.target.value)
    }

    const handleNotesSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // submit handler to save changes to the global clueNotes variable for later interaction with the backend
        e.preventDefault();
        setClueNotes(clueNotesChange);
    }

    const handleNotesClear = () => {
        setClueNotes('');
        setClueNotesChange('');
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
                <form id='clue-notes-form' onSubmit={handleNotesSubmit}>
                    <textarea name='clue-notes' id='clue-notes' maxLength={900} autoCorrect='on' form='clue-notes-form' onChange={handleNotesChange} value={clueNotesChange}></textarea>
                    {clueNotesChange && <button id='clue-notes-save-button' type='submit'>{clueNotes ? 'saved' : 'save'}</button>}
                    {clueNotes && <button id='clue-notes-clear-button' onClick={handleNotesClear}><img id='clue-notes-clear-image' src={cancelIcon}/></button>}
                </form>
            )}
        </div>
    )
  )
}

export default ClueSupplement