const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-heatmap-data', (req, res) => {
  const { jsonData, relevanceObject } = req.body;

  // Processar JSON para extrair posições dos objetos
  const points = [];
  jsonData.hits.hits.forEach(hit => {
    hit._source['deepstream-msg'].forEach(msg => {
      const [trackId, xMin, yMin, xMax, yMax, object, region] = msg.split('|');
      if (object === relevanceObject) {
        const x = (parseFloat(xMin) + parseFloat(xMax)) / 2;
        const y = (parseFloat(yMin) + parseFloat(yMax)) / 2;
        points.push({ x, y });
      }
    });
  });

  res.json(points);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
