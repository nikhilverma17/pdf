// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of Express app
const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware to handle cross-origin requests
app.use(cors());

// Use JSON middleware to parse request bodies
app.use(express.json());

// Replace <username>, <password>, <clustername>, and <dbname> with your MongoDB Atlas credentials
const mongoURI = 'mongodb+srv://iamvermanikhil:<password>@cluster0.drlumrs.mongodb.net/?retryWrites=true&w=majority';

// Connect to the MongoDB Atlas database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the MongoDB database.');
});

// Define a Mongoose schema for your data
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  height: String,
  weight: String,
  identityMark: String,
  planNumber: String,
  familyHistory: String,
  
});

// Create a Mongoose model using the schema
const Submission = mongoose.model('Submission', submissionSchema);

// Define a route to handle form submissions
app.post('/submit', async (req, res) => {
  const newSubmission = new Submission(req.body);

  try {
    await newSubmission.save();
    res.status(200).json({ message: 'Data submitted successfully.' });
  } catch (error) {
    console.error('Insertion error:', error.message);
    res.status(500).json({ error: 'Failed to submit data.' });
  }
});

// Define a route to fetch all submissions
app.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Query error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
