// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Example: Making a GET request to retrieve all text files
    axios.get('http://localhost:3002/api/get-all-text-files')
      .then(response => {
        setMessage(response.data.textFiles.join(', '));
      })
      .catch(error => {
        console.error(error);
        setMessage('Error fetching text files.');
      });
  }, []);

  return (
    <div>
      <h1>Node.js File System</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
