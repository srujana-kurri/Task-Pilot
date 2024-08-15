import React, { useState, useEffect,useMemo } from 'react';
import { useUser } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getData } from '../reduxstore/dataslice';
import { handleSave } from './TaskManager';
import { DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import { Toaster, toast } from 'sonner'


const  ConfirmationModalStyle = {
  content: {
    width: '250px', 
    height: '200px',
    margin: 'auto',
    color: '#555555' ,
    align:'center',
    backgroundColor: 'rgba(248, 117, 170, 0.5)', 
    borderRadius: '10px',
    padding: '20px',
    border: '2px solid #FF0000', 
    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.8)',
  },
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  
};

const yesButtonStyle = {
  backgroundColor: '#D83F31', // Set the background color for the "YES" button
  color: 'white', // Set the text color
  border: 'none', // Remove the button border
  padding: '10px 20px', // Adjust padding as needed
  borderRadius: '15px', // Add rounded corners
  cursor: 'pointer',
  marginRight: '10px',
};

const noButtonStyle = {
  backgroundColor: '#005B41', // Set the background color for the "NO" button
  color: 'white', // Set the text color
  border: 'none', // Remove the button border
  padding: '10px 20px', // Adjust padding as needed
  borderRadius: '15px', // Add rounded corners
  cursor: 'pointer',
};
const editStyle = {
  
  marginLeft:'65%' ,
  color: 'green',
  };
  const deleteStyle = {
    color: 'red',
  } ;

const TaskEditStyle = {
  position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '0px 30px',
    border: '2px solid black',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: '9999',
  width: '50%', 
  height:"fit-content",
};

