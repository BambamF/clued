
import './UserClueSupport.css';
import linkIcon from '../../../public/assets/linkIcon.png';

const UserClueSupport = () => {
  return (
    <div id='user-clue-support-wrapper'>
        <button className='clue-link'><img src={linkIcon} alt="clue-link-image" className='clue-link-image'/></button>
        <button className='clue-link'><img src={linkIcon} alt="clue-link-image" className='clue-link-image'/></button>
        <button className='clue-link'><img src={linkIcon} alt="clue-link-image" className='clue-link-image'/></button>
        <button className='clue-link'><img src={linkIcon} alt="clue-link-image" className='clue-link-image'/></button>
      </div>
  )
}

export default UserClueSupport