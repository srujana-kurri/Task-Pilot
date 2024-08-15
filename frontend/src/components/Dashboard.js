import React, { useEffect,useState } from 'react';
import Charts from './charts';
import Tasktable from './Tasktable';
import axios from 'axios';

function Dashboard(){
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const apiUrl = 'https://zenquotes.io/api/today';
const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch(`${proxyUrl}${apiUrl}`);
      if (response.ok) {
        const data = await response.json();
        setQuote(data[0].q);
        setAuthor(data[0].a);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  fetchData();
}, []);
   return <div className='container-fluid dashboard'>
       <div className='row dash-charts d-flex flex-row justify-content-center align-items-center gap-1 mb-sm-5 mb-md-2'>
        <div className='col-lg-5 col-sm-8 col-8  mt-3 rounded text-light text-center'>
         <Charts />
        </div>
        <div className='col-lg-5 col-sm-8 col-8 mt-3 details rounded mx-2'>
          <Tasktable/>
        </div>
       </div>
       <div className='row d-flex justify-content-center align-items-center  mt-5 mt-sm-4 mt-md-3 mt-lg-1 '>
        {!quote?<span className='display-5 text-light text-center'>Please wait while it loads</span>:
        <div className="col-lg-10 col-md-9 col-9 mt-4 mt-sm-4 mt-md-3 mt-lg-1 quote rounded p-2 text-center mb-3">
            <h3>QUOTE OF THE DAY</h3>
            <h5>{quote}</h5>
            <p>-{author}</p>
        </div>}
       </div>
    
   </div>
}
export default Dashboard;