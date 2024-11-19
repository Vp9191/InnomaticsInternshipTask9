const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://pvedant091:dLr3raz5JswGeZ4R@cluster0.onvgo.mongodb.net/pvedant091')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const todosRoutes = require('./routes/todos');
app.use('/todos', todosRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
