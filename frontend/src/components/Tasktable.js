import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { getData } from '../reduxstore/dataslice';
import { useSelector,useDispatch } from 'react-redux';
import { handleSave } from './TaskManager';

function Tasktable(){
    const [completed,setCompleted] = useState(0);
    const dispatch = useDispatch();
    const [uncompleted,setUncompleted] = useState(0);
    const data = useSelector((state) => {return state.app.user.tasks});
    useEffect(()=>{
      dispatch(getData());
    },[handleSave,data]);
    useEffect(() => {
      if (data) {
        const com = data.filter((task) => task.status).length;
        setCompleted(com);
        setUncompleted(data.length - com);
      }
    }, [data]);

    return(<div>
        <table className='table table-borderless'>
            <tr>
                <td className='m-2 p-3 lead'>Total tasks</td>
                <td className='m-2 p-3 '>{completed + uncompleted} </td>
            </tr>
            <tr>
                <td className='m-2 p-3 lead'>Completed tasks</td>
                <td className='m-2 p-3 '>{completed}</td>
            </tr>
            <tr>
                <td className='m-2 p-3 lead'>Uncompleted tasks</td>
                <td className='m-2 p-3 '>{uncompleted}</td>
            </tr>
        </table>
    </div>)

}
export default Tasktable;