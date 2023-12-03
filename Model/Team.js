const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    teamName:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    member: {
        type: [{
            id: Number,
            first_name: String,
            last_name: String,
            domain: String,
        }],
        required: true
    },
});


module.exports = mongoose.model('Team', TeamSchema);