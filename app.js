const express=require('express');
const path=require('path');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const sample=require('./models/bookingdetails.js');

const uri=process.env.mongo_uri;
mongoose.connect(
    uri
);
const database=mongoose.connection;
database.on("error",(error)=>{

console.log(error);
});
database.once("connected",()=>{


    console.log('database connected');
});
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add.html'));
});


app.post('/submit',async (req, res) => {
    try{
        const data=req.body;
        console.log(data);
        const details= await sample.create(data);
        res.status(201).redirect('/view');
    
       } 
    
       catch(error){
       res.status(500).json
       }
    });

    
    app.get('/api/bookingdetails/:id',async (req, res) => {
        const data=req.body;
        const details= await sample.find(data);
        console.log("gg");
        res.json(details);
    });


   
   
     app.get('/views/:id', (req, res) => {
            
            res.sendFile(path.join(__dirname, 'public', 'view.html'));
        });


const port=3004;
app.listen(port,()=>{

    console.log(`server is running on ${port}`);
});