const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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

    // GET ALL USERS API /users এ request আসলে সব user data পাঠাবে

    app.get("/users", async (req, res) => {
      const cursor = users.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // GET SINGLE USER BY ID

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const user = await users.findOne(query);

      console.log("user id", id);
      res.send(user);
    });

    // Insert kora user POST → data বানায়

    app.post("/users", async (req, res) => {
      const newUser = req.body;
      console.log("user to be inserted", newUser);

      const result = await users.insertOne(newUser);

      res.send(result);
    });

    // delete ---------

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await users.deleteOne(query);

      res.send(result);
    });

    //  Update--------------------

    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };

      const modifiedUser = req.body;

      const updatedDocument = {
        $set: {
          name: modifiedUser.name,
          email: modifiedUser.email,
          role: modifiedUser.role,
        },
      };

      const result = await users.updateOne(filter, updatedDocument);

      res.send(result);
    });

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
