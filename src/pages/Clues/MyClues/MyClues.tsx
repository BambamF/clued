import { useContext} from 'react';
import './MyClues.css';
import UserClue from '../../../components/Clue/UserClue/UserClue';
import useAxios from "axios-hooks";
import { UserContext } from '../../../Context';

const MyClues = () => {

  const {user} = useContext(UserContext);
  const [{data, loading, error}] = useAxios(`http://localhost:5000/clues/${user?.id}`);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  interface ClueProps {
    clueId: string;
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

data.map((clue: ClueProps) => console.log(clue))

  return (
    <div id='my-clues-wrapper'>
      { data && data.map((clue: ClueProps) => (<UserClue 
                                    key={clue.clueId}
                                    userId={clue.userId}
                                    id={clue.clueId}
                                    dateCreated={clue.dateCreated} 
                                    timeCreated={clue.timeCreated}
                                    userClueTitle={clue.userClueTitle}
                                    clueLocation={clue.clueLocation}
                                    userClueNotes={clue.userClueNotes}
                                    clueAudio={clue.clueAudio}
                                    clueLinks={clue.clueLinks}
                                    clueMain={clue.clueMain}
                                    clueMainType={clue.clueMainType}
                                    />))}
    </div>
  )
}

export default MyClues