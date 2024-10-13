const express = require('express');
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.json())
const sender_email = process.env.sender_email
const recepient_1 = process.env.recepient_1
const sender_pass = process.env.sender_pass

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        //use .env below
        user:sender_email,
        
        pass:sender_pass,
    }
})

app.get('/blog',(req,res)=>{
    res.send("hi")
})

app.post('/register',(req,res)=>{
    console.log('recived request')
    const {name,email} = req.body;

    const mailOptions = {
        from:sender_email,
        to:[recepient_1,sender_email],
        subject:"new user[for solution]",
        text:`${name} registered into for solution; email: ${email}`
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log("error while trying to send mail")
            return res.status(500).json({error:"error at sendmail"})

        }
        res.status(200).json({message:"email sent successfuly"})
        console.log("successfully send mail")
    })
})

// add .env below
app.listen(5000,()=>{
    console.log("server is online")
})