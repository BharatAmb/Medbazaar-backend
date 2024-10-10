var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
const verifyToken = require('./authMiddleware');


  
router.post('/submit_Banner',upload.any(),verifyToken,function(req,res,next){

try{
    var file=req.files.map((file)=>file.filename)
    pool.query('insert into banner (bannertype,brandid,picture) values(?,?,?)',[req.body.bannertype,req.body.brandid,file+""],function(error,result){
        if(error)
        { console.log(error)
        res.status(200).json({status:'false',msg:'Pls Contact Database Administator..'})
        }
        else{
            res.status(200).json({status:'true',msg:'Banner Submited Succesfully'})

        }

    })
}

catch(e)
{   console.log('errrrrror',e)
    res.status(200).json({status:false,msg:'Server Error: Pls Contact Server Admin.'})
}


})

module.exports=router