const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    email: {                            //mail of the company
        type: String,
        required: true
    },
    password: {                         //password of the company
        type: String,
        required: true
    }
});
// hash user password before saving into database
CompanySchema.pre('save', function(cb){
this.password = bcrypt.hashSync(this.password, saltRounds);
cb();
});
module.exports = mongoose.model('CompanyList', CompanySchema);