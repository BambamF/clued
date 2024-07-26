import React, { useContext, useState, useEffect } from 'react';
import './UserClueMain.css';
import { ClueContext, ClueRawFileContext, ClueTitleContext, EditClueContext, UserContext, ClueRawFileTypeContext } from '../../../Context';
import axios from 'axios';
import cancelIcon from '../../../public/assets/cancelIcon.png';
import uploadIcon from '../../../public/assets/uploadIcon.png';

interface ClueMainDisplayProps {
  clueMainUrl: string | undefined;
  setClueMainUrl(choice: string): void;
  clueMainType: string;
}


//component to dynamically control the clue main view, file uploaded view or edit view
const ClueMainDisplay: React.FC<ClueMainDisplayProps> = ({clueMainUrl, setClueMainUrl, clueMainType}) => {

  const {rawFile, setRawFile} = useContext(ClueRawFileContext);
  const {rawFileType, setRawFileType} = useContext(ClueRawFileTypeContext);
  const [clueMainUploaded, setClueMainUploaded] = useState(false);
  const {editClue} = useContext(EditClueContext);
  const {clueData, setClueData} = useContext(ClueContext);

  const handleCancelClueMain = () => {
    setRawFile(null);
    setClueMainUrl("");
    setClueMainUploaded(false);
    setRawFileType("");
  }

  const handleClueMainUpload = () => {
    setClueMainUploaded(true);

}

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if(e.target.files && e.target.files[0]){
      const file = e.target.files[0];
      setRawFile(file); // Set the raw file
      setRawFileType(file.type); // Set rawFileType state
      setClueMainUrl(URL.createObjectURL(file)); // Set clueMainFile state
      console.log(file);
  }
  console.log(e.target.files);
}

// condition to display file if a file already exists
  if (clueMainUrl && clueMainType && !editClue){
   return <div id='user-clue-main-file'>
            {clueMainType == "image/jpeg" ?
                <img src={clueMainUrl} id='user-clue-file' alt='user-clue-file-'/>
                :
                <iframe src={clueMainUrl} id='user-clue-file-pdf'/>
            }
          </div>
  }
  // condition to still display file and cancel button if edit button has been clicked but file not cancelled yet
  else if(clueMainUrl && clueMainType && editClue){
    return <div id='user-clue-main-file'>
    {clueMainType == "image/jpeg" ?
        <img src={clueMainUrl} id='user-clue-file' alt='user-clue-file-'/>
        :
        <iframe src={clueMainUrl} id='user-clue-file-pdf'/>
    }
    <button id='cancel-clue-main' onClick={handleCancelClueMain}><img src={cancelIcon} id='cancel-clue-main-icon'/></button> 
  </div>
  }
  else{
    // condition to display edit view if no file exists
    return  <div id='clue-main-thumbnail'>
                <button id='cancel-clue-main' onClick={handleCancelClueMain}><img src={cancelIcon} id='cancel-clue-main-icon'/></button> 
                <button id='upload-thumbnail-button' onClick={handleClueMainUpload}>
                    <img id='upload-thumbnail-image' src={uploadIcon} alt='upload-thumbnail-image' title='upload file'/>
                </button>
                <input type='file' id='clue-main-upload-input' onChange={handleFileChange} name='clueMain'/>
                {clueMainUrl && <div id='clue-file-preview-div'><img src={clueMainUrl} id='clue-file-preview' alt='clue-file-preview'/></div>}
            </div>
  }
}

interface UserClueMainProps {
  clueId: string;
}

const UserClueMain: React.FC<UserClueMainProps> = ({clueId}) => {

  const {user} = useContext(UserContext);
  const {clueData, setClueData} = useContext(ClueContext);
  const [clueMainUrl, setClueMainUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const {editClue} = useContext(EditClueContext);
  const {clueTitle, setClueTitle} = useContext(ClueTitleContext);
  const [clueTitleChange, setClueTitleChange] = useState(clueData.userClueTitle);
  const {rawFile, setRawFile} = useContext(ClueRawFileContext);
  const {rawFileType, setRawFileType} = useContext(ClueRawFileTypeContext);

  const fetchClueMain = async (clueId: string) => {
    try {
      // function to populate the clue main with the url of file from the back end
        const response = await axios.get(`http://localhost:5000/get-clue-main/${clueId}`, {
            responseType: 'blob',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        setRawFile(response.data);
        setRawFileType(response.data.type);
        const url = URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
        return url;
    } catch (error) {
        console.error('Error fetching clue main file:', error);
        setError('Failed to fetch the clue main file.');
        return null;
    }
  };

  useEffect(() => {
    // populate the clue main
    const loadClueMain = async () => {
        const url = await fetchClueMain(clueId);
        setClueMainUrl(url ?? undefined);
    };

    loadClueMain();
}, [clueId]);

const handleClueTitleUpload = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && clueTitleChange) {
    setClueData(prevData => ({
      ...prevData,
      userClueTitle: clueTitleChange
    }));
   }
}

const handleClueTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setClueTitleChange(e.target.value);
}

  return (
    <div id='user-clue-main-div'>
      <div id='user-clue-main-header'>
        <div id='user-clue-main-header-date'>{clueData.dateCreated}</div>
        {editClue  ? 
        (<input type='text' id='clue-title-input' placeholder='Choose a title...' onKeyDown={handleClueTitleUpload} value={clueTitleChange} onChange={handleClueTitleChange}/>)
        :
        (<div id='user-clue-main-header-title'>{clueData.userClueTitle}</div>)
        }
        <div id='user-clue-main-header-time'>{clueData.timeCreated}</div>
      </div>
        <ClueMainDisplay clueMainUrl={clueMainUrl} clueMainType={clueData.clueMainType} setClueMainUrl={setClueMainUrl}/>
      <div id='user-clue-main-footer'>
            location
      </div>
    </div>
  )
}

export default UserClueMain