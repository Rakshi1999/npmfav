const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./Db/connectToDB');

// controllers import
const chectAuth = require('./middlewares/checkAuth');
const {createCtlr,readCtlr,updateCtlr,deleteCtlr} = require('./contollers/crudCtlr');
const loginCtlr = require('./contollers/loginCtrl');
const logoutCtlr = require('./contollers/logoutCtlr');
const signupCtlr = require('./contollers/signupCtlr');

const port = process.env.port || 3005;

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Backend working</h1>');
})

app.post('/login',loginCtlr);

app.post('/signup',signupCtlr);

app.post('/logout',logoutCtlr);

// crud operations  //

app.route('/update/:id')
.post(chectAuth,createCtlr)
.get(chectAuth,readCtlr)
.put(chectAuth,updateCtlr)
.delete(chectAuth,deleteCtlr);

app.listen(port,(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log(`server listening at port ${port}`);
    }
})