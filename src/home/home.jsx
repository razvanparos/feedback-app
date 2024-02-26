import AddFeedback from '../components/add-feedback/add-feedback';
import HomeBoard from '../components/home-board/home-board';
import './home.css';
import React, { useState,useEffect } from 'react';
import Data from '../data.json'
import RequestCard from '../components/request-card/request-card';
import collect from 'collect.js';
import NoResultsImg from '../assets/illustration-empty.bcc93d24.svg'
import { Link } from 'react-router-dom';


function Home() {
    const [filter, setFilter]=useState('all');
    const [requestData, setRequestData] = useState(() => {
    const storedData = localStorage.getItem('requestData');
    return storedData ? JSON.parse(storedData) : Data.productRequests;
  });
  const [requestCardCount, setRequestCardCount]=useState(0);
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
  

  // console.log(Data.productRequests);

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
  function filterChange(filter2){
    setFilter(filter2.toLowerCase());  
    console.log(filter2.toLowerCase())
  }
  useEffect(() => {
    let count = 0;
    requestData.forEach(request => {
      if (filter === 'all' || request.category === filter) {
        count++;
      }
    });
    setRequestCardCount(count);
  }, [filter]);



  return (
    <div className="home-div">
      <HomeBoard 
        filterChange={filterChange}
      />
      <AddFeedback
        changeSortByFunction={changeSortByFunction}
        count={requestCardCount}
      />
      <div className='requests-div'>
        {requestData.map((request)=>{
          if(filter==='all'){
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
            notClickable={false}
            />
          );
          }
          if(request.category===filter){
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
            notClickable={false}
            />
           
          );
          }
        })}
      </div>
      <div className={`no-results ${requestCardCount===0 ? '':'hidden'}`}>
          <img src={NoResultsImg} alt="" />
          <p>There is no feedback yet.</p>
          <p className='got-suggestion'>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
          <Link to={'/feedback-add'} className='add-feedback-btn'>+ Add Feedback</Link>
      </div>
    </div>
  );
}

export default Home;






