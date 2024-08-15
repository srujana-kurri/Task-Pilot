// About.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './About.css'; // Assuming you have a CSS file for styling
import Navbar from './Navbar';

const About = () => {
  return (
    <div>
      <Navbar />

      <div className="about-container d-flex justify-content-center align-items-center">

        <div className="about-card">
          <h2>About Task Pilot</h2>
          <p>
            Welcome to Task Pilot, your personalized task management solution crafted to elevate your productivity and simplify your daily routine. Task Pilot empowers you with intuitive features and a seamless interface, making task management a breeze.
          </p>
          <ul>
            <li>
              <span role="img" aria-label="Checkmark">
                ✅
              </span>{' '}
              Easy-to-use task creation and management
            </li>
            <li>
              <span role="img" aria-label="Clock">
                ⏰
              </span>{' '}
              Set due dates and times for your tasks
            </li>
            <li>
              <span role="img" aria-label="Category">
                🗂
              </span>{' '}
              Categorize tasks for better organization
            </li>
            <li>
              <span role="img" aria-label="Calendar">
                📅
              </span>{' '}
              Plan and track your schedule effectively
            </li>
            <li>
              <span role="img" aria-label="Analytics">
                📊
              </span>{' '}
              Analyze task completion trends with insightful analytics
            </li>
            <li>
              <span role="img" aria-label="Collaboration">
                👥
              </span>{' '}
              Collaborate with team members for enhanced efficiency
            </li>
            <li>
              <span role="img" aria-label="Notifications">
                🔔
              </span>{' '}
              Receive timely notifications to stay on top of your tasks
            </li>
            <li>
              <span role="img" aria-label="Customization">
                🎨
              </span>{' '}
              Customize your workspace to suit your unique preferences
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
