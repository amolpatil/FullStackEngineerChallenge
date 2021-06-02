const express = require('express');
const connectDB = require('./config/db');
const seedEntry = require('./seedEntry');
const path = require('path');

const app = new express();

//connect Database
connectDB();

//Seed Admin added
seedEntry();

// Init Middleware
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/employees', require('./routes/api/employees'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => console.log(`Server started on port : ${PORT}`));