import React, { useState } from 'react';
import './CreateClue.css';
import ClueMain from './ClueMain/ClueMain';
import ClueEditbar from './ClueEditbar/ClueEditbar';
import ClueSupplement from './ClueSupplement/ClueSupplement';
import ClueSupport from './ClueSupport/ClueSupport';
import {TextSupplementContext, AudioSupplementContext, SupplementContext, SupportContext, ClueNotesContext, ClueDateContext, ClueTitleContext, ClueMainFileContext, ClueTimeContext} from '../../Context';

const CreateClue = () => {

  const [textSupplementActive, setTextSupplementActive] = useState<boolean>(false);
  const [audioSupplementActive, setAudioSupplementActive] = useState<boolean>(false);
  const [supplementActive, setSupplementActive] = useState<boolean>(false);
  const [supportActive, setSupportActive] = useState<boolean>(false);
  const [clueNotes, setClueNotes] = useState<string>("");
  const [clueDate, setClueDate] = useState<Date>(new Date());
  const [clueTitle, setClueTitle] = useState<string>("");
  const [clueMainFile, setClueMainFile] = useState<string>("");
  const [clueMainFileType, setClueMainFileType] = useState("");
  const [clueTime, setClueTime] = useState(clueDate.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));

  return (
    <AudioSupplementContext.Provider value={{audioSupplementActive, setAudioSupplementActive}}>
      <TextSupplementContext.Provider value={{textSupplementActive, setTextSupplementActive}}>
        <SupplementContext.Provider value={{supplementActive, setSupplementActive}}>
          <SupportContext.Provider value={{supportActive, setSupportActive}}>
            <ClueNotesContext.Provider value={{clueNotes, setClueNotes}}>
              <ClueDateContext.Provider value={{clueDate, setClueDate}}>
                <ClueTitleContext.Provider value={{clueTitle, setClueTitle}}>
                  <ClueMainFileContext.Provider value={{clueMainFile, setClueMainFile}}>
                    <ClueTimeContext.Provider value={{clueTime, setClueTime}}>
                    <div id='clue-wrapper'>
                      <div id='clue-top-row'>
                        <ClueMain/>
                        <ClueSupplement/>
                        <ClueSupport/>
                      </div>
                      <ClueEditbar/>
                    </div>
                    </ClueTimeContext.Provider>
                  </ClueMainFileContext.Provider>
                </ClueTitleContext.Provider>
              </ClueDateContext.Provider>
            </ClueNotesContext.Provider>
          </SupportContext.Provider>
        </SupplementContext.Provider>
      </TextSupplementContext.Provider>
    </AudioSupplementContext.Provider>
    
    
  )
}

export default CreateClue;