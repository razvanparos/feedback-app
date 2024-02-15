import collect from 'collect.js';
import './FeedbackIndividual.css';
import { useParams } from 'react-router-dom';
import GoBack from '../components/GoBack/GoBack';
import RequestCard from '../components/request-card/request-card';
import { useNavigate } from 'react-router-dom';
import CommentCard from '../components/CommentCard/CommentCard';
import { useEffect } from 'react';
import Data from '../data.json'

function FeedbackIndividual() {
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

  return (
    <div className='feedback-individual-div'>
      <div className='feedback-individual-top'>
         <GoBack/>
         <button className='edit-feedback'>Edit Feedback</button>
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
      </div>
        
    </div>
    
    
  );
}

export default FeedbackIndividual;
