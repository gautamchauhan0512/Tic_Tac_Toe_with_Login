const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const bcrypt = require('bcrypt');

const mongoose = require("mongoose");
const { error } = require("console");
mongoose.connect('mongodb://localhost/meeee')
var db  = mongoose.connection
db.once('open',()=>{
    console.log("Database is conected")
});
var myschema = mongoose.Schema({
    
    email:String,
    pass:String,
    
})

const hashdata  =new mongoose.model('hashdata',myschema);
app.use(express.json())
app.set('view engine','ejs')
app.use('/staticc',express.static('staticc'))
app.use('/public',express.static('public'))
app.use('/static',express.static('static'))
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }))


app.get('/',(req,res)=>{
    res.render("index.ejs")
})
app.post('/newlogin', async(req,res)=>{
    const hashpassword = await bcrypt.hash(req.body.pass,10)
    const aa = new hashdata({
        email:req.body.email,
        pass:hashpassword
    })
    await aa.save();
    res.render('index.ejs')
})

app.post('/login',async(req,res)=>{
    const user = await hashdata.findOne({email:req.body.email})
    if(!user){
       return res.status(401).send("User not found")
    }

    const mach = await bcrypt.compare(req.body.pass,user.pass)
    
    if(mach){
        res.render('login.ejs')
    }else{
        // res.send("wrong pass")
        res.send('wrong pass')
        
    
    }
})

app.listen('80',()=>{
    console.log("server is rinning")
})