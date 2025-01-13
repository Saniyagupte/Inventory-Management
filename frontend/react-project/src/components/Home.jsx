import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Inventory Management</h1>
      <p className="home-description">Navigate through the CRUD operations to manage your inventory effectively.</p>
      <div className="crud-options">
        {/* Add Item */}
        <div className="crud-card" onClick={() => navigate('/add-item')}>
          <h2>Add Item</h2>
          <p>Create new items and add them to your inventory.</p>
          <button className="crud-button">Go</button>
        </div>

        {/* Update Item */}
        <div className="crud-card" onClick={() => navigate('/update-item')}>
          <h2>Update Item</h2>
          <p>Edit or modify the details of existing inventory items.</p>
          <button className="crud-button">Go</button>
        </div>

        {/* Delete Item */}
        <div className="crud-card" onClick={() => navigate('/delete-item')}>
          <h2>Delete Item</h2>
          <p>Remove unwanted or outdated items from your inventory.</p>
          <button className="crud-button">Go</button>
        </div>

        {/* View Items */}
        <div className="crud-card" onClick={() => navigate('/view-items')}>
          <h2>View Items</h2>
          <p>Browse and view the complete list of items in your inventory.</p>
          <button className="crud-button">Go</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
