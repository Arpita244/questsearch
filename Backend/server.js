const Product = require('./schema');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

async function db() {
  const result = await Product.find();
  return result; // Return the result instead of logging it
}

app.get('/search', async (req, res) => {
    console.log('Request received:', req.query); // Log the query params to see if they are being received
    const { query, page = 1 } = req.query;
    try {
      const results = await Product.find({ title: new RegExp(query, 'i') })
        .skip((page - 1) * 10)
        .limit(10);
      res.json({ results });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
  });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
