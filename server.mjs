// Imports
import express from 'express';
import globalErr from './middleware/globalErr.mjs';
import userRoutes from './routes/userRoutes.mjs';

// Setup
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({extended: true})); // You can use post request with JSON
app.use(express.json()); // Parses our JSON data

// Routes
app.use('/user', userRoutes);

// Global Error Handling Middleware
app.use(globalErr);

// Server Listener
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT: ${PORT}`);
});