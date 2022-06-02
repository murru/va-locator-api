//import mongoose
import mongoose from 'mongoose';

//create a mongoDB schema
const schema = mongoose.Schema;

//export the schema
export const DrugSchema = new schema({
    name: { type: Object },
    theraputicArea: { type: String },
    GeneInfo: { type: Array },
    GroupPhenotype: { type: String },
    Action: { type: String },
    Recommendation: { type: String },
});