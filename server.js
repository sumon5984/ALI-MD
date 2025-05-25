// server.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('./index.js'); // index.js ফাইলটি লোড হবে এবং বট স্বয়ংক্রিয়ভাবে শুরু হবে

app.get('/', (req, res) => {
  res.send('ALI-MD Bot is running!');
});

app.listen(port, () => {
  console.log(`ALI-MD Bot listening on port ${port}`);

});
