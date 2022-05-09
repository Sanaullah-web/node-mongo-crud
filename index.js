const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/*
...........
User Informatoin
...........
username: dbuser
password: cWqdqV7zLAaQehDu
*/



const uri = "mongodb+srv://dbuser:cWqdqV7zLAaQehDu@cluster0.jhx4d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     console.log('db connected')
//     // perform actions on the collection object
//     client.close();
// });
async function run() {
    try {
        await client.connect();
        const userCollection = client.db('foodExpress').collection('user');
        // const user = { name: 'ali', gmail: 'aksja@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);

        // showing data
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })


        // posting data on mongoDB
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            console.log(result)
            res.send(result)
        })

        // Deleting 
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('running');
})

app.listen(port, () => {
    console.log('listenning to:', port);
})