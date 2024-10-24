const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the schema and model for contact form submissions
const contactSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    subject: String,
    message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle POST requests to /api/contact
app.post('/api/contact', (req, res) => {
    const contactData = new Contact(req.body);
    contactData.save()
        .then(() => res.status(200).send('Contact form submitted successfully!'))
        .catch((err) => res.status(500).send('Error saving contact form: ' + err));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
