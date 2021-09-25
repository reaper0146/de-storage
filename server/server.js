const express=require('express');
const mysql = require('mysql');
const cors=require('cors');
const { Leth, Web3, Gateway} = require('lightstreams-js-sdk')

const app=express();
app.use(express.json())
app.use(cors())

// Instanciate web3 engine using my local lightstreams network provider and remote keys
const web3 = Web3.newEngine('http://localhost:8545');
const gateway = Gateway('https://gateway.sirius.lightstreams.io');

//remote
async function userCreateR() {
    const { Gateway }  = require('lightstreams-js-sdk')
    const gateway = Gateway('https://gateway.sirius.lightstreams.io')
  
    const account = "0xa981f8ca77d069d79b609ca0069b052db79e7e30"
    const file = fs.createReadStream(`/tmp/my_secret_file.txt`)
    const { meta, acl } = await gateway.storage.add(account, "password", file)
  
  }

app.post('/light', (req,res)=> {

// Create accounts to be used in the example
// `accountPublisher` will require some tokens to performe the actions
const accountPublisher = await web3.eth.personal.newAccount("password1");
const accountReader = await web3.eth.personal.newAccount("password2");

console.log(accountPublisher)
console.log(accountReader)
// Deploy an ACL contract
const txReceipt = Leth.acl.create(web3, { from: accountPublisher, owner: accountPublisher, isPublic: false });

const aclAddr = txReceipt.contractAddress;

// Publish new content using deployed acl
const file = fs.createReadStream(`/tmp/my_secret_file.txt`);
const { meta } = await gateway.storage.addWithAcl(account, aclAddr, file);

// Grant reader read access
//await Leth.acl.grantRead = async (web3, { from: accountPublisher, contractAddr: aclAddr, account: accountReader })
})


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

app.post('/login', (req,res)=> {
    const username = req.body.username
    const password = req.body.password

    console.log(username)
    console.log(password)

    db.query("SELECT * FROM users username = ? and password = ?", [username, password], 
    (err,result) => {
        if(err){
            console.log(err);
            res.send({err: err})

        }
            
        else{
            if (result.length>0){
                res.send(result);
            } else {
                res.send({message: "Wrong username or password"});
            }
        }
    }
    );
})
const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}` )
})