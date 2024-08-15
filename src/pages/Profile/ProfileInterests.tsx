import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { FinalInterestsContext, InterestChoiceContext, InterestIndexContext, UserContext, UserProfileContext } from '../../Context';
import { interestsData } from './Interests';
import backIcon from '../../public/assets/backIcon.png';
import nextIcon from '../../public/assets/nextIcon.png';
import artImages from './artImages';
import axios from 'axios';


// component to display the interest sub choices
const InterestSubChoice = () => {
    
    const {interestIndex, setInterestIndex} = useContext(InterestIndexContext);
    const {interestChoice, setInterestChoice} = useContext(InterestChoiceContext);
    const {finalInterests, setFinalInterests} = useContext(FinalInterestsContext);
    const [currImg, setCurrImg] = useState<string>('');
    const {profileData, setProfileData} = useContext(UserProfileContext);
    const {user} = useContext(UserContext);

    const currentInterest: string = interestsData[interestIndex].title;
    const currentSubInterests: { subInterestTitle: string; }[] = interestsData[interestIndex].subInterests;

    const handleInterestSave = async () => {


        if(profileData){
            setProfileData({
                ...profileData,
                userInterests: finalInterests
            })            
        }
        else{

            if(user){
                setProfileData({
                userId: user?.id,
                screenName: null,
                userInterests: finalInterests,
                profileImage: null
            })     
            }

        }

        const formData = new FormData();    

        formData.append("userInterests", JSON.stringify(finalInterests));

        try{
            if (user?.id) {
                const response = await axios.put(
                    `http://localhost:5000/update-profile/${user.id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Set the correct content type
                        },
                    }
                );
                console.log(response);
            } else {
                console.error("User ID is not available");
            }         
        }
        catch(error){
            console.error("Error updating profile:", error);
        }


    }

    if(interestChoice){
        const [imageIndex, setImageIndex] = useState(0);
        
        const handleImageChange = () => {
            if(imageIndex == artImages.length - 1){
                setImageIndex(0);
                setCurrImg(artImages[imageIndex])
            }
            else{
                setImageIndex(imageIndex+1);
                setCurrImg(artImages[imageIndex])
            }
        }

        setTimeout(handleImageChange, 2000);

    }


    // selector function to change the index state for the interests
    const interestSelector = (id: string) => {
        if(id === 'interest-next'){
            interestIndex === 5 ? setInterestIndex(0) : setInterestIndex(interestIndex+1);
        }
        if(id === 'interest-back'){
            interestIndex === 0 ? setInterestIndex(5) : setInterestIndex(interestIndex-1);
        }
    }

    // function to handle changing the current interest
    const handleInterestChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLButtonElement;
        interestSelector(target.id);
    }

    // set the users interest choice 
    const handleInterestChoice2 = () => {

        if(interestChoice.interest === currentInterest){
            
            setFinalInterests(current => current.filter(interest => {return interest.interest !== currentInterest}));
            setInterestChoice(
                {
                    interest: null,
                subInterests: null
            }
            );
            handleInterestSave();

        }
        if(interestChoice.interest !== currentInterest && !finalInterests.some(obj => obj.interest == currentInterest)){
            
                setInterestChoice({
                    interest: currentInterest,
                    subInterests: null
                });
                setFinalInterests(prevData => [...prevData, {
                    interest: currentInterest,
                    subInterests: null
                }]);

                handleInterestSave();

        }
        if(interestChoice.interest !== currentInterest && finalInterests.some(obj => obj.interest == currentInterest)){
            
            setFinalInterests(current => current.filter(interest => {return interest.interest !== currentInterest}));
            setInterestChoice({
                interest: currentInterest,
                subInterests: null
            });

            handleInterestSave();
        }

        console.log('interest-2', interestChoice);
        console.log('final-2', finalInterests);
        
    }

    // handle the selection of subchoices and add them to the sub interests final interests state
    const handleSubInterestChoice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const sub = e.currentTarget as HTMLButtonElement;
        const subInterestTitle = sub.name;

        
        if (finalInterests.some(interest => interest.interest === currentInterest && interest.subInterests?.includes(subInterestTitle))) {
            // logic for removing the sub interest
            setFinalInterests(prevData => prevData.map(interest => {
                if (interest.interest === currentInterest && interest.subInterests) {
                    return {
                        ...interest,
                        subInterests: interest.subInterests.filter(subInterest => subInterest !== subInterestTitle)
                    };
                }
                return interest;
            }));
            handleInterestSave();
        } else {
            // logic for adding the sub interest
            setFinalInterests(prevData => prevData.map(interest => {
                if (interest.interest === currentInterest && interest.subInterests) {
                    return {
                        ...interest,
                        subInterests: [...interest.subInterests, subInterestTitle]
                    };
                } else if (interest.interest === currentInterest) {
                    return {
                        ...interest,
                        subInterests: [subInterestTitle]
                    };
                }
                return interest;
            }));
            handleInterestSave();
        }

        console.log(finalInterests);
    }


    return (
        <div id='interest-sub-choice-div'>
            <div id='interest-sub-choices'>

                <div id='interest-sub-banner'>
                    <button id='interest-back' className='interest-button' onClick={handleInterestChange}>
                        <img src={backIcon} alt='back-icon' id='interest-back-icon' className='interest-icon'/>
                    </button>

                    <button id='interest-sub-header' onClick={handleInterestChoice2}>
                        {finalInterests.some(obj => obj.interest == currentInterest) ? <span id='selected-sub-header'>{currentInterest}</span> : currentInterest}
                    </button>

                    <button id='interest-next' className='interest-button' onClick={handleInterestChange}>
                        <img src={nextIcon} alt='next-icon' id='interest-next-icon' className='interest-icon'/>
                    </button>                      
                </div>

                <div id='interest-sub-container'>
                    {
                        currentSubInterests.map(subInt => (
                            <button className='sub-interest' name={subInt.subInterestTitle} key={subInt.subInterestTitle} onClick={handleSubInterestChoice}>
                                {
                                    finalInterests.some(interest => 
                                        interest.interest === currentInterest && interest.subInterests?.includes(subInt.subInterestTitle)
                                    )
                                    ?
                                    <span className='selected-sub-header'>{subInt.subInterestTitle}</span>
                                    : 
                                    subInt.subInterestTitle
                                }
                            </button>
                        ))
                    }
                </div>

            </div>
            <div id='interest-media-display'>
                <div id='interest-media-div'>
                <img src={currImg} id='interest-media-image' alt='interest-media-image'/>
                </div>
            </div>
        </div>
    )
}

// component to display the initial interest choices
const InterestChoice = () => {

    const {interestIndex, setInterestIndex} = useContext(InterestIndexContext);
    const {interestChoice, setInterestChoice} = useContext(InterestChoiceContext);
    const {finalInterests, setFinalInterests} = useContext(FinalInterestsContext);

    const currentInterest: string = interestsData[interestIndex].title;

        // selector function to change the index state for the interests
        const interestSelector = (id: string) => {
            if(id == 'interest-next'){
                interestIndex === 5 ? setInterestIndex(0) : setInterestIndex(interestIndex+1);
            }
            if(id == 'interest-back'){
                interestIndex === 0 ? setInterestIndex(5) : setInterestIndex(interestIndex-1);
            }
        }
    
        // function to handle changing the current interest
        const handleInterestChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            const target = e.currentTarget as HTMLButtonElement;
            interestSelector(target.id);
        }
    
        // set the users interest choice 
        const handleInterestChoice = () => {

            if(finalInterests.some(obj => obj.interest == currentInterest)){

                setFinalInterests(current => current.filter(interest => {return interest.interest !== currentInterest}));
                setInterestChoice(
                    {
                        interest: null,
                    subInterests: null
                }
                );
            }
            else{
                setInterestChoice({
                    interest: currentInterest,
                    subInterests: null
                });
                setFinalInterests(prevData => [...prevData, {
                    interest: currentInterest,
                    subInterests: null
                }]);                
            }
 
                console.log('interest-1', interestChoice);
                console.log('final-1', finalInterests);
            
        }
    
    
    return (
        <div id='interests-choice-button'>
                <button id='interest-back' className='interest-button' onClick={handleInterestChange}>
                    <img src={backIcon} alt='back-icon' id='interest-back-icon' className='interest-icon'/>
                </button>

                <button className='interest-choice' onClick={handleInterestChoice}>
                    {finalInterests.some(obj => obj.interest == currentInterest) ? <span id='selected-sub-header'>{currentInterest}</span> : currentInterest}
                </button>

                <button id='interest-next' className='interest-button' onClick={handleInterestChange}>
                    <img src={nextIcon} alt='next-icon' id='interest-next-icon' className='interest-icon'/>
                </button>                

        </div>
    )
}

const ProfileInterests = () => {


    const {user} = useContext(UserContext);
    const [interestIndex, setInterestIndex] = useState(0);
    const [interestChoice, setInterestChoice] = useState<InterestChoices>({
        interest: null,
        subInterests: null
    });
    const {finalInterests, setFinalInterests} = useContext(FinalInterestsContext);


    interface InterestChoices {
        interest: string | null;
        subInterests: string[] | null;
    }

    const fetchInterests = async () => {
        // axios get from get-user-interests
        try{
            const response = await axios.get<InterestChoices[]>(`http://localhost:5000/get-user-interests/${user?.id}`)
            const interests = response.data;
            console.log(interests);
            return interests;
        }
        catch(error){
            console.log(error);
            return [];
        }
    }

    const setInterests = async () => {
        const interests = await fetchInterests();
        if(interests){
            setFinalInterests(interests);
        }
    }

    
    useEffect(() => {
        setInterests();
    }, [])
    

  return (
    <InterestChoiceContext.Provider value={{interestChoice, setInterestChoice}}>
        <InterestIndexContext.Provider value={{interestIndex, setInterestIndex}}>
                <div id='profile-interests-div'>
                    <h4 id='profile-interests-label'>Interests:</h4>
                    {
                        interestChoice.interest !== null 
                        ?
                            <InterestSubChoice />
                        :
                            <InterestChoice />
                    }
                </div>                 
        </InterestIndexContext.Provider>
    </InterestChoiceContext.Provider>

  )
}

export default ProfileInterests