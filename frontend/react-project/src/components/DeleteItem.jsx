import React, { useState } from 'react';
import axios from 'axios';
import './DeleteItem.css'; // Make sure to import the CSS file

const DeleteItem = () => {
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

  // Handle the delete action
  const handleDeleteItem = async (e) => {
    e.preventDefault();
    const { ProductID } = formData;

    // Check if ProductID is provided
    if (!ProductID) {
      alert('ProductID is required to delete an item!');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:9002/items/${ProductID}`);
      if (response.status === 200) {
        alert('Item deleted successfully!');
        // Reset the form after successful deletion
        setFormData({
          ProductID: '',
          name: '',
          description: '',
          price: '',
          quantity: '',
        });
        setIsProductFound(false); // Reset the state
      } else {
        alert('Item not found!');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item.');
    }
  };

  return (
    <div className="add-item-container">
      <h2 className="form-title">Delete Item</h2>

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
            className="form-input"
          />
          <button
            type="button"
            onClick={checkProductExists}
            className="submit-button"
            disabled={!formData.ProductID} // Disable button if ProductID is empty
          >
            Check if Product Exists
          </button>
        </div>
      ) : (
        <>
          {/* Step 2: If ProductID exists, show the delete button */}
          <form onSubmit={handleDeleteItem} className="add-item-form">
            <div className="form-group">
              <p>Are you sure you want to delete this item?</p>
              <button
                type="submit"
                className="delete-button"
              >
                Delete Item
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default DeleteItem;
