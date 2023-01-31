const express = require('express');
const cors = require('cors');
require('dotenv').config();
const XLSX = require('xlsx')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const runCollection = client.db('txdap_migration_platform').collection('information');
 
    //    Sumaya's Code Start 
        //  show information 
       app.get('/run', async(req, res ) =>{
        const query = {};
        const cursor = runCollection.find(query);
        const runs = await cursor.toArray();
        res.send(runs);
       });

       app.get('/run', async(req, res) =>{
        const runs = await run.find().toArray();
        res.send(runs);
       })

       app.post('/run', async(req, res) =>{
        const newRun = req.body;
        const runs = await runCollection.insertOne(newRun);
        res.send(runs);
      });

    //   Sumaya's Code Finish 



        const uploadFilesCollection = client.db('txdap_migration_platform').collection('files');

        app.get('/run', async (req, res) => {
            const query = {};
            const cursor = runCollection.find(query);
            const run = await cursor.toArray();
            res.send(run);
        });

        app.get('/run/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const run = await runCollection.findOne(query);
            res.send(run);
        });



        app.get('/upload', async (req, res) => {
            const query = {};
            const cursor = uploadFilesCollection.find(query);
            const uploads = await cursor.toArray();
            res.send(uploads);

            app.get('/upload/:id', async (req, res) => {
                const id = req.params.id;
                const query = { _id: ObjectId(id) };
                const uploads = await uploadFilesCollection.findOne(query);
                res.send(uploads);
            });

        });

        app.post('/upload', async (req, res) => {
            const uploads = req.body;
            const result = await uploadFilesCollection.insertOne(uploads);
            res.send(result);

        });

        app.delete('/upload/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await uploadFilesCollection.deleteOne(query);
            res.send(result);
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