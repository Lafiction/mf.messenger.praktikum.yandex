// server.js
const express = require('express');

const app = express();
const PORT = 4000;

app.use('/static', express.static('./static'));
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 
