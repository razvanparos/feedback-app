import './FeedbackEdit.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import GoBack from '../components/GoBack/GoBack';
import editIcon from '../assets/icon-edit-feedback.svg'
import { useEffect, useState } from 'react';
import collect from 'collect.js';
import { FaCheck } from "react-icons/fa";



function FeedbackEdit() {
    const navigate = useNavigate();
    const {feedbackId}  = useParams();
    const [openDropdown, setOpenDropdown] = useState(false);
    const [openChangesSaved, setOpenChangesSaved] = useState(false);
    const [editDataTitle, setEditDataTitle] = useState('');
    const [editDataDetail, setEditDataDetail] = useState('');
    const [editDataCategory, setEditDataCategory] = useState('');
    const [error, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState(false);

    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('requestData'))
        const collection = collect(data);
        const filtered = collection.where('id', parseInt(feedbackId));
        setEditDataTitle(filtered.all()[0].title)
        setEditDataDetail(filtered.all()[0].description)
        setEditDataCategory(filtered.all()[0].category)
    },[])
   

    function handleEditDataTitle(e){
        setEditDataTitle(e.target.value);
    }
    function handleEditDataDetail(e){
        setEditDataDetail(e.target.value);
    }
    function handleCancel(event){
        event.preventDefault();
        navigate('/')
    }
    function rotateDropdown(){
        if(openDropdown===true){
            setOpenDropdown(false);
        }else{setOpenDropdown(true)}
    }
    function handleChangeCategory(e){
        var originalString = e.target.innerHTML;
        var splitString = originalString.split('<');
        var result = splitString[0];
        setEditDataCategory(result.toLowerCase());
    }
    function handleDelete(e){
        e.preventDefault();
        let data = JSON.parse(localStorage.getItem('requestData'))
        const updatedData = data.filter(item => item.id !== parseInt(feedbackId));
        localStorage.setItem('requestData', JSON.stringify(updatedData));
        setOpenChangesSaved(true);
            setTimeout(() => {
                setOpenChangesSaved(true);
                navigate('/');
            }, "2000"); 
    }

    function handleSaveChanges(e){
        e.preventDefault();
        if(!editDataTitle){
            setError(true);
        }else setError(false)
        if(!editDataDetail){
            setErrorDetail(true);
        }else setErrorDetail(false)
        if(editDataTitle && editDataDetail){
            let data = JSON.parse(localStorage.getItem('requestData'))
            const collection = collect(data);
            const filtered = collection.where('id', parseInt(feedbackId));
            filtered.all()[0].category=editDataCategory;
            filtered.all()[0].title=editDataTitle;
            filtered.all()[0].description=editDataDetail;
            localStorage.setItem('requestData', JSON.stringify(data))
            setOpenChangesSaved(true);
            setTimeout(() => {
                setOpenChangesSaved(true);
                navigate('/');
            }, "2000"); 
        }
        
    }
  return (
    <div className='feedback-edit-div'>
        <GoBack className='back'/>
        <form className='feedback-add-form-div'>
            <img className='plus-icon' src={editIcon} alt="" />
            <p className='feedback-form-title'>Edit Feedback {feedbackId}</p>

            <div className='feedback-add-title-div'>
                <p className='feedback-label'>Feedback Title</p>
                <p className='feedback-description'>Add a short, descriptive headline</p>
                <textarea className={`title-text-area ${error ?'area-error':''}`} type='text' value={editDataTitle} onChange={handleEditDataTitle} maxLength={255}></textarea>
                <p className={`error-msg ${error ?'':'hidden'}`}>Can't be blank</p>
            </div>

            <div className='feedback-add-title-div'>
                <p className='feedback-label'>Category</p>
                <p className='feedback-description'>Choose a category for your feedback</p>
            <div className='title-text-area category-div ' onClick={rotateDropdown}>
                {editDataCategory}
                <svg className={`category-dropdown-arrow ${openDropdown ? 'rotate':''}`} width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M1 1l4 4 4-4' stroke='#fff' strokeWidth='2' fill='none' fillRule='evenodd' />
                </svg>
                <div className={`dropdown-feedback-form ${openDropdown?'dropdown-feedback-form-open':'dropdown-feedback-form-closed'} `}>
                    <p onClick={handleChangeCategory} className='drop-item'>Feature<svg className={`${editDataCategory==='feature'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
                    <p onClick={handleChangeCategory} className='drop-item'>UI<svg className={`${editDataCategory==='ui'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
                    <p onClick={handleChangeCategory} className='drop-item'>UX<svg className={`${editDataCategory==='ux'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
                    <p onClick={handleChangeCategory} className='drop-item'>Enhancement<svg className={`${editDataCategory==='enhancement'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
                    <p onClick={handleChangeCategory} className='drop-item'>Bug<svg className={`${editDataCategory==='bug'?'':'hidden'}`} xmlns="http://www.w3.org/2000/svg" width="13" height="11"><path fill="none" stroke="#AD1FEA" strokeWidth="2" d="M1 5.233L4.522 9 12 1"></path></svg></p>
                </div>
            </div>
            </div>

      <div className='feedback-add-title-div'>
        <p className='feedback-label'>Feedback Detail</p>
        <p className='feedback-description'>Include any specific comments on what should be improved, added, etc.</p>
        <textarea className={`title-text-area ${errorDetail ?'area-error':''}`} type='text' value={editDataDetail} onChange={handleEditDataDetail} maxLength={255}></textarea>
        <p className={`error-msg ${errorDetail ?'':'hidden'}`}>Can't be blank</p>
      </div>
    <div className='edit-bottom-buttons'>
        <button className='feedback-page-add save-btn' onClick={handleSaveChanges}>Save Changes</button>
        <button className='feedback-page-add cancel-btn' onClick={handleCancel}>Cancel</button>
        <button className='feedback-page-add delete-btn' onClick={handleDelete}>Delete</button>
    </div>
      

      
    </form>

    <div className={`changes-saved ${openChangesSaved ?'changes-saved-show':'changes-saved-hide'}`}>
        <div className='verified'><FaCheck className='inverted'/></div> 
        <p className='changes-saved-text'>Changes saved!</p> 
    </div>

    </div>
  );
}

export default FeedbackEdit;
