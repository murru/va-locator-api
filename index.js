// Import express
import express from 'express';
// Import mongodb and mongose
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// Import cors lib
import cors from 'cors';
// Import Drug schema
import { DrugSchema } from './models/Drug.js';

const app = express();
app.use(cors())

// Setup server port
const port = 4000;

// Set connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/medications', {
    //avoid errors
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Parse requests and make it readable for our API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
app.get('/', (req, res) => {
    const Drugs = mongoose.model('Drugs', DrugSchema);
    // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
    Drugs.find((err, drugs) => {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        const drugsData = drugs.map( (d) => {
            const fields = {
                id: d._id,
                generic: d.name.generic,
                trade: d.name.trade,
                theraputicArea: d.theraputicArea,
                GeneInfo: d.GeneInfo,
                GroupPhenotype: d.GroupPhenotype,
                Action: d.Action,
                Recommendation: d.Recommendation
            }
            return fields
        })
        res.json(drugsData);
    });
});

app.get('/drug/:drugId', (req, res) => {
    const Drugs = mongoose.model('Drugs', DrugSchema);
    // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
    Drugs.find({_id: req.params.drugId}, (err, drug) => {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        res.send(drug);
    });
});

app.listen(port);