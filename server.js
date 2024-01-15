const express = require('express');
const cors = require('cors');
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Enable CORS for all routes
app.use(cors());


const upload = multer({ dest: 'uploads/' });
const mongoUrl = 'mongodb+srv://gregoriusgeraldi:geraldi123@datasetcluster.kd9nuil.mongodb.net/'; // Replace with your MongoDB connection string

// Upload route
app.post('/upload', upload.single('geojsonFile'), async (req, res) => {
  try {
    // Save the uploaded file data into MongoDB
    const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
    const db = client.db('Dataset'); // Replace with your database name
    const collection = db.collection('Upload');

    const fileData = req.file;
    if (!fileData) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Read the file and save it to the database
    const fs = require('fs');
    const data = fs.readFileSync(fileData.path, 'utf8');
    const jsonData = JSON.parse(data);

    await collection.insertOne({ data: jsonData });

    // Clean up the uploaded file from the server
    fs.unlinkSync(fileData.path);

    return res.json({ message: 'File uploaded successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error uploading the file.' });
  }
});

const port = 4000; 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

