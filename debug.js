fetch('http://localhost:2999/geojson')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the received data to inspect it
    // Process and use the data as needed
  })
  .catch(error => console.error('Error fetching data:', error));
