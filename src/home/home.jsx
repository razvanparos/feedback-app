import AddFeedback from '../components/add-feedback/add-feedback';
import HomeBoard from '../components/home-board/home-board';
import './home.css';
import React, { useState,useEffect } from 'react';
import Data from '../data.json'
import RequestCard from '../components/request-card/request-card';
import { DateRange } from '@mui/icons-material';

function Home() {
  const [requestData, setRequestData] = useState(() => {
    const storedData = localStorage.getItem('requestData');
    return storedData ? JSON.parse(storedData) : Data.productRequests;
  });
  useEffect(() => {
    localStorage.setItem('requestData', JSON.stringify(requestData));
    
  }, [requestData]);
  console.log(Data);

  function upvoteFunction(id){
    let storedData = JSON.parse(localStorage.getItem('requestData'));
    if(storedData[id-1].upvoted===false){
      storedData[id-1].upvoted=true;
      storedData[id-1].upvotes+=1;
    }else{
      storedData[id-1].upvoted=false;
      storedData[id-1].upvotes-=1;
    }
    setRequestData(storedData);
    console.log(storedData[id-1])
  }

  return (
    <div className="home-div">
      <HomeBoard/>
      <AddFeedback/>
      <div className='requests-div'>
        {requestData.map((request)=>{
          return(
            <RequestCard
            key={request.id}
            id={request.id}
            title={request.title}
            description={request.description}
            category={request.category}
            upvotes={request.upvotes}
            commentsNr={request.comments.length}
            upvoted={request.upvoted}
            upvoteFunction={upvoteFunction}
            />
           
          );
        })}
      </div>
    </div>
  );
}

export default Home;






