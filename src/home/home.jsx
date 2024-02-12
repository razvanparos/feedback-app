import AddFeedback from '../components/add-feedback/add-feedback';
import HomeBoard from '../components/home-board/home-board';
import './home.css';
import React, { useState,useEffect } from 'react';
import Data from '../data.json'
import RequestCard from '../components/request-card/request-card';
import collect from 'collect.js';


function Home() {
  const [requestData, setRequestData] = useState(() => {
    const storedData = localStorage.getItem('requestData');
    return storedData ? JSON.parse(storedData) : Data.productRequests;
  });
  useEffect(() => {
    localStorage.setItem('requestData', JSON.stringify(requestData)); 
    let storedData = JSON.parse(localStorage.getItem('requestData'));
    const collection = collect(storedData)
    const sorted = collection.sortBy('upvotes')
    setRequestData(sorted.all().reverse());
  }, []);
  useEffect(() => {
    localStorage.setItem('requestData', JSON.stringify(requestData)); 
  }, [requestData]);

  console.log(Data.productRequests);

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
    
    setRequestData(storedData);
  }
  
  function changeSortByFunction(r){
    let storedData = JSON.parse(localStorage.getItem('requestData'));
     if(r==='Least Upvotes'){
      const collection = collect(storedData)
      const sorted = collection.sortBy('upvotes')
      setRequestData(sorted.all());
    }
     if(r==='Most Upvotes'){
      const collection = collect(storedData)
      const sorted = collection.sortBy('upvotes')
      setRequestData(sorted.all().reverse());
    }
     if(r==='Most Comments'){
      const collection = collect(storedData)
      const sorted = collection.sortBy('comments')
      setRequestData(sorted.all().reverse());
    }
     if(r==='Least Comments'){
      const collection = collect(storedData)
      const sorted = collection.sortBy('comments')
      setRequestData(sorted.all());
    }
  }

  return (
    <div className="home-div">
      <HomeBoard/>
      <AddFeedback
        changeSortByFunction={changeSortByFunction}
      />
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






