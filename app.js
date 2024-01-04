// app.js
const express = require('express');
const app = express();
const port = 3000;

// Import controller
const bnbController = require('./bnbController');

// Định nghĩa route GET cho đường dẫn /bnb và gọi hàm từ controller
app.get('/bnb', bnbController.getBnbInfo);

// Lắng nghe các yêu cầu tới cổng 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
