const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const folderPath = path.join(__dirname, 'text-files');

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

app.post('/api/create-text-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const fileName = `${timestamp.replace(/[:.]/g, '-')}.txt`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Text file created successfully', fileName });
    }
  });
});

app.get('/api/get-all-text-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const textFiles = files.filter(file => file.endsWith('.txt'));
      res.json({ textFiles });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
