import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewItems.css'; // Importing the CSS file

const ViewItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:9002/items');
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="items-container">
      <h2 className="items-title">Items List</h2>
      {items.length > 0 ? (
        <table className="items-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Price (Rs)</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.ProductID}>
                <td>{item.name}</td>
                <td>{item.ProductID}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items available.</p>
      )}
    </div>
  );
};

export default ViewItems;
