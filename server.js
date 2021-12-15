const express = require('express');

const app = express();

const connectDB = require('./config/db');

// connect db
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// routes
app.use('/api/users', require('./routes/apis/users'))
app.use('/api/auth', require('./routes/apis/auth'))
app.use('/api/profile', require('./routes/apis/profile'))
app.use('/api/post', require('./routes/apis/post'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));

