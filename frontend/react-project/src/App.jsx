import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';  // Adjust the path as needed
import AddItem from './components/AddItem';      // AddItem component for Add Item functionality
import UpdateItem from './components/UpdateItem'; // UpdateItem component for Update Item functionality
import DeleteItem from './components/DeleteItem'; // DeleteItem component for Delete Item functionality
import ViewItems from './components/ViewItems';   // ViewItems component for viewing item list

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/update-item" element={<UpdateItem />} />
        <Route path="/delete-item" element={<DeleteItem />} />
        <Route path="/view-items" element={<ViewItems />} />
      </Routes>
    </Router>
  );
};

export default App;
