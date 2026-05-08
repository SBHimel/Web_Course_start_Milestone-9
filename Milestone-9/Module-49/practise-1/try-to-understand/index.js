const express = require('express')
const app = express()
const port = process.env.PORT || 7000;

const cors = require('cors')
// Middleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World! ki obsotha')
})


const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    brand: "Logitech",
    price: 1200,
    category: "Accessories",
    stock: 15,
    isAvailable: true,
  },

  {
    id: 2,
    name: "Mechanical Keyboard",
    brand: "Redragon",
    price: 3500,
    category: "Accessories",
    stock: 8,
    isAvailable: true,
  },

  {
    id: 3,
    name: "Gaming Monitor",
    brand: "Samsung",
    price: 18500,
    category: "Monitor",
    stock: 5,
    isAvailable: true,
  },

  {
    id: 4,
    name: "Laptop Stand",
    brand: "Ugreen",
    price: 900,
    category: "Accessories",
    stock: 0,
    isAvailable: false,
  },

  {
    id: 5,
    name: "USB Type-C Cable",
    brand: "Anker",
    price: 450,
    category: "Cable",
    stock: 30,
    isAvailable: true,
  },

  {
    id: 6,
    name: "External SSD",
    brand: "Kingston",
    price: 6500,
    category: "Storage",
    stock: 7,
    isAvailable: true,
  }
];

app.get('/products', (req, res) => {
  res.send(products)
})

app.post('/products', (req, res) => {

  // frontend থেকে পাঠানো data
  console.log(req.body);

  // নতুন product
  const newProduct = req.body;

  // নতুন id add
  newProduct.id = products.length + 1;

  // products array তে add
  products.push(newProduct);

  // JSON response পাঠানো
  res.send({
    success: true,
    message: 'Product added successfully',
    data: newProduct
  });
});


app.listen(port, () => {
  console.log(`Server is running ${port}`)
})
