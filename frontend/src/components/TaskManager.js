import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import './TaskManager.css'; 
import { useDispatch } from 'react-redux';
import { getData } from '../reduxstore/dataslice';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';


export var handleSave;
function TaskManager({ onClose }) {
  const [open, setOpen] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [duedate, setDuedate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const dispatch = useDispatch();
  

  const handleClose = () => {
    if (unsavedChanges) {
      setOpen(false);
      handleConfirmationDialogOpen();
    } else {
      setOpen(false);
      onClose();
    }
  };

  handleSave = async() => {
    const newTask = {
      title,
      description,
      duedate,
      time,
      category
    };
    setTasks([...tasks, newTask]);
    setOpen(false);
    setUnsavedChanges(false);
    onClose();
    try{
      await axios.post(("http://localhost:4000/create/" + sessionStorage.getItem("id")),{
        title,description,duedate,time,category
      }).then((res)=>{
        if(res.data === "ADDED"){
          toast.success("Task added successfully")
        }
      }).catch(e => {toast.error("Sorry, couldn't add the task");
    console.log(e);
    }) 
    }
    catch(e){
      alert("Unable to get your request");
    }
    
  };

  useEffect(()=>{
  dispatch(getData());
  },[handleSave]);

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleConfirmationDialogOpen = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = (save) => {
    setConfirmationDialogOpen(false);
    if (save) {
      handleSave();
    } else {
      setUnsavedChanges(false);
      setOpen(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Add Task
        <IconButton
          className="close-button m-2"
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField className='mt-1'
          label="Title"
          fullWidth
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField className='mt-1'
  label="Category"
  fullWidth
  select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <MenuItem value="Work">Work</MenuItem>
  <MenuItem value="SelfCare">SelfCare</MenuItem>
  <MenuItem value="Health">Health</MenuItem>
  <MenuItem value="Travel">Travel</MenuItem>
  <MenuItem value="Social">Social</MenuItem>
  <MenuItem value="Others">Others</MenuItem>
</TextField>

        <TextField className='mt-1'
          label="Date"
          type="date"
          fullWidth
          value={duedate}
          onChange={(e) => setDuedate(e.target.value)}
        />
        <TextField className='mt-1'
          label="Time"
          type="time"
          fullWidth
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextField className='mt-1'
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
      />
    </Dialog>
  );
}

function ConfirmationDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Unsaved Changes</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to save the task?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(true)} color="primary">
          Yes
        </Button>
        <Button onClick={() => onClose(false)} color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskManager;
