import { useState } from 'react';
import './ReplyCard.css';

function ReplyCard(props) {  
  const [replyBoxStatus,setReplyBoxStatus]=useState(false)
  const [replyBoxText,setReplyText]=useState('')
  const [replyTo,setReplyTo]=useState(props.replyUser.username)
  
  function openReplyBox(){
    if(replyBoxStatus===false){
      setReplyBoxStatus(true)
    }else setReplyBoxStatus(false)
  }

  function handleReplyBoxTextChange(e){
    setReplyText(e.target.value)
  }

  function handlePostreply(){
    props.postReplyReply(replyBoxText,replyTo);
    console.log(replyTo)
    setReplyText('')
    openReplyBox()
  }

  return (
    <div className={`reply-card-div`}>
        <div className='comment-top'>
          <div className='comment-top-user'>
          <img className='user-image' src={`https://lm-product-feedback-app.netlify.app${props.replyUser.image.split('.')[1]}.jpg`} alt="" />
            <div className='user-details'>
              <p className='user-name'>{props.replyUser.name}</p>
              <p className='user-username'>@{props.replyUser.username}</p>
            </div>
          </div>
          <button className='comment-reply-btn' onClick={openReplyBox}>Reply</button>
        </div>
        <div className='comment-content'>
            <span className='reply-to'>@{props.replyTo}</span> 
            {props.replyContent}
        </div>
        <div className={`post-reply-div ${replyBoxStatus?'post-reply-div-open':'post-reply-div-close'}`}>
          <textarea type="text" placeholder='Type your reply here' value={replyBoxText} onChange={handleReplyBoxTextChange}/>
          <button className='post-reply-btn' onClick={handlePostreply}>Post Reply</button>
        </div>
    </div>
    
  );
}

export default ReplyCard;
