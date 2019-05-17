const CompanyModel = require('../models/company');
const bcrypt = require('bcrypt'); 
const path = require('path');
module.exports = {
    create: function(req, res, cb) {
        CompanyModel.findOne({email:req.body.email}, function(err, result) {
            if(err){
                cb(err);
            }
            else{
                if(!result){
                    CompanyModel.create({ email: req.body.email, password: req.body.password }, function (err, result) {
                        if (err) 
                            cb(err);
                        else{
                            CompanyModel.findOne({email:req.body.email}, function(err, CompanyInfo) {
                                if (err)
                                    cb(err);
                                else{
                                    res.json({status: "success", message: "Company added successfully!!!", data:{id:CompanyInfo._id}});
                                }
                            });  
                        }
                    });
                }
                else{
                    res.json({status: "error", message: "Company already exists ", data:null});
                }
            }
            
        });
    },
    authenticate: function(req, res, cb) {
        CompanyModel.findOne({email:req.body.email}, function(err, CompanyInfo){
            if (err) 
                cb(err);
            else {
                if(bcrypt.compareSync(req.body.password, CompanyInfo.password) && CompanyInfo.email == req.body.email) {
                    
                    res.json({status:"success", message: "company found!!!", data:{id: CompanyInfo._id, email: CompanyInfo.email}});
                }
                else {
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
            }
        });
    }
}