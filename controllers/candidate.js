const path = require('path');
var nodemailer = require('nodemailer');

module.exports = {

    register: function (req, res, cb) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '', /*sender email here */
                pass: '' /*sender email's password here */
            }
        });
        const mailOptions = {
            from: '', /* sender email here */
            to: req.body.email, 
            subject: req.body.election_name+ 'Registration', 
            html: 'Congrats you have been registered for  '+req.body.election_name+' election.'
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err){
                res.json({status:"error", message: "mail error", data:null});
                console.log(err);
            }
            else
                console.log(info);
                res.json({status:"success", message: "mail sent successfully!!!", data:null})
        });
    }
}