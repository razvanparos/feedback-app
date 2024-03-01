import collect from 'collect.js';
import './FeedbackIndividual.css';
import { useParams } from 'react-router-dom';
import GoBack from '../components/GoBack/GoBack';
import RequestCard from '../components/request-card/request-card';
import { useNavigate } from 'react-router-dom';
import CommentCard from '../components/CommentCard/CommentCard';
import Data from '../data.json'
import { useState } from 'react';


function FeedbackIndividual() {
    const [charactersLeft, setCharactersLeft]=useState(255);
    const [newComment, setNewComment]=useState('');
    const navigate = useNavigate();
    const {feedbackId}  = useParams();
    const storedData = JSON.parse(localStorage.getItem('requestData'));
    const collection = collect(storedData);
    const filtered = collection.where('id', parseInt(feedbackId));
    const pageData = filtered.all()[0];
   
    function upvoteFunction(id){
        let storedData = JSON.parse(localStorage.getItem('requestData'));
        const collection = collect(storedData);
        const filtered = collection.where('id', id);
        if(filtered.all()[0].upvoted===false){
          filtered.all()[0].upvoted=true;
          filtered.all()[0].upvotes+=1;
        }else{
          filtered.all()[0].upvoted=false;
          filtered.all()[0].upvotes-=1;
        }
        
        localStorage.setItem('requestData', JSON.stringify(storedData)); 
        navigate(`/feedback/${feedbackId}`);
      
        
      }

      function updateComments(content,to,id){
        let newComment={
          content: content,
          replyingTo:to,
          user:Data.currentUser
      }
        let data = JSON.parse(localStorage.getItem('requestData'))
        const collection = collect(data);
        const filtered = collection.where('id', parseInt(feedbackId));
        const updateData = filtered.all()[0];
        const collection2 = collect(updateData.comments);
        const filtered2 = collection2.where('id', id);
        const max = collection2.max('id');
        if(!filtered2.all()[0].replies){
          let replies = [];
          filtered2.all()[0].replies = replies;
          filtered2.all()[0].replies.push(newComment);
        }else {
          filtered2.all()[0].replies.push(newComment);
        }
        localStorage.setItem('requestData', JSON.stringify(data)); 
        navigate(`/feedback/${parseInt(feedbackId)}`);
      }

      function handleCommentChange(e){
        setNewComment(e.target.value)
        let length = e.target.value.length;
        setCharactersLeft(255-length);
      }
      function handleCommentPost(){
       
        setNewComment('');
        setCharactersLeft(255);
        let data = JSON.parse(localStorage.getItem('requestData'))
        const collection = collect(data);
        const filtered = collection.where('id', parseInt(feedbackId));
        const updateData = filtered.all()[0];
        const collection2 = collect(updateData.comments);
        const max = collection2.max('id');
        let newCommentt={
          id: max+1,
          content: newComment,
          user:Data.currentUser
        }
        collection2.all().push(newCommentt);
        localStorage.setItem('requestData', JSON.stringify(data)); 
        navigate(`/feedback/${parseInt(feedbackId)}`);
      }
      function navigateToEdit(){
        navigate(`/feedback/edit/${parseInt(feedbackId)}`);
        document.body.scrollTop = 0;
      }

  return (
    <div className='feedback-individual-div'>
      <div className='feedback-individual-top'>
         <GoBack/>
         <button className='edit-feedback' onClick={navigateToEdit}>Edit Feedback</button>
      </div>
      <div className='feedback-individual-main'>
        <RequestCard
            id={pageData.id}
            title={pageData.title}
            description={pageData.description}
            category={pageData.category}
            upvotes={pageData.upvotes}
            commentsNr={pageData.comments.length}
            upvoted={pageData.upvoted}
            notClickable={true}
            upvoteFunction={upvoteFunction}
        />
        <div className='comment-cards-div'>
          {pageData.comments?.map((comm)=>{
            return(
              <CommentCard
                key={comm.id}
                id={comm.id}
                userImage={comm.user.image}
                name={comm.user.name}
                username={comm.user.username}
                content={comm.content}
                repliesNr={comm.replies?.length}
                replies={comm.replies}
                updateComments={updateComments}
              
              />
            );
          })}
        </div>
        <div className='add-comment-div'>
          <h3 className='add-comment'>Add Comment</h3>
          <textarea type="text" placeholder='Type your comment here' maxLength={255} onChange={handleCommentChange} value={newComment}/>
          <div className='add-comment-div-bottom'>
            <p className='characters-left'>{charactersLeft} characters left</p>
            <button className='post-reply-btn' onClick={handleCommentPost}>Post Comment</button>
          </div>
        </div>
      </div>
        
    </div>
    
    
  );
}

export default FeedbackIndividual;
