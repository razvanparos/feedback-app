import './home-board.css';
import IconHamburger from '../../assets/hamburger-open.svg'
import IconClose from '../../assets/icon-close.svg'
import { useState,useEffect } from 'react';

function HomeBoard() {
    const [sideBarOpen,setSideBarOpen]= useState(false)
    const [activeFilter,setActiveFilter]= useState('All')
   
   
  function toggleSideBar() {
    setSideBarOpen(prevState => !prevState);
}

    function handleFilterChange(e){
      setActiveFilter(e.target.innerHTML)
    }

  return (
    <div className={`home-board-div ${sideBarOpen===true ?'':''}`}>
      <div className='home-board-left'>
        <h2>Frontend Mentor</h2>
        <p>Feedback board</p>
      </div>
      <button className='hamburber-button' onClick={toggleSideBar}>
        <img className={`${sideBarOpen ? 'hidden' : ''}`} src={IconHamburger} alt="" />
        <img className={`${sideBarOpen ? '' : 'hidden'}`} src={IconClose} alt="" />
      </button>

      <div className={`side-bar-div ${sideBarOpen ? 'side-bar-show' : 'side-bar-hide'}`} > 
        <div className={`side-bar-content ${sideBarOpen ? 'side-bar-content-show' : 'side-bar-content-hide'}`}> 
            <ul className='filters'>
                <li className={`${activeFilter === 'All' ? 'filter-active' : 'non-active'}`} onClick={handleFilterChange}>All</li>
                <li className={`${activeFilter === 'UI' ? 'filter-active' : 'non-active'}`} onClick={handleFilterChange}>UI</li>
                <li className={`${activeFilter === 'UX' ? 'filter-active' : 'non-active'}`} onClick={handleFilterChange}>UX</li>
                <li className={`${activeFilter === 'Bug' ? 'filter-active' : 'non-active'}`} onClick={handleFilterChange}>Bug</li>
                <li className={`${activeFilter === 'Feature' ? 'filter-active' : 'non-active'}`} onClick={handleFilterChange}>Feature</li>
                <li className={`${activeFilter === 'Enhancements' ? 'filter-active' : 'non-active'}`} onClick={handleFilterChange}>Enhancements</li>        
            </ul>
            
            <div className='roadmap-div'>
                <div className='roadmap-title'>
                    <h3>Roadmap</h3>
                    <a href="">View</a>
                </div>
                <ul className='roadmap-list'>
                    <li><div className='list-item'><div className='bullet'></div>Planned</div>2</li>
                    <li><div className='list-item'><div className='bullet'></div>In-Progress</div>3</li>
                    <li><div className='list-item'><div className='bullet'></div>Live</div>1</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBoard;
