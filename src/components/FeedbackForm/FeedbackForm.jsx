import React, { useState } from 'react';
import './FeedbackForm.css';
import plusIcon from '../../assets/plus-icon.svg'


export default function FeedbackForm(props) {

  const [openDropdown, setOpenDropdown] = useState(false);
  const [categoryValue, setCategoryValue] = useState('Feature');
  const [titleValue, setTitleValue] = useState('');
  const [detailValue, setDetailValue] = useState('');

  function rotateDropdown(){
    if(openDropdown===true){
        setOpenDropdown(false);
    }else{setOpenDropdown(true)}
  }
  function handleChangeCategory(e){
    var originalString = e.target.innerHTML;
    var splitString = originalString.split('<');
    var result = splitString[0];
    setCategoryValue(result);
}
  function handleTitleChange(e){
    setTitleValue(e.target.value)
  }
  function handleDetailChange(e){
    console.log(detailValue)
    setDetailValue(e.target.value)
  }

  function handleAddFeedbackFunction(event){
    event.preventDefault();
    props.addFeedbackFunction(titleValue,categoryValue,detailValue)
  }


  return (
    <form className='feedback-add-form-div'>
      <img className='plus-icon' src={plusIcon} alt="" />
      <p className='feedback-form-title'>Create New Feedback</p>

      <div className='feedback-add-title-div'>
        <p className='feedback-label'>Feedback Title</p>
        <p className='feedback-description'>Add a short, descriptive headline</p>
        <input className='title-text-area' type='text' value={titleValue} onChange={handleTitleChange}></input>
      </div>

      <div className='feedback-add-title-div'>
        <p className='feedback-label'>Category</p>
        <p className='feedback-description'>Choose a category for your feedback</p>
        <div className='title-text-area category-div ' onClick={rotateDropdown}>
          {categoryValue}
          <svg className={`category-dropdown-arrow ${openDropdown ? 'rotate':''}`} width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
              <path d='M1 1l4 4 4-4' stroke='#fff' strokeWidth='2' fill='none' fillRule='evenodd' />
            </svg>
          <div className={`dropdown-feedback-form ${openDropdown?'':'hidden'} `}>
              <p onClick={handleChangeCategory} className='drop-item'>Feature<svg className={``} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
              <p onClick={handleChangeCategory} className='drop-item'>UI<svg className={``} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
              <p onClick={handleChangeCategory} className='drop-item'>UX<svg className={``} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
              <p onClick={handleChangeCategory} className='drop-item'>Enhancement<svg className={``} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
              <p onClick={handleChangeCategory} className='drop-item'>Bug<svg className={``} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
          </div>
        </div>
       
      </div>

      <div className='feedback-add-title-div'>
        <p className='feedback-label'>Feedback Detail</p>
        <p className='feedback-description'>Include any specific comments on what should be improved, added, etc.</p>
        <input className='title-text-area' type='text' value={detailValue} onChange={handleDetailChange}></input>
      </div>

      <button className='feedback-page-add' onClick={handleAddFeedbackFunction}>Add Feedback</button>

      
    </form>
  );
}