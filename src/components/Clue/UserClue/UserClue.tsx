import { ClueContext, UserContext } from '../../../Context';
import React, { useContext, useState } from 'react';
import './UserClue.css';
import UserClueMain from '../ClueMain/UserClueMain';
import UserClueSupplement from '../ClueSupplement/UserClueSupplement';
import UserClueSupport from '../ClueSupport/UserClueSupport';
import ClueEditbar from '../ClueEditbar/ClueEditbar';

interface ClueProps {
    id: number | null;
    dateCreated: string;
    timeCreated: string;
    title: string;
    location: string;
    notes: string;
    audio: string;
    links: string;
    main: string;
    mainType: string;
}

const UserClue: React.FC<ClueProps> = ({id, dateCreated, timeCreated, title, location, notes, audio, links, main, mainType}) => {

const {user} = useContext(UserContext);
const [clueData, setClueData] = useState<ClueProps>({
    id: id,
    dateCreated: dateCreated,
    timeCreated: timeCreated,
    title: title,
    location: location,
    notes: notes,
    audio: audio,
    links: links,
    main: main,
    mainType: mainType
})


  return (
    <ClueContext.Provider value={{clueData, setClueData}}>
        <div id='user-clue-wrapper'>
            <div id='user-clue-top-row'>
                <UserClueMain/>
                <UserClueSupplement/>
                <UserClueSupport/>
            </div>
            <ClueEditbar/>
        </div>
    </ClueContext.Provider>
    
  )
}

export default UserClue