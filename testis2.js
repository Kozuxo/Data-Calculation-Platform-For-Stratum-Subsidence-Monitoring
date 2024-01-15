const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 2999;

app.use(cors());

app.get('/geojson', (req, res) => {
  res.sendFile('C:/xampp/htdocs/mouse/yunlin2.geojson');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
