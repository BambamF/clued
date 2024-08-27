import React, { useContext, useEffect, useState } from 'react';
import userIcon from '../../public/assets/userIcon.png';
import './Profile.css';
import { InitialProfileContext, UserContext, UserProfileContext } from '../../Context';
import editIcon from '../../public/assets/editIcon.png';
import axios from 'axios';


const ProfileBanner = () => {

    const {user} = useContext(UserContext);
    const {profileData, setProfileData} = useContext(UserProfileContext);
    const [editProfile, setEditProfile] = useState<boolean>(false);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [displayPic, setDisplayPic] = useState<string | null>(null);
    const [initialProfilePic, setInitialProfilePic] = useState<File | null>(null);
    const {initialProfileData} = useContext(InitialProfileContext);
    const [screenNameChange, setScreenNameChange] = useState<string>('');

    const handleEditProfile = async () => {
        if (editProfile) {
            
            const isEdited = initialProfileData?.screenName !== screenNameChange || profilePic !== initialProfilePic;  
            console.log(isEdited);

            if(screenNameChange && !profileData && user) {
                setProfileData({
                    userId: user?.id,
                    screenName: screenNameChange,
                    userInterests: null,
                    profileImage: profilePic ? profilePic : null
                })
            }
            if(screenNameChange && profileData && user){
                setProfileData({
                    ...profileData,
                    screenName: screenNameChange ? screenNameChange : profileData?.screenName,
                    profileImage: profilePic && profilePic !== initialProfilePic ? profilePic : initialProfilePic
                })
            }



            if (isEdited) {
                const formData = new FormData();
            
                // Safely convert userId to a string if it's defined and not null
                if (user?.id != null) { 
                    // Check if user?.id is not null or undefined
                    formData.append('userId', user.id.toString());
                } else {
                    console.error('User ID is null or undefined');
                    return; // Optionally handle the case where userId is missing
                }
            
                formData.append('screenName', profileData?.screenName || '');
            
                if (profilePic) {
                    formData.append('profileImage', profilePic); // Add the file
                }
            
                try {
                    const response = await axios.put(
                        `http://localhost:5000/update-profile/${user.id}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data', // Set the correct content type
                            },
                        }
                    );
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            }            
        }
        console.log('edited');
        setEditProfile(!editProfile);
    }

    const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
        const profilePicChoice = e.target.files[0];
        setProfilePic(profilePicChoice);

        const profilePicUrl = URL.createObjectURL(profilePicChoice);
        setDisplayPic(profilePicUrl);
        }
    }

    const fetchProfilePic = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/get-profile-pic/${user?.id}`, {
                responseType: 'arraybuffer' // Ensure the response is treated as binary data
            });
            if (response.status === 200 && response.data) {
                console.log('Raw data:', response.data);
                return response.data;
            } else {
                console.error('Profile picture not found or server error.');
                return null;
            }
        } catch (e) {
            console.error('Error fetching profile picture:', e);
            return null;
        }
    }

    useEffect(() => {
        const loadProfilePic = async () => {

            const data = await fetchProfilePic();

            if (data && data[1] !== 404) {
                const blob = new Blob([data], { type: 'image/jpeg' });
                setProfilePic(data);
                setInitialProfilePic(data);
    
                const profilePicUrl = URL.createObjectURL(blob);
                console.log('Fetched image URL:', profilePicUrl);
                setDisplayPic(profilePicUrl);
            }
            else{
                setProfilePic(null);
                setInitialProfilePic(null);
                setDisplayPic(null);
            }
        };
    
        loadProfilePic();
    }, [user?.id]);

    useEffect(() => {
        return () => {
            if (displayPic) {
                URL.revokeObjectURL(displayPic);
            }
        };
    }, [displayPic]);

    const handleScreenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const eventTarget = e.target.value;
            setScreenNameChange(eventTarget);

    }

  return (
    <div id='profile-banner'>

        <div id={editProfile ? 'profile-image-div2' : 'profile-image-div'}>

            {editProfile 
            ?
            <div id='profile-image-input-div'>
                <label htmlFor='profile-image-input' id='profile-input-label'>
                    <img src={displayPic ? displayPic : userIcon} alt='profile-image' id='profile-image2' />
                </label>
                <input id='profile-image-input' type='file' onChange={handlePicChange}/>
            </div>
            :
            <img id='profile-image' alt='profile-image' src={displayPic ? displayPic : userIcon}   onError={(e) => {
                console.error('Failed to load image, using fallback.');
                e.currentTarget.src = userIcon;
            }} />
            }
            
        </div>

        <div id='profile-name-div'>

            {editProfile 
            ? <input type='text' id='profile-screen-input' placeholder="Choose a screeen name" 
            value={ screenNameChange } onChange={handleScreenNameChange}/> 
                : <p id='profile-screen-name'>{profileData?.screenName ? profileData.screenName : "Choose a screen name"}</p>}
            <p id='profile-username'>{user?.username}</p>
            <button id='edit-profile-button'><img src={editIcon} id='edit-profile-image' alt='edit-profile-image' onClick={handleEditProfile}/></button>

        </div>

        <div id='clues-analytics'>
            <p id='clues-ticker'>7 clues</p>
        </div>

  </div>
  )
}

export default ProfileBanner