import { Link } from 'react-router-dom';
import './add-feedback.css';
import { useEffect, useState } from 'react';



function AddFeedback(props) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [sortByValue, setSortByValue] = useState('Most Upvotes');

    function rotateDropdown(){
        if(openDropdown===true){
            setOpenDropdown(false);
        }else{setOpenDropdown(true)}
    }
    function handleChangeSortBy(e){
        var originalString = e.target.innerHTML;
        var splitString = originalString.split('<');
        var result = splitString[0];
        setSortByValue(result);
        
    }
    useEffect(()=>{
      props.changeSortByFunction(sortByValue);
    },[sortByValue])

    
   
  return (
    <div className="add-feedback-div">
      <div className='votes-count-div'>
        <p className={`p-count ${props.count===1 ? 'hidden':''}`}>{props.count} Suggestions</p>
        <p className={`p-count ${props.count===1 ? '':'hidden'}`}>{props.count} Suggestion</p>
        <button className='sort-by' onClick={rotateDropdown} >
          Sort by: <span>{sortByValue}</span>
          <svg className={openDropdown ?   'active':undefined } width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1 1l4 4 4-4' stroke='#fff' strokeWidth='2' fill='none' fillRule='evenodd' />
          </svg>
          
        <div className={`dropdown ${openDropdown ? 'dropdown-open' :' dropdown-close'}`}>
            <p onClick={handleChangeSortBy} className='drop-item'>Most Upvotes<svg className={`${sortByValue==='Most Upvotes'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
            <p onClick={handleChangeSortBy} className='drop-item'>Least Upvotes<svg className={`${sortByValue==='Least Upvotes'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
            <p onClick={handleChangeSortBy} className='drop-item'>Most Comments<svg className={`${sortByValue==='Most Comments'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
            <p onClick={handleChangeSortBy} className='drop-item'>Least Comments<svg className={`${sortByValue==='Least Comments'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
        </div>
        </button>
      </div>
      
        
        <Link to={'/feedback-add'} className='add-feedback-btn'>+ Add Feedback</Link>
    </div>
  );
}

export default AddFeedback;
