import React, { useState } from 'react';
import { FaUserCircle, FaPlus } from 'react-icons/fa';
import './Navbar.css';
import TaskManager from './TaskManager';
import { Link, useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';

function Navbar() {
  
  const [isVibrating, setIsVibrating] = useState(false);
  const [isTaskManagerOpen, setIsTaskManagerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleVibrateClick = () => {
    if (!isVibrating) {
      setIsVibrating(true);
      setTimeout(() => {
        setIsVibrating(false);
      }, 200);
    }
  };
  
  const openTaskManager = () => {
    setIsTaskManagerOpen(true);
    // Close the dropdown when opening TaskManager
    setIsDropdownOpen(false);
  };
  
  const toggleDropdown = () => {
    // Close TaskManager when toggling the dropdown
    setIsTaskManagerOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };
  const logout = ()=>{
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
    console.log("clicked")
  }
  
  window.addEventListener('scroll', logout, { passive: true });
  return (
    <nav className="navbar d-flex justify-content-between p-0 ">
      <div className='navbar-brand ms-4 nav-img'>
        <Link to={"/Home/Dashboard"}><img src="logo.png" alt="cant load" className='rounded-circle' /></Link>
      </div>
      <div className="d-flex">
        <div className={`red-circle navbar-icon ${isVibrating ? 'vibrate' : ''}`} onClick={handleVibrateClick}>
          <FaPlus size={25} onClick={openTaskManager} />
        </div>
        <div className="navbar-icon me-5" onClick={toggleDropdown}>
        <FaUserCircle size={30} />
        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link to="/About">About</Link> {/* Link to the About page */}
            <Link to="/Profile">Profile</Link>
            <Button onClick={logout} >Logout</Button>
          </div>
        )}
      </div>
      </div>
      {isTaskManagerOpen && (
        <div className="task-manager-portal">
          <TaskManager onClose={() => setIsTaskManagerOpen(false)} />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