function Lists() {
  const user = useSelector((state)=> { return state.app.user});
  console.log(user);
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskid,setTaskid] = useState("");
  const handleCheckboxChange = (id,status) => {
    if(!status){
      toast.success('Good job on completing the task');
    }
    try {
      axios
      .put(`http://localhost:4000/updatestatus/${sessionStorage.getItem("id")}/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Completed the task yayy")
          dispatch(getData());
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while updating the task");
      });
    } catch (e) {
      console.error(e);
      alert("An error occurred.");
    }
  };
  
  const tasksWithToggles = useMemo(() => {
    if (user && user.tasks) {
      return user.tasks.map(task => ({ ...task, toggle: false })).reverse();
    }
    return [];
  }, [user]);
  
  useEffect(() => {
    setTasks(tasksWithToggles);
  }, [tasksWithToggles])
  
  
  const [toggleState, setToggleState] = useState({});
  
  const handleToggle = (taskId) => {
    setToggleState((prevToggleState) => ({
      ...prevToggleState,
      [taskId]: !prevToggleState[taskId],
    }));
    console.log(tasks);
  };
  
  const handleDeleteTask = (id) => {
    setTaskid(id);
    setShowDeleteConfirmation(true);
    console.log(id + "id you want to delete");
  };
  
  const confirmDeleteTask = () => {
    if (taskid !== null) {
      try {
        axios.delete("http://localhost:4000/delete-task/" + sessionStorage.getItem("id")+ "/" + taskid + "/")
        .then((res) => {
          if (res.status === 200) {
            toast.success('Task deleted successfully'); // Trigger the toast message
          }
        }).catch((e) => alert(e));
      } catch (e) {
        alert(e);
      }
      closeEditModal();
      setShowDeleteConfirmation(false);
    }
  } ;
  
  const openEditModal = (index,id) => {
    console.log(index + "id" + id);
    setEditedTask({ ...tasks[index], id});
    console.log(editedTask);
    setShowModal(true);
  };
  
  const closeEditModal = () => {
    setEditedTask(null);
    setShowModal(false);
  };
  
  const handleEditTask = async () => {
    if (editedTask) {
      try {
        // Create an object with all the updated fields
        const updatedTask = {
          _id: editedTask._id,
          title: editedTask.title,
          category: editedTask.category,
          duedate: editedTask.duedate,
          time: editedTask.time,
          description: editedTask.description,
          
        };
        const response = await axios.put(
          `http://localhost:4000/updatetask/${sessionStorage.getItem("id")}/${editedTask._id}`,
          updatedTask
          );
  
          if (response.status === 200) {
            // Update the state only if the backend update is successful
            const updatedTasks = tasks.map((task) => {
              if (task._id === editedTask._id) {
                return updatedTask;
              }
              return task;
            });
            
            setTasks(updatedTasks);
            closeEditModal();
            
            toast.success('Task updated successfully'); // Trigger the toast message
          } else {
            console.error(response.data); // Log any error messages from the backend
            alert("An error occurred while updating the task");
          }
        } catch (error) {
          console.error(error);
          alert("An error occurred while updating the task");
        }
      }
    };
    
    
    
    const dispatch = useDispatch();
    useEffect(()=>{
    dispatch(getData());
  },[dispatch]);
  window.addEventListener('scroll', handleCheckboxChange, { passive: true });
  
  return (
    <div className='container-fluid list'>
      <ToastContainer />
      {tasks.length === 0 && (<h1 className='text-center text-light'>You haven't created any tasks yet.</h1>)}
      {tasks.map((task, index) => {
        const isToggled = toggleState[task._id] || false;
        if(!task.status){
          return (
            <div className={`task-container rounded m-4 px-3 py-1`} key={task._id} >
            <div className='d-flex justify-content-between py-1'>
              <div className="d-flex gap-2">
              <input type="checkbox" checked={task.completed} className='mb-1' onChange={() => handleCheckboxChange(task._id,task.status)} />
              <h4>{task.title}</h4>
              </div>
              <i className={`fa-solid task-icon fa-xl ${isToggled ? 'fa-caret-up' : 'fa-caret-down'} mt-2`} onClick={() => handleToggle(task._id)}></i>
            </div>
            
            <div className='d-flex justify-content-between px-3'>
              <h5><i className="fa-solid fa-icons"></i> {task.category}</h5>
              {task.duedate && (
                <h5><i className="fa-solid fa-hourglass-start"></i> Due date: {task.duedate.substring(0, 10)}</h5>
              )}
            </div>
            {isToggled && (
              <div className='px-3'>
                <p>Description: {task.description}</p>
                <div className="task-options d-flex gap-3 justify-content-end">
                  <span style={ editStyle} onClick={() => openEditModal(index,task._id)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </span>
                  <span style={ deleteStyle}  onClick={() => handleDeleteTask(task._id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </span>
                </div>
              </div>
            )}
          </div>
          )
        }
          
})}      
    {tasks.map((task, index) => {
        const isToggled = toggleState[task._id] || false;
        if(task.status){
          return (
            <div className={`task-container rounded m-4 px-3 py-1`} key={task._id} style={{backgroundColor:"rgb(123, 128, 132)"}}>
            <div className='d-flex justify-content-between py-1'>
              <div className="d-flex gap-2">
              <input type="checkbox" checked className='mb-1' onChange={() => handleCheckboxChange(task._id,task.status)} />
              <h4 style={{ textDecoration: 'line-through'}}>{task.title}</h4>
              </div>
              <i className={`fa-solid task-icon fa-xl ${isToggled ? 'fa-caret-up' : 'fa-caret-down'} mt-2`} onClick={() => handleToggle(task._id)}></i>
            </div>
            
            <div className='d-flex justify-content-between px-3'>
              <h5><i className="fa-solid fa-icons"></i> {task.category}</h5>
              {task.duedate && (
                <h5><i className="fa-solid fa-hourglass-start"></i> Due date: {task.duedate.substring(0, 10)}</h5>
              )}
            </div>
            {isToggled && (
              <div className='px-3 '>
                <p>Description: {task.description}</p>
                <div className="task-options d-flex gap-3">
                  <span onClick={() => openEditModal(index,task._id)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </span>
                  <span onClick={() => handleDeleteTask(task._id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </span>
                </div>
              </div>
            )}
          </div>
          )
        }
          
})}
      <Modal
        isOpen={showDeleteConfirmation}
        onRequestClose={() => setShowDeleteConfirmation(false)}
        contentLabel="Confirm Delete Task"
        ariaHideApp={false}
        style={ConfirmationModalStyle}
      >
        <h3>Are you sure you want to delete the task?</h3>
        <div style={buttonContainerStyle}>
          <button style={yesButtonStyle} onClick={confirmDeleteTask}>YES</button>
          <button style={noButtonStyle} onClick={() => setShowDeleteConfirmation(false)}>NO</button>
        </div>
      </Modal>
      <Modal
  isOpen={showModal}
  onRequestClose={closeEditModal}
  contentLabel="Edit Task"
  ariaHideApp={false}
  className="task-modal"
  style={{
    content: TaskEditStyle,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <div>
    <DialogTitle>Edit Task</DialogTitle>
    {editedTask && (
      <DialogContent dividers>
       <TextField
  className='mt-1'
  label="Title"
  fullWidth
  value={editedTask.title}
  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
/>

<TextField
  className='mt-1'
  label="Category"
  fullWidth
  value={editedTask.category}
  onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
/>

<TextField
  className='mt-1'
  label="Date"
  type="date"
  fullWidth
  value={editedTask.duedate}
  onChange={(e) => setEditedTask({ ...editedTask, duedate: e.target.value })}
/>

<TextField
  className='mt-1'
  label="Time"
  type="time"
  fullWidth
  value={editedTask.time}
  onChange={(e) => setEditedTask({ ...editedTask, time: e.target.value })}
/>

<TextField
  className='mt-1'
  label="Description"
  fullWidth
  multiline
  rows={4}
  value={editedTask.description}
  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
/>

      </DialogContent>
    )}
    <div style={{ marginTop: 'auto', width: '100%' }}>
      <DialogActions>
        <Button onClick={handleEditTask} color="primary">
          Save
        </Button>
        <Button onClick={closeEditModal} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </div>
  </div>
</Modal>

    </div>
  );
}

export default Lists;

