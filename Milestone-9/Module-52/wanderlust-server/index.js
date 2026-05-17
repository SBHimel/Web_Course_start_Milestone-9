const express = require("express");
const dontenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { createRemoteJWKSet, jwtVerify } = require("jose-cjs");
dontenv.config();
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// veryfy korte 
const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)

// Middleware 54-2 theke 54-5 module e
const verifyToken = async(req, res, next)=>{
  const authHeader = req?.headers.authorization
  if(!authHeader){
    return res.status(401).json({ message:
      "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];
  if(!token){
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const {payload} = await jwtVerify(token, JWKS)
  console.log(payload);
  next()

  } catch (error) {
    return res.status(403).json({message: "Forbidden"});
  }

}


async function run() {
  try {
    // await client.connect();

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destinations");
    const bookingColloection = db.collection("bookings");

    // 👉 POST = server এ data পাঠানো
    app.post("/destination",verifyToken, async (req, res) => {
      const destinationData = req.body;
      console.log(destinationData);
      const result = await destinationCollection.insertOne(destinationData);

      res.json(result);
    });

    // 👉 GET = server থেকে data আনা
    app.get("/destination", async (req, res) => {
      const result = await destinationCollection.find().toArray();
      res.json(result);
    });

    
    // Backend এ GET by ID লাগবে
    app.get("/destination/:id", verifyToken, async (req, res) => {
      const { id } = req.params;

      const result = await destinationCollection.findOne({
        _id: new ObjectId(id),
      });

      res.json(result);
    });

    


    // data Edit ba update kore kivabe

    app.patch("/destination/:id",verifyToken, async (req, res) => {
      const { id } = req.params;

      const updatedData = req.body;

      const result = await destinationCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData },
      );

      res.json(result);
    });

    // Data delete korte

    app.delete("/destination/:id",verifyToken, async (req, res) => {
      const { id } = req.params;

      const result = await destinationCollection.deleteOne({
        _id: new ObjectId(id),
      });

      res.json(result);
    });

    // Create booking card and send POST API

    app.post("/booking", verifyToken, async (req, res) => {
      const bookingData = req.body;
      const result = await bookingColloection.insertOne(bookingData);

      res.json(result);
    });

    // ekhon booking data ke ana

    app.get("/bookings/:userId", async (req, res) => {
      const { userId } = req.params;

      const result = await bookingColloection.find({ userId }).toArray();

      res.json(result);
    });

    // cancel click korle delete hbe ei api toiri kora
    app.delete("/booking/:bookingId",verifyToken, async (req, res) => {
      const { bookingId } = req.params;

      const result = await bookingColloection.deleteOne({
        _id: new ObjectId(bookingId),
      });

      res.json(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running fine!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
