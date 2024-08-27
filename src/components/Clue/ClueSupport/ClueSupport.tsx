
import './ClueSupport.css';
import linkIcon from '../../../public/assets/linkIcon.png';
import { useContext } from 'react';
import { SupportContext } from '../../../Context';

const ClueSupport = () => {

  const {supportActive} = useContext(SupportContext);

  return (
    supportActive && (
      <div id='clue-support-wrapper'>
        <button className='clue-link'><img src={linkIcon} alt="clue-link-image" className='clue-link-image'/></button>
        <button className='clue-link'><img src={linkIcon} alt="clue-link-image" className='clue-link-image'/></button>
        <button className='clue-link'><img src={linkIcon} alt="clue-link-image" className='clue-link-image'/></button>
        <button className='clue-link'><img src={linkIcon} alt="clue-link-image" className='clue-link-image'/></button>
      </div>
    )
    
  )
}

export default ClueSupport