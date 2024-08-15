import React from 'react';
import {Link} from 'react-router-dom';
function Sidebar(){
    return (<div className='container-fluid w-100 h-100 d-block Sidebar my-3 rounded'>
    <h2 className='sidebar-title'>Task Pilot</h2>
    <div className=''>
        <ul>
            <li><Link className=" ls-4" to="/Home/Dashboard"><i className=" ls-2 fa-solid fa-chart-bar"></i>DASHBOARD</Link></li>
            <li><Link className=" ls-4" to="/Home/Lists"><i className=" ls-2 fa-regular fa-rectangle-list"></i>LISTS</Link></li>
            <li><Link className=" ls-4" to="/Home/Calender"><i className=" ls-2 fa-regular fa-calendar-days"></i>CALENDER</Link></li>
            <li><Link className=" ls-4" to="/Home/Board"><i className=" ls-2 fa-solid fa-chart-simple"></i>BOARD</Link></li>
        </ul>
    </div>
</div>)}

export default Sidebar;