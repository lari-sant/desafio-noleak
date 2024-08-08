document.getElementById('heatmapForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const jsonInput = document.getElementById('jsonInput').value;
    let jsonData;
    try {
      jsonData = JSON.parse(jsonInput);
    } catch (e) {
      alert('Invalid JSON format');
      return;
    }
  
    const relevanceObject = document.getElementById('relevanceObject').value.trim();
    if (!relevanceObject) {
      alert('Relevance Object is required');
      return;
    }
  
    const imageUrl = document.getElementById('imageUrl').value.trim();
    if (!imageUrl) {
      alert('Image URL is required');
      return;
    }
  
    // Fetch heatmap data
    const response = await fetch('http://localhost:3000/generate-heatmap-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jsonData, relevanceObject })
    });
  
    const points = await response.json();
  
    // Load image
    const heatmapImage = document.getElementById('heatmapImage');
    heatmapImage.src = imageUrl;
    heatmapImage.onload = () => {
      // Adjust container size to match image size
      const heatmapContainer = document.getElementById('heatmapContainer');
      heatmapContainer.style.width = `${heatmapImage.width}px`;
      heatmapContainer.style.height = `${heatmapImage.height}px`;
  
      // Generate heatmap
      const heatmapInstance = h337.create({
        container: document.getElementById('heatmap')
      });
  
      const heatmapData = {
        max: 10,
        data: points.map(point => ({
          x: point.x,
          y: point.y,
          value: 1
        }))
      };
  
      heatmapInstance.setData(heatmapData);
  
      // Prepare download link
      document.getElementById('downloadLink').onclick = async function() {
        const canvas = await html2canvas(heatmapContainer);
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'heatmap.png';
        link.click();
      };
    };
  });
  