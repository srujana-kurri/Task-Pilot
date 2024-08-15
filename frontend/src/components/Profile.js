import React, { useEffect, useState } from 'react';
import './Profile.css';
import Navbar from './Navbar';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { getData } from '../reduxstore/dataslice';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Toaster, toast } from 'sonner'

const Profile = () => {

    const data = useSelector((state)=>{return state.app.user});
    const dispatch = useDispatch();
    // Dummy user data, replace this with your actual user data
    const [user, setUser] = useState({
        username: data.name,
    email: data.email,
    password: data.password,
  });
  
  // State to manage the form inputs
  const [formData, setFormData] = useState({
      username: user.username,
    email: user.email,
    password: user.password,
  });

  // State to track whether the edit mode is active
  const [editMode, setEditMode] = useState(false);
  
  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission (update user details)
  const handleFormSubmit = (e) => {
      e.preventDefault();
      
      setUser({
          ...user,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        try {
            axios.put(`http://localhost:4000/updatedetails/${sessionStorage.getItem("id")}`, {
                name: formData.username,
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                if (res.status === 200) {
                  dispatch(getData());
                }
            })
            .catch((error) => {
                console.error(error);
                alert("An error occurred while updating user details");
            });
            
        } catch (e) {
            console.error(e);
            alert("An error occurred.");
        }
        // Exit edit mode
        toast.success("Updated the details successfully");
        setEditMode(false);
    };
    
    useEffect(()=>{
        dispatch(getData());
    },[]);
  // Function to get the first letter of the username
  const getInitialLetter = () => {
    return user.username ? user.username.charAt(0).toUpperCase() : '';
  };

  return (
   <div>
        <Navbar/>
    <ToastContainer/>
     <div className="profile-container d-flex align-items-center justify-content-center" >
      <div className="profile-details">
        <div className=" d-flex flex-row align-items-center justify-content-start  text-center">
          <div className="profile-icon">{getInitialLetter()}</div>
          <h2 className=' mt-2 text-center'>User details</h2>
        </div>
        {!editMode && (
          <div className='mt-2'>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Password:</strong> {user.password}
            </p>
          </div>
        )}

        {editMode ? (
          // Form for editing user details
          <form className="profile-form mt-3" onSubmit={handleFormSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="submit" className="save-button" >
              Save
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </form>
        ) : null}

        {/* Toggle edit mode button */}
        {editMode ? '' : <button className="edit-button" onClick={() => setEditMode(!editMode)}>Edit</button>}
      </div>
    </div>
   </div>
  );
};

export default Profile;
