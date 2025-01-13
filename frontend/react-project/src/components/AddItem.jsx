import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';

const AddItem = () => {
  const [formData, setFormData] = useState({
    ProductID: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const { ProductID, name, description, price, quantity } = formData;

    if (!ProductID || !name || !description || !price || !quantity) {
      alert('All fields are required!');
      return;
    }

    try {
      await axios.post('http://localhost:9002/create-item', {
        ProductID, name, description, price, quantity,
      });
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item.');
    }
  };

  return (
    <div className="add-item-container">
      <h2 className="form-title">Add New Item</h2>
      <form className="add-item-form" onSubmit={handleAddItem}>
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            name="ProductID"
            value={formData.ProductID}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
