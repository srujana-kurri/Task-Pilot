import React, { useState,useEffect} from 'react';
import './App.css';
import Home from './components/Home';
import { HashRouter,Routes,Route} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Profile from './components/Profile';
import About from './components/About';

function App() {
  return (
    <div >
     
      
      <HashRouter>
          <Routes>
          <Route path="/Signup" exact element={<SignUpForm/>} />
          <Route path='/Home/*' element = {<Home />}/>
          <Route path='/Profile' element = {<Profile/>}/>
          <Route path='/About' element = {<About/>}/>
          <Route path='/' element = {<LoginForm/>}/>
          </Routes>
        </HashRouter>
  

    </div>
  );
}
export default App;


