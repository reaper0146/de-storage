const express=require('express');
const mysql = require('mysql');
const cors=require('cors');

const app=express();
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"password",
    database:"LoginSystem"
})

app.post('/register', (req,res)=> {
    const username = req.body.username
    const password = req.body.password
    console.log(username)
    console.log(password)

    /*db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], 
    (err,result) => {console.log(err);}
    );*/
})
const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})