import GoBack from '../components/GoBack/GoBack';
import './FeedbackAddPage.css';
import { useNavigate } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm/FeedbackForm';
import collect from 'collect.js';


function FeedbackAddPage() {
    const navigate = useNavigate();
    
    function addFeedbackFunction(title,category,detail){
      let data = JSON.parse(localStorage.getItem('requestData'))
      const collection = collect(data);
      const max = collection.max('id');
      let newFeedback={
          id: max+1,
          title: title,
          category: category,
          upvotes: 0,
          upvoted: false,
          status: 'suggestion',
          description: detail,
          comments: [],
      }

      data.push(newFeedback)
      localStorage.setItem('requestData', JSON.stringify(data)); 
      navigate('/');
    }

  return (
    <div className='feedback-add-page-div'>
      <GoBack/>
      <FeedbackForm addFeedbackFunction={addFeedbackFunction}/>
    </div>

  );
}
export default FeedbackAddPage;
