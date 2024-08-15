import { ClueContext, ClueNotesContext, ClueRawFileContext, ClueRawFileTypeContext, ClueTitleContext, EditClueContext, UserContext } from '../../../Context';
import React, { useContext, useState } from 'react';
import './UserClue.css';
import UserClueMain from '../ClueMain/UserClueMain';
import UserClueSupplement from '../ClueSupplement/UserClueSupplement';
import UserClueSupport from '../ClueSupport/UserClueSupport';
import ClueEditbar from '../ClueEditbar/ClueEditbar';

    interface ClueProps {
        id: string;
        userId: string;
        dateCreated: string;
        timeCreated: string;
        userClueTitle: string;
        clueLocation: string;
        userClueNotes: string;
        clueAudio: string;
        clueLinks: string;
        clueMain: string;
        clueMainType: string
    }

    const UserClue: React.FC<ClueProps> = ({id, userId, dateCreated, timeCreated, userClueTitle, clueLocation, userClueNotes, clueAudio, clueLinks, clueMain, clueMainType}) => {

    const {user} = useContext(UserContext);
    const [clueData, setClueData] = useState<ClueProps>({
        id: id,
        userId: userId,
        dateCreated: dateCreated,
        timeCreated: timeCreated,
        userClueTitle: userClueTitle,
        clueLocation: clueLocation,
        userClueNotes: userClueNotes,
        clueAudio: clueAudio,
        clueLinks: clueLinks,
        clueMain: clueMain,
        clueMainType: clueMainType
    })
    const [editClue, setEditClue] = useState(false);
    const [rawFile, setRawFile] = useState<File | null>(null); // change to use state
    const [rawFileType, setRawFileType] = useState<string>(clueMainType);// change to use state
    const {clueTitle, setClueTitle} = useContext(ClueTitleContext);
    const {clueNotes, setClueNotes} = useContext(ClueNotesContext);



  return (
    <ClueContext.Provider value={{clueData, setClueData}}>
        <EditClueContext.Provider value={{editClue, setEditClue}}>
            <ClueRawFileContext.Provider value={{rawFile, setRawFile}}>
                <ClueRawFileTypeContext.Provider value={{rawFileType, setRawFileType}}>
                    <ClueTitleContext.Provider value={{clueTitle, setClueTitle}}>
                        <ClueNotesContext.Provider value={{clueNotes, setClueNotes}}>

                            <div id='user-clue-wrapper'>
                                <div id='user-clue-top-row'>
                                    <UserClueMain clueId={id}/>
                                    {userClueNotes && <UserClueSupplement/>}
                                    <UserClueSupport/>
                                </div>
                                <ClueEditbar isUserClue={true} isCreateClue={false}/> 
                            </div>     
                                                       
                        </ClueNotesContext.Provider>
                    </ClueTitleContext.Provider>
                </ClueRawFileTypeContext.Provider>
            </ClueRawFileContext.Provider>
        </EditClueContext.Provider>
    </ClueContext.Provider>
  )
}

export default UserClue