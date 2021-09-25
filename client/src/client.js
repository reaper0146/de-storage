import logo from './logo.svg';
import react, { useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'
import { Users, BrowserStorage } from '@spacehq/sdk';
// eslint-disable-next-line
import { UserStorage, AddItemsResultSummary } from '@spacehq/sdk';
import {GetAddressFromPublicKey} from '@spacehq/sdk'
//import words from 'random-words';

var tempUser
var tempStorage




async function userCreate() {
  console.log('hi')
  const users = await Users.withStorage(
    new BrowserStorage(), 
    { endpoint: 'wss://auth.space.storage' 
  }//'wss://auth-dev.space.storage' }
    
);
console.log(typeof(users.users))
// createIdentity generate a random keypair identity
const identity = await users.createIdentity();

// the new keypair can be used to authenticate a new user
// `users.authenticate()` generates hub API session tokens for the keypair identity.
const user = await users.authenticate(identity);

console.log(identity)
console.log(user)
console.log(user.storageAuth.token)
tempUser = user
const storage = new UserStorage(user)
console.log("temp")
console.log(storage)
const mailboxResult = await storage.initMailbox()
console.log('temp2')
console.log("MailboxResult: ", mailboxResult)
await storage.createFolder({ bucket: 'personal', path: 'topFolder' });
console.log(storage)
const result = await storage.listDirectory({ bucket: 'personal', path: '' });
console.log(result)
}

async function createStorage() {
const storage = new UserStorage(tempUser);
const mailboxResult = await storage.initMailbox()
console.log("MailboxResult: ", mailboxResult)
await storage.createFolder({ bucket: 'personal', path: 'topFolder' });
console.log(storage)
const result = await storage.listDirectory({ bucket: 'personal', path: '' });
console.log(result)
}
/*
async function fileStorage() {
  await spaceStorage.addItems({
    bucket: 'personal',
    files: [
      {
        path: 'file.txt',
        content: '',
      },
      {
        path: 'space.png',
        content: '',
      }
    ],
 });
}
*/
async function fileShare() {
  const storage = new UserStorage(tempUser);

// you can share privately with existing users via their public key:
await storage.shareViaPublicKey({
    publicKeys: [{
      id: 'user@email.com', // or any identifier for the user
      pk: 'user-pk-hex-or-multibase', // optional, omit if user doesn't exist yet, it would generate temp access key
    }],
    paths: [{
        bucket: 'personal',
        path: '/file/path/here'
    }],
});
}

//new

  

function App() {
  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const[loginStatus, setLoginStatus]= useState("")

  const register = () => {
    Axios.post('http://localhost:5000/light'); };

  const lightStream = () => {
    Axios.post('http://localhost:5000/register', {
      username:usernameReg, password:passwordReg}).then((response) => {console.log(response.data);});
  };

  const login = () => {
    Axios.post('http://localhost:5000/login', {
      username:username, password:password}).then((response) => {
        if(response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Registration">
          <h1>Registration</h1> <br/>
          <label>Username</label>
          <input type='text' onChange={(e) => {
            setUsernameReg(e.target.value);
          }}/><br/>
          <label>Password</label>
          <input type='text' onChange={(e) => {
            setPasswordReg(e.target.value);
          }}/><br/>
          <button onClick = {register}>Register</button><br/><br/>
        </div>

        <div className="Regislogintration">
          <h1>Login</h1><br/>
          <input type='text' placeholder='Username' onChange={(e) => {
            setUsername(e.target.value);
          }} /><br/>
          <input type='password' placeholder='password' onChange={(e) => {
            setPassword(e.target.value);
          }}/><br/>
          <button onClick = {login}>Login</button><br/>
        </div>
        <button className="createToken" onClick = {userCreate}> Create User</button><br/>
        <button className="createToken" onClick = {fileShare}> Share File</button><br/>
        <button className="createToken" onClick = {lightStream}> LightStream</button><br/>
        <h1>{loginStatus}</h1>
      </header>
    </div>
  );
}

export default App;
