
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:root@cluster0.ztaanu7.mongodb.net/?retryWrites=true&w=majority";
// const User= require('./models/userSchema')

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
