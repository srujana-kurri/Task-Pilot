import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../reduxstore/dataslice';
import { handleSave } from './TaskManager';

const icons = {
    Work: <i className="fa-solid fa-handshake fa-2xl"></i>,
    SelfCare: <i className="fa-solid fa-bath fa-2xl" ></i>,
    Travel: <i className="fa-solid fa-plane-arrival fa-2xl" ></i>,
    Health: <i className="fa-solid fa-heart-circle-plus fa-2xl" ></i>,
    Social: <i className="fa-solid fa-images fa-2xl" ></i>,
    Others: <i class="fa-solid fa-user-secret fa-2xl"></i>
}

const todoListNotes = [
    "Schedule regular breaks to avoid burnout.",
    "Review and update long-term goals.",
    "Prioritize tasks based on urgency and importance.",
    "Set specific and achievable daily objectives.",
    "Incorporate time for learning and skill development.",
    "Stay hydrated and maintain a healthy work-life balance.",
    "Celebrate small victories to stay motivated.",
    "Practice mindfulness and take moments for self-reflection.",
    "Clean up and organize your workspace for better focus.",
    "Reach out to a colleague for collaboration or support.",
    "Update and backup important files regularly.",
    "Experiment with new productivity tools and techniques.",
    "Schedule dedicated time for creative thinking.",
    "Incorporate physical exercise into your routine.",
    "Reflect on the day's accomplishments and areas for improvement."
];
function Board() {
    const [note, setNote] = useState(todoListNotes[Math.floor(Math.random() * todoListNotes.length)]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [todo, setTodo] = useState([]);
    const [did,setDid] = useState([]);
    const [pastdue,setPastDue] = useState([]);
    const data = useSelector((state) => { return state.app.user.tasks })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getData())
    }, [handleSave]);
    useEffect(() => {
        if (data) {
            const upcoming = data.filter((task) => {
                return (task.duedate.substring(0, 10) >= new Date().toISOString().substring(0, 10)) && !task.status ;
            })
            const due = data.filter((task) => {
                return (task.duedate.substring(0, 10) < new Date().toISOString().substring(0, 10)) && !task.status ;
            })
            const completed =  data.filter((task) => {
                return (task.duedate.substring(0, 10) > new Date().toISOString().substring(0, 10)) && task.status ;
            })
             
            setTodo(upcoming);
            setDid(completed);
            setPastDue(due);
            console.log(upcoming);
        }
    }, [data]);
    
    const sortByDueDate = (a, b) => {
        const dateA = new Date(a.duedate.substring(0, 10));
        const dateB = new Date(b.duedate.substring(0, 10));
        return dateA - dateB;
    };
    todo.sort((a, b) => sortByDueDate(a, b));
    did.sort((a, b) => sortByDueDate(a, b));
    pastdue.sort((a, b) => sortByDueDate(a, b));
    const renderTasks = () => {
        if (activeTab === 'upcoming') {
            if (todo.length === 0) {
                return <p className="text-light text-center">No upcoming tasks.</p>;
            }
            return todo.map((task, i) => renderTaskItem(task, i, 'upcoming'));
        } else if (activeTab === 'pastdue') {
            if (pastdue.length === 0) {
                return <p className="text-light text-center">No past due tasks.</p>;
            }
            return pastdue.map((task, i) => renderTaskItem(task, i, 'pastdue'));
        }
    };
    
    const renderTaskItem = (task, index, category) => (
        <div className={`upcoming-details m-2 px-2 rounded d-flex flex-col align-items-center gap-3 ${category}`} key={index}>
            <div className='upcoming-img'>
                {icons[task.category]}
            </div>
            <div className='pt-2'>
                <h5>{task.title}</h5>
                <p>{task.duedate.substring(0, 10)}</p>
            </div>
        </div>
    );
    
    return (
        <div className='container-fluid d-flex align-items-stretch justify-content-around board align-self-center mt-2 rounded'>
            <div className="col-lg-5 col-sm-10 align-items-center justify-content-center ">
                <div className='task-tabs mb-3'>
                    <button className={`task-tab px-4 py-1 m-2 rounded ${activeTab === 'upcoming' ? 'active-tab' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
                    <button className={`task-tab px-4 py-1 m-2 rounded ${activeTab === 'pastdue' ? 'active-tab' : ''}`} onClick={() => setActiveTab('pastdue')}>Past Due</button>
                </div>
                {renderTasks()}
            </div>
            <div className="col-lg-5 col-sm-10 mt-3">
                <div className='did-tasks'>
                    <h4>Completed Tasks</h4>
                    {did.length === 0 ? (
                        <p className='text-light text-center'>Oops! No tasks here.</p>
                    ) : (
                        did.map((task, i) => {
                            if (i < 3) {
                                return (
                                    <div className=' m-2 px-2 rounded d-flex flex-col did-details align-items-center gap-3' key={i}>
                                        <div className='upcoming-img '>
                                            {icons[task.category]}
                                        </div>
                                        <div className='pt-2 '>
                                            <h5>{task.title}</h5>
                                            <p>{task.duedate.substring(0, 10)}</p>
                                        </div>
                                    </div>
                                )
                            }
                            return null;
                        })
                    )}
                </div>
                <div className='reminder text-center py-3 my-2'>
                    <h4><i className='fa-regular fa-heart me-1'></i>Daily reminder for you</h4>
                    <p>{note}</p>
                </div>
            </div>
        </div>
    );
}


export default Board;
