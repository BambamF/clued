import React, { useState } from 'react';
import './Clue.css';
import ClueMain from './ClueMain/ClueMain';
import ClueEditbar from './ClueEditbar/ClueEditbar';
import ClueSupplement from './ClueSupplement/ClueSupplement';
import ClueSupport from './ClueSupport/ClueSupport';
import {TextSupplementContext, AudioSupplementContext, SupplementContext, SupportContext} from '../../Context';

const Clue = () => {

  const [textSupplementActive, setTextSupplementActive] = useState(false);
  const [audioSupplementActive, setAudioSupplementActive] = useState(false);
  const [supplementActive, setSupplementActive] = useState(false);
  const [supportActive, setSupportActive] = useState(false);

  return (
    <AudioSupplementContext.Provider value={{audioSupplementActive, setAudioSupplementActive}}>
      <TextSupplementContext.Provider value={{textSupplementActive, setTextSupplementActive}}>
        <SupplementContext.Provider value={{supplementActive, setSupplementActive}}>
          <SupportContext.Provider value={{supportActive, setSupportActive}}>
            <div id='clue-wrapper'>
              <div id='clue-top-row'>
                <ClueMain/>
                <ClueSupplement/>
                <ClueSupport/>
              </div>
              <ClueEditbar/>
            </div>
          </SupportContext.Provider>
          
        </SupplementContext.Provider>
      </TextSupplementContext.Provider>
    </AudioSupplementContext.Provider>
    
    
  )
}

export default Clue