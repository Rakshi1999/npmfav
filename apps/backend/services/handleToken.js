const jwt = require('jsonwebtoken');

const generateToken =async (data) =>{
   return new Promise((resolve,reject)=>{
    jwt.sign(data,process.env.JWT_SECRETE_KEY,{expiresIn:'1d'},(err,token)=>{
        if(err){
            reject(err);
        }else{
            resolve(token);
        }
    })
   })
}

const verifyToken = (token) =>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.JWT_SECRETE_KEY,{},(err,val)=>{
            if(err){
                reject(err);
            }else{
                resolve(val);
            }
        })
    })
}

module.exports = {
    generateToken,
    verifyToken
}