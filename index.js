const express = require("express");
const app = express();
const port = 5000;
const fileUpload =require('express-fileupload')
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('doctors'));
app.use(fileUpload());


const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.5qqyim0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri);

async function run() {
  try {

    const appoinmentCollection = client.db('doctorPortal').collection('appoinment');
app.post('/addAppoinment', async(req, res) => {
  const appoinment = req.body;
  console.log(appoinment);
  await appoinmentCollection.insertOne(appoinment)
    .then(result =>{
    res.send(result.insertedCount > 0);
    })

})
app.post('/appoinmentByDate', async(req, res) => {
  const date = req.body;
  console.log(date.date);
  await appoinmentCollection.find({date: date})
  .toArray((err,documents)=>{
    res.send(documents)

  })
  

})
app.post('/addADoctor',(req,res)=>{
  const  file = req.files.file;
  const name = req.files.name;
  const email = req.files.email;
  console.log(file,name,email);
})
   

    console.log("Db is connected");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Hello db is working working !");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
