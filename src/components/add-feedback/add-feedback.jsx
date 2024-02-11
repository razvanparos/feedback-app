import './add-feedback.css';
import WbIncandescentOutlinedIcon from '@mui/icons-material/WbIncandescentOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';


function AddFeedback() {
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
   
  return (
    <div className="add-feedback-div">
        <button className='sort-by' onClick={rotateDropdown}>
            Sort by: <span>{sortByValue}</span>
            <svg className={openDropdown ?   'active':undefined } width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
              <path d='M1 1l4 4 4-4' stroke='#fff' strokeWidth='2' fill='none' fillRule='evenodd' />
            </svg>
          </button>
        <div className={`dropdown ${openDropdown ? 'dropdown-open' :' dropdown-close'}`}>
            <p onClick={handleChangeSortBy} className='drop-item'>Most Upvotes<svg className={`${sortByValue==='Most Upvotes'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
            <p onClick={handleChangeSortBy} className='drop-item'>Least Upvotes<svg className={`${sortByValue==='Least Upvotes'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
            <p onClick={handleChangeSortBy} className='drop-item'>Most Comments<svg className={`${sortByValue==='Most Comments'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
            <p onClick={handleChangeSortBy} className='drop-item'>Least Comments<svg className={`${sortByValue==='Least Comments'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
        </div>
        <button className='add-feedback-btn'>+ Add Feedback</button>
    </div>
  );
}

export default AddFeedback;
