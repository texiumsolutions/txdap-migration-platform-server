const express = require('express');
const cors = require('cors');
require('dotenv').config();
const XLSX = require('xlsx')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// var userRoute = require('./userRoute');

// app.use('/', userRoute);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5ii6xxd.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        console.log('Database Connected')
        const runCollection = client.db('txdap_migration_platform').collection('information');
        const updateRunCollection = client.db('txdap_migration_platform').collection('updateRun');
        const allInformationCollection = client.db('txdap_migration_platform').collection('all_information');
        const profileCollection = client.db('txdap_migration_platform').collection('profile_collection');

        const InformationTargetKeyCollection = client.db('txdap_migration_platform').collection('information_target_key');
        const sourceDataCollection = client.db('txdap_migration_platform').collection('source_data_collection');


        //    Sumaya's Code Start 
        //  show information 
        app.get('/run', async (req, res) => {
            const query = {};
            const cursor = runCollection.find(query);
            const runs = await cursor.toArray();
            res.send(runs);
        });

        app.get('/run', async (req, res) => {
            const runs = await run.find().toArray();
            res.send(runs);
        })

        app.post('/run', async (req, res) => {
            const newRun = req.body;
            const runs = await runCollection.insertOne(newRun);
            res.send(runs);
        });


        //  show UpdateRun 
        app.get('/updateRun', async (req, res) => {
            const query = {};
            const cursor = updateRunCollection.find(query);
            const updateRuns = await cursor.toArray();
            res.send(updateRuns);
        });

        app.get('/updateRun', async (req, res) => {
            const updateRuns = await updateRuns.find().toArray();
            res.send(updateRuns);
        })

        app.post('/updateRun', async (req, res) => {
            const newUpdateRun = req.body;
            const updateRuns = await updateRunCollection.insertOne(newUpdateRun);
            res.send(updateRuns);
        });


        //  show AllInforamtions 
        app.get('/profile', async (req, res) => {
            const query = {};
            const cursor = profileCollection.find(query);
            const allProfiles = await cursor.toArray();
            res.send(allProfiles);
        });


        app.post('/profile', async (req, res) => {
            const newAllInformation = req.body;
            const allProfile = await profileCollection.insertOne(newAllInformation);
            res.send(allProfile);
        });

        app.get('/all_information/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const information = await allInformationCollection.findOne(query);
            res.send(information);
        });

        app.delete('/all_information/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await allInformationCollection.deleteOne(query);
            res.send(result);
        });

        app.put('/all_information/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateData = {
                $set: data,
            };
            const result = await allInformationCollection.updateOne(filter, updateData, options);
            res.send(result);
        });
        //   Sumaya's Code Finish 



        const uploadFilesCollection = client.db('txdap_migration_platform').collection('files');

        // app.get('/run', async (req, res) => {
        //     const query = {};
        //     const cursor = runCollection.find(query);
        //     const run = await cursor.toArray();
        //     res.send(run);
        // });

        // app.get('/run/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const run = await runCollection.findOne(query);
        //     res.send(run);
        // });

        // app.get('/run-name/:name', async (req, res) => {
        //     const name = req.params.name;
        //     const query = { name: name };
        //     const run = await runCollection.findOne(query);
        //     res.send(run);
        // });

        // app.delete('/run/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await runCollection.deleteOne(query);
        //     res.send(result);
        // });

        // Source data collection
        app.get('/source', async (req, res) => {
            const query = {};
            const cursor = sourceDataCollection.find(query);
            const source = await cursor.toArray();
            res.send(source);
        });


        app.get('/source/:email', async (req, res) => {
            const email = req.params.email;
            const query = {
                email:
                    email
            };
            const run = await sourceDataCollection.findOne(query);
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

        // app.get('/target-key', async (req, res) => {
        //     const query = {};
        //     const cursor = InformationTargetKeyCollection.find(query);
        //     const target_key = await cursor.toArray();
        //     res.send(target_key);
        // });
        app.get('/profile', async (req, res) => {
            const query = {};
            const cursor = profileCollection.find(query);
            const profile_key = await cursor.toArray();
            res.send(profile_key);
        });

        app.post('/target-key', async (req, res) => {
            const target_key = req.body;
            const result = await InformationTargetKeyCollection.insertOne(target_key);
            res.send(result);

        });
        app.delete('/target-key/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await InformationTargetKeyCollection.deleteOne(query);
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