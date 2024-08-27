import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import './ClueMain.css';
import uploadIcon from '../../../public/assets/uploadIcon.png';
import cancelIcon from '../../../public/assets/cancelIcon.png';
import { ClueDateContext, ClueMainFileContext, ClueTimeContext, ClueTitleContext, ClueRawFileContext, ClueRawFileTypeContext, FullDateContext } from '../../../Context';

const ClueMain = () => {

    const {clueDate} = useContext(ClueDateContext);
    const {clueTitle, setClueTitle} = useContext(ClueTitleContext);
    const {clueTime} = useContext(ClueTimeContext);
    const clueDay = clueDate.getDate();
    const clueMonth = clueDate.getMonth();
    const clueYear = clueDate.getFullYear();
    const joinedDate = [clueDay, clueMonth+1, clueYear].join('/');
    const {clueMainFile, setClueMainFile} = useContext(ClueMainFileContext);
    const [clueMainUploaded, setClueMainUploaded] = useState(false);
    const {rawFile, setRawFile} = useContext(ClueRawFileContext)
    const {setRawFileType} = useContext(ClueRawFileTypeContext);
    const { setFullDate} = useContext(FullDateContext)


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            const file = e.target.files[0];
            setRawFile(file);
            setRawFileType(file.type); // Set rawFileType state
            setClueMainFile(URL.createObjectURL(file)); // Set clueMainFile state
            console.log(file);
        }
        console.log(e.target.files);
    }

    const handleClueMainUpload = () => {
        setClueMainUploaded(true);
        setFullDate(joinedDate);
    }

    const handleCancelClueMain = () => {
        setClueMainFile("");
        setClueMainUploaded(false);
        setClueTitle("");
        setRawFile(null);
        setRawFileType("");
    }
    
    const handleClueTitleUpload = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value) {
            setClueTitle(e.currentTarget.value);
         }
    }

  return (
                    <div id='clue-main-div'>
        <div id='clue-main-header'>
            <div id='clue-main-header-date'>{joinedDate}</div>
            <div id='clue-main-header-title'>{
                                                clueTitle ? 
                                                <div id='clue-title-input'>{clueTitle}</div> 
                                                : 
                                                <input type='text' id='clue-title-input' placeholder='Choose a title...' onKeyDown={handleClueTitleUpload}/>
                                                }
            </div>
            <div id='clue-main-header-time'>{clueTime}</div>
        </div>
       {clueMainUploaded && clueMainFile ?
        <div id='clue-main-uploaded'>
        <button id='cancel-clue-main' onClick={handleCancelClueMain}><img src={cancelIcon} id='cancel-clue-main-icon'/></button> 
            {rawFile && rawFile.type == "image/jpeg" ?
                <img src={clueMainFile} id='clue-file-uploaded' alt='clue-file-uploaded'/>
                :
                <iframe src={clueMainFile} id='clue-file-uploaded-pdf'/>
            }
        </div>
       :
       <div id='clue-main-thumbnail'>
            <button id='cancel-clue-main' onClick={handleCancelClueMain}><img src={cancelIcon} id='cancel-clue-main-icon'/></button> 
            <button id='upload-thumbnail-button' onClick={handleClueMainUpload}>
                <img id='upload-thumbnail-image' src={uploadIcon} alt='upload-thumbnail-image' title='upload file'/>
            </button>
            <input type='file' id='clue-main-upload-input' onChange={handleFileChange} name='clueMain'/>
            {clueMainFile && <div id='clue-file-preview-div'><img src={clueMainFile} id='clue-file-preview' alt='clue-file-preview'/></div>}
        </div>}
        <div id='clue-main-footer'>
            location
        </div>
    </div>
    
  )
}

export default ClueMain