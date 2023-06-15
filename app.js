const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.render("index",{title: "Welcome"});
});
app.get('/about',(req,res)=>{
    res.render("about");
})
app.get('/contact',(req,res)=>{
    res.render("contact");
})
app.post('/contact/send',(req,res)=>{
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "eakkarunpoom.ta@gmail.com",
            pass: ""
        }
    });
    const mailOptions = {
        from: "Moss Eakkarunpoom <eakkarunpoom.ta@gmail.com>",
        to: "support@joomdigi.com",
        subject: "Website Submission",
        text: "You have a submission with the following details... Name: "+req.body.name+"Email: "+req.body.email+"Message: "+req.body.message,
        html: "<p>ou have a submission with the following details...</p><ul><li>Name: "+req.body.name+"</li><li>Email: "+req.body.email+"</li><li>Massage: "+req.body.message+"</li></ul>"
    }
    transporter.sendMail(mailOptions,(err, info)=>{
        if(err){
            console.log(err);
            res.redirect('/');
        }
        else{
            console.log("Message Sent: "+info.response);
            res.redirect("/");
        }
    })
})

app.listen(3000);
console.log("Server is runing on port 3000...")