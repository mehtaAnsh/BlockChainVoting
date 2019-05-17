const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const VoterSchema = new Schema ({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    election_address: {
        type: String,
        required: true
    }
});
// hash user password before saving into database
VoterSchema.pre('save', function(cb) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    cb();
});
module.exports = mongoose.model('VoterList', VoterSchema)