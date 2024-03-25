import { useState } from 'react';
import './CommentCard.css';
import ReplyCard from '../ReplyCard/ReplyCard';


function CommentCard(props) {
  const [replyBoxStatus,setReplyBoxStatus]=useState(false)
  const [replyBoxText,setReplyText]=useState('')
  const [replyBoxTo,setReplyTo]=useState(props.username)
  const [replyId,setReplyId]=useState(props.id)

  function openReplyBox(){
    if(replyBoxStatus===false){
      setReplyBoxStatus(true)
    }else setReplyBoxStatus(false)
  }
  function handleReplyBoxTextChange(e){
    setReplyText(e.target.value)
  }
  function handlePostreply(){
    if(replyBoxText){
      props.updateComments(replyBoxText,replyBoxTo,replyId);
      setReplyText('');
      openReplyBox();
    }
    
  }
  function postReplyReply(text,to){
    props.updateComments(text,to,replyId);
  }
    
  return (
    <div className={`comment-card-div ${props.repliesNr === undefined ? 'comment-border-bottom' : ''}`}>
        <div className='comment-top'>
          <div className='comment-top-user'>
            <img className='user-image' src={`https://lm-product-feedback-app.netlify.app${props.userImage.split('.')[1]}.jpg`} alt="" />
            <div className='user-details'>
              <p className='user-name'>{props.name}</p>
              <p className='user-username'>@{props.username}</p>
            </div>
          </div>
          <button className='comment-reply-btn' onClick={openReplyBox}>Reply</button>
        </div>
        <p className='comment-content'>{props.content}</p>
        <div className={`post-reply-div ${replyBoxStatus?'post-reply-div-open':'post-reply-div-close'}`}>
          <textarea type="text" placeholder='Type your reply here' value={replyBoxText} onChange={handleReplyBoxTextChange}/>
          <button className='post-reply-btn' onClick={handlePostreply}>Post Reply</button>
        </div>
        {props.replies?.map((reply,i)=>{
          return(
            <ReplyCard
              key={i}
              replyContent={reply.content}
              replyTo={reply.replyingTo}
              replyUser={reply.user}
              postReplyReply={postReplyReply}
            />
          );
        })}

    </div>
    
  );
}

export default CommentCard;
