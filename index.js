const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ii6xxd.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        console.log('Database Connected')
        const informationCollection = client.db('txdap_migration_platform').collection('information');

    //    Sumaya's Code 
        //  show information 
       app.get('/information', async(req, res ) =>{
        const query = {};
        const cursor = informationCollection.find(query);
        const informations = await cursor.toArray();
        res.send(informations);
       });

       app.get('/information', async(req, res) =>{
        const informations = await informationCollection.find().toArray();
        res.send(informations);
       })

       app.post('/information', async(req, res) =>{
        const newInformation = req.body;
        const informations = await informationCollection.insertOne(newInformation);
        res.send(informations);
      });

    }
    finally {

    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello From Txdap!')
})

app.listen(port, () => {
    console.log(`Txdap App listening on port ${port}`)
})