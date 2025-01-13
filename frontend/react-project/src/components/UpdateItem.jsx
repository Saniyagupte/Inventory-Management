import React, { useState } from 'react';
import axios from 'axios';
import './UpdateItem.css';

const UpdateItem = () => {
  const [formData, setFormData] = useState({
    ProductID: '',
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [isProductFound, setIsProductFound] = useState(false); // Track if product is found

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Check if the product exists
  const checkProductExists = async () => {
    const { ProductID } = formData;

    if (!ProductID) {
      alert("Please enter a ProductID!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:9002/items/${ProductID}`);
      if (response.data.success) {
        const { name, description, price, quantity } = response.data.item;
        setFormData({
          ...formData,
          name,
          description,
          price,
          quantity,
        });
        setIsProductFound(true);
      } else {
        alert("Product not found!");
        setIsProductFound(false);
      }
    } catch (error) {
      alert("Product not found! Please check the ProductID.");
      console.error("Error fetching item:", error);
      setIsProductFound(false);
    }
  };

  // Handle the update action
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const { ProductID, name, description, price, quantity } = formData;

    // Check if all fields are filled out
    if (!ProductID || !name || !description || !price || !quantity) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:9002/items/${ProductID}`, {
        name,
        description,
        price,
        quantity,
      });
      if (response.status === 200) {
        alert('Item updated successfully!');
        setIsProductFound(false);
        setFormData({
          ProductID: '',
          name: '',
          description: '',
          price: '',
          quantity: '',
        });
      } else {
        alert('Failed to update the item!');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error updating item.');
    }
  };

  return (
    <div className="add-item-container">
      <h2 className="form-title">Update Item</h2>

      {/* Step 1: Ask for ProductID */}
      {!formData.ProductID || !isProductFound ? (
        <div className="form-group">
          <label htmlFor="ProductID">Enter ProductID of the product:</label>
          <input
            type="text"
            id="ProductID"
            name="ProductID"
            value={formData.ProductID}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={checkProductExists}
            disabled={!formData.ProductID}
            className="submit-button"
          >
            Check if Product Exists
          </button>
        </div>
      ) : (
        <>
          {/* Step 2: If ProductID exists, show the form for editing */}
          <form className="add-item-form" onSubmit={handleUpdateItem}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Update Item
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateItem;
