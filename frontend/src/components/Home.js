import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Navbar from './Navbar';
// import { useLocation} from 'react-router-dom';
import {Routes,Route} from 'react-router-dom'
import Lists from './Lists';
import Dashboard from './Dashboard';
import Board from './Board';
import Calender from './Calender';
import { UserProvider } from './UserContext';


function Home(){
    // const location = useLocation();
    return (
        <div className='row d-flex flex-row justify-content-center align-items-center '>
            <Navbar/> 
            <div className="col-lg-3 col-md-3 col-sm-10 col-10 sidebar-col mx-2 mt-3 rounded">
            <Sidebar/>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-10 col-10 content-col  mx-2 mt-3 rounded">
                <UserProvider>
            <Routes>
            <Route path='/Lists' element = {<Lists />}/>
            <Route path='/Dashboard' element = {<Dashboard />}/>
            <Route path='/Board' element = {<Board/>}/>
            <Route path='/Calender' element = {<Calender/>}/>
            </Routes>
                </UserProvider>
                </div> 
        </div>
    )
}
  
export default Home;
