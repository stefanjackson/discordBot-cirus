const express = require('express');
require('dotenv').config(); 

const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.json());

let database;

app.get('/', (req, resp) => {
    resp.send('Cirus Price History');
})

app.get('/api/price', (req, resp) => {
    database.collection('prices').find({}).toArray((err, result) => {
        if(err) throw err;
        resp.send(result);
    })
})

app.listen(5000, () => {
    MongoClient.connect(process.env.MONGO_URI, {useNewUrlParser: true}, (error, result) => {
        if(error) throw error;
        database = result.db('test');
        console.log('success');
    } )
})