const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 2999;

app.use(cors());

// Replace with your actual MongoDB connection URL
const mongoURI = 'mongodb+srv://gregoriusgeraldi:geraldi123@datasetcluster.kd9nuil.mongodb.net/';
const dbName = 'p'; // Replace with your actual database name
const collectionName = 'yunlin1'; // Replace with your actual collection name

async function connectToMongoDB() {
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);


   app.get('/geojson', async (req, res) => {
    try {
      
      const geojsonData = await collection.find({}).toArray();
  
      geojsonData.forEach(doc => {
        delete doc._id;
      });
  
      const geojsonString = geojsonData.map(JSON.stringify).join(',');
  
      const geojsonWithoutBrackets = `${geojsonString}`;
  
      res.send(geojsonWithoutBrackets);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();
