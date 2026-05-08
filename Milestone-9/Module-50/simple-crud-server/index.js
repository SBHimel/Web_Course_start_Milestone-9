const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors());
app.use(express.json());

//
//

const uri = `mongodb+srv://simpleCrudUser:q5pW0A6vC5ShjwlO@cluster0.qcgyw69.mongodb.net/?appName=Cluster0`;

// mongodb+srv://<db_username>:<db_password>@cluster0.qcgyw69.mongodb.net/?appName=Cluster0

// mongodb+srv://simpleCrudUser:q5pW0A6vC5ShjwlO@cluster0.qcgyw69.mongodb.net/?appName=Cluster0

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
   
    await client.connect();

    const db = client.db("simpleCrud");
    const users = db.collection("users");

    app.get('/users', async(req, res)=>{
        const cursor = users.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Simple CRUD server is serving");
});

app.listen(port, () => {
  console.log(`Simple CRUD server is running on port ${port}`);
});
