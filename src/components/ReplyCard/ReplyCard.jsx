import './ReplyCard.css';

function ReplyCard(props) {  
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
          <button className='comment-reply-btn'>Reply</button>
        </div>
        <div className='comment-content'>
            <span className='reply-to'>@{props.replyTo}</span> 
            {props.replyContent}
        </div>
    </div>
  );
}

export default ReplyCard;
