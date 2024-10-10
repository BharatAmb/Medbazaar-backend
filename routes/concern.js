var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer');
const verifyToken = require('./authMiddleware');

router.post('/submit_concern',upload.single('icon'), function(req,res,next){
    try{
        pool.query("insert into concern(concernname,icon) values(?,?)",[req.body.concernname,req.file.filename],function(error,result){
            if(error){
                res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})
            }
            else{
                res.status(200).json({status:true,message:'Concern Submitted Successfully...'})
            }
        })
    }
    catch(e){
        res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
})



router.get("/Display_All_Concern",verifyToken,function(req,res){
    try{
        pool.query("select * from  concern",function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
            }
            else{
                res.status(200).json({status:true,message:'Success',data:result})
     
            }
    
        })
     }
    
     catch(e)
     {  
        res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
        
      }
    })
    

module.exports=router