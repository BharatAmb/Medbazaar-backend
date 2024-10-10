var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
const verifyToken = require('./authMiddleware');




    
router.post('/submit_subcategory',upload.single('picture'),function(req,res,next){

    try{
        pool.query('insert into subcategory (categoryid,subcategoryname,picture) values(?,?,?)',[req.body.categoryid,req.body.subcategoryname,req.file.filename],function(error,result){
            if(error)
            { console.log(error)
            res.status(200).json({status:'false',msg:'Pls Contact Database Administator..'})
            }
            else{
                res.status(200).json({status:'true',msg:'SubCategory Submited Succesfully'})
    
            }
    
        })
    }
    
    catch(e)
    {   console.log('errrrrror',e)
        res.status(200).json({status:false,msg:'Server Error: Pls Contact Server Admin.'})
    }
    
    
    })
    


    
router.get("/Display_All_Subcategory",verifyToken,function(req,res){

    try{

     pool.query('select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid ) as categoryname from subcategory S',function(error,result){

        if(error){
            res.status(200).json({status:false,msg:'Server Error:Pls contact to Database Administator..'})
        }
        else{
            res.status(200).json({status:true,msg:'Success',data:result})
        }
     })   
    }
    catch(e)
    {
        res.status(200).json({status:false,msg:'Server Error:Pls contact to Server Admin...'})

    }
})




router.post("/update_subcategory_Data",function(req,res){
    try{
        pool.query("update subcategory set categoryid=?, subcategoryname=? where subcategoryid=?",[req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
    
            if(error)
            {   
                res.status(400).json({status:false,msg:'Server Error: Pls contact DataBase administator'})
            }
            else{
                res.status(200).json({status:true,msg:'Subcategory update successfully'})
                }
          })
       }
    
     catch(e)
     {  console.log('eeeeeeeeee',e)
        res.status(200).json({status:false,msg:'Server Error: Pls contact server administator'})
     }

    })



    
    
router.post("/edit_subcategory_picture",upload.single('picture'),function(req,res){
    try{
        pool.query("update subcategory set picture=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,msg:'Server Error:: Pls contact server administator'})
            }
            else{
                res.status(200).json({status:true,msg:'Subcategory Picture update successfully'})
                }
          })
       }
    
     catch(e)
     {  
        res.status(200).json({status:false,msg:'Server Error:: Pls contact server administator'})
     }

    })


    
router.post("/delete_subcategory",function(req,res,next){
    try{
        pool.query("delete from subcategory  where subcategoryid=?",[req.body.subcategoryid],function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
            }
            else{
                res.status(200).json({status:true,message:'Delete Data Successfully'})
                }
          })
       }
    
     catch(e)
     {  
        res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
     }

    })

    
module.exports = router;
