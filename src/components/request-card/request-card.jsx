import { useEffect, useState } from 'react';
import './request-card.css';
import { useNavigate } from 'react-router-dom';


function RequestCard(props) {
  const navigate = useNavigate();
  const [upvoted, setUpvoted] = useState(props.upvoted)
  const [votes, setVotes] = useState(props.upvotes)
  const [isNotClickable, setIsNotClickable] = useState(props.notClickable)

  function handleUpvoted(){
   props.upvoteFunction(props.id);
    
  }
  useEffect(()=>{
    setUpvoted(props.upvoted)
    setVotes(props.upvotes)
  },[props.upvoted])

  function navigateToPost(){
    navigate(`/feedback/${props.id}`);
    document.body.scrollTop = 0;
  }


  return (
    <div className="request-card-div">
      <div onClick={navigateToPost} className={`card ${isNotClickable ? 'not-clickable':'clickable'}`}>
        <p className='request-card-title'>{props.title}</p>
        <p className='request-card-description'>{props.description}</p>
        <p className='request-card-category'>{props.category}</p>
      </div>
        
        <div className='request-card-bottom'>
            <div className={`upvotes-count ${upvoted === true ? 'voted':''}`} onClick={handleUpvoted}>
              <svg className={`${upvoted === true ? 'voted-arrow':''}`} width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke="#4661E6" strokeWidth="2" fill="none" fillRule="evenodd"></path></svg>
              <span>{votes}</span>
            </div>
            <div className='comments-count'>
              <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z" fill="#CDD2EE" fillRule="nonzero"></path></svg>
              <span>{props.commentsNr}</span>
            </div>
        </div>
    </div>
  );
}

export default RequestCard;
