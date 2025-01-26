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
  return result; 
}
app.get('/',async(req,res)=>{
  res.json('server working')
})

app.get('/search', async (req, res) => {
  console.log('Request received:', req.query); 
  const { query, page = 1, type } = req.query; 

 
  const filter = { title: new RegExp(query, 'i') }; 

  if (type) {
    filter.type = type; 
  }

  try {
    const results = await Product.find(filter)
      .skip((page - 1) * 10)
      .limit(10);
    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions', error: err.message });
  }
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
