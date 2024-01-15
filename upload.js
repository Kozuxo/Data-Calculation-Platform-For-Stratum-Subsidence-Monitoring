const uploadForm = document.getElementById('uploadForm');
const statusDiv = document.getElementById('status');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('geojsonFile', document.getElementById('geojsonFile').files[0]);

  try {
    const response = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    statusDiv.textContent = data.message;
  } catch (error) {
    console.error('Error:', error);
    statusDiv.textContent = 'Error uploading the file.';
  }
});