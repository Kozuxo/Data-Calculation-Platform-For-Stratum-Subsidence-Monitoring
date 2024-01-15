const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 2995;

app.use(cors());

// Replace with your actual MongoDB connection URL
const mongoURI = 'mongodb+srv://gregoriusgeraldi:geraldi123@datasetcluster.kd9nuil.mongodb.net/';
const dbName = 'Dataset'; // Replace with your actual database name
const collectionName = 'Upload'; // Replace with your actual collection name

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

    // Handle the /geojson route
   // ...
   app.get('/geojson', async (req, res) => {
    try {
      // Query MongoDB for GeoJSON data (replace with your query logic)
      const geojsonData = await collection.find({}).toArray();
  
      // Modify GeoJSON data to flatten the "data" property
      const modifiedFeatures = geojsonData.map(feature => {
        if (feature.data && feature.data.features) {
          return feature.data.features;
        }
        return feature;
      }).flat(); // Flatten the features array
  
      // Remove the _id field from each document
      geojsonData.forEach(doc => {
        delete doc._id;
      });
  
      // Create the GeoJSON object with the flattened features
      const geojson = {
        type: 'FeatureCollection',
        features: modifiedFeatures
      };
  
      // Convert the GeoJSON object to a string
      const geojsonString = JSON.stringify(geojson);
  
      res.send(geojsonString);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  
  
  
  
  
  
  
  
  
  
  

// ...

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();
