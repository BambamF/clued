import React, { useContext, useState, useEffect } from 'react';
import './Profile.css';
import userIcon from '../../public/assets/userIcon.png';
import ProfileInterests from './ProfileInterests';
import ProfileBanner from './ProfileBanner';
import { FinalInterestsContext, InitialProfileContext, UserContext, UserProfileContext } from '../../Context';
import axios from 'axios';

const Profile = () => {

  interface InterestChoices {
    interest: string | null;
    subInterests: string[] | null;
  }

  type UserProfileType = {
    userId: number | null;
    screenName: string | null;
    userInterests: InterestChoices[] | null;
    profileImage: File | null;
  }

  const [profileData, setProfileData] = useState<UserProfileType | null>(null);
  const [finalInterests, setFinalInterests] = useState<InterestChoices[]>([]);
  const [initialProfileData, setInitialProfileData] = useState<UserProfileType | null>(null);
  const {user} = useContext(UserContext);

  const fetchProfile = async () => {

    const profile = await axios.get(`http://localhost:5000/profile/${user?.id}`);
    console.log(profile.data);

    if(profile.data[1] === 404){
        return null;
    }
    else{
        return profile.data;   
    }

}

useEffect(() => {
    fetchProfile()
    .then((data: UserProfileType) => {
        if(data){
            setProfileData(data);
            setInitialProfileData(data);
        }
        else{
            setProfileData(null);
            setInitialProfileData(null);
        }
    })
    .catch((e) => console.log(e))
}, [])


  return (
    <InitialProfileContext.Provider value={{initialProfileData, setInitialProfileData}}>
      <UserProfileContext.Provider value={{profileData, setProfileData}}>
        <FinalInterestsContext.Provider value={{finalInterests, setFinalInterests}}>
          <div id='profile-wrapper'>
            <ProfileBanner/>
            <ProfileInterests/>
          </div>      
        </FinalInterestsContext.Provider>      
      </UserProfileContext.Provider>      
    </InitialProfileContext.Provider>



  )
}

export default Profile