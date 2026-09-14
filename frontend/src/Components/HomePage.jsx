import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="homepage-header">
        <h1>Event Management System</h1>
        <p>Plan, organize, and manage your events effortlessly!</p>
      </header>

      {/* Image Section */}
      <div className="image-gallery">
        <img
          src="https://media.istockphoto.com/id/1380516073/photo/female-party-planner-arranging-decorations-for-a-child-birthday-party.jpg?s=612x612&w=0&k=20&c=7LWTCxgrl-8VmX8J0YToQU69_HJeBhj47ufevbxQtFU="
          alt="Event Planning"
        />
        <img
          src="https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.jpg?s=612x612&w=0&k=20&c=1ZR02c1UKfGdBCNWzzKlrwrVZuEiOqnAKcKF4V_t038="
          alt="Teamwork"
        />
        <img
          src="https://www.successful-events.co.uk/wp-content/uploads/2017/12/Screen-Shot-2017-12-11-at-19.34.52.png"
          alt="Successful Event"
        />
      </div>

  
    </div>
  );
};


export default HomePage;


