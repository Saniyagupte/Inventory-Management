const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const ItemModel = require('./models/Items');

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://${username}:${password}@${cluster}",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });


 // CRUD Routes
 

// Create Item (C)
app.post("/create-item", async (req, res) => {
  try {
    const { ProductID, name, description, price, quantity } = req.body;

    if (!ProductID || !name || !description || !price || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new ItemModel({ ProductID, name, description, price, quantity });
    await newItem.save();

    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all items (R)
app.get("/items", async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single item by ID (R)
app.get("/items/:ProductID", async (req, res) => {
  try {
    const { ProductID } = req.params;

    const item = await ItemModel.findOne({ ProductID });

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Update an item by custom ID (U)
app.put("/items/:ProductID", async (req, res) => {
  try {
    const { ProductID } = req.params;
    const { name, description, price, quantity } = req.body;

    if (!name || !description || !price || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedItem = await ItemModel.findOneAndUpdate(
      { ProductID },
      { name, description, price, quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ success: true, item: updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an item by custom ID (D)
app.delete("/items/:ProductID", async (req, res) => {
  try {
    const { ProductID } = req.params;

    const deletedItem = await ItemModel.findOneAndDelete({ ProductID });

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Start the server
const PORT = 9002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
