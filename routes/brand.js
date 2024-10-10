var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
const verifyToken = require('./authMiddleware');


  
router.post('/submit_Brand',upload.single('picture'),function(req,res,next){

try{
    pool.query('insert into brand (brandname,picture) values(?,?)',[req.body.brandname,req.file.filename],function(error,result){
        if(error)
        { console.log(error)
        res.status(200).json({status:'false',msg:'Pls Contact Database Administator..'})
        }
        else{
            res.status(200).json({status:'true',msg:'Brand Submited Succesfully'})

        }

    })
}

catch(e)
{   console.log('errrrrror',e)
    res.status(200).json({status:false,msg:'Server Error: Pls Contact Server Admin.'})
}


})



router.get("/Display_All_Brand",function(req,res){

    try{

     pool.query('select * from brand',function(error,result){

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


router.post('/update_brand_data',function(req,res){

    try{
        pool.query('update  brand set brandname=? where brandid=?',[req.body.brandname,req.body.brandid],function(error,result){
            if(error)
            {
                res.status(200).json({status:false,msg:'Server Error:Pls contact to Database Administator..'})
            }
         
           else{
                res.status(200).json({status:true,msg:'Category update successfully'})
              }
            
        })

    }
    catch(e){

        res.status(200).json({status:false,msg:'Server Error:Pls contact to Server Administator..'})
    }
})

router.post("/edit_brand_picture",upload.single('picture'),function(req,res){
    try{
        pool.query('update brand set picture=? where brandid=?',[req.file.filename,req.body.brandid],function(error,result){

            if(error)
            {
                res.status(200).json({status:false,msg:"Server Error:Pls contact to Database Administator.."})
            }
            else{
                res.status(200).json({status:true,msg:'Picture Update successfully'})
            }

        })
    }
    catch(e){
        res.status(200).json({status:false,msg:'Server Error:Pls contact to Server Administator..'})

    }
})


router.post("/delete_brand",function(req,res,next){
    try{
        pool.query("delete from brand  where brandid=?",[req.body.brandid],function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,msg:'Server Error:: Pls contact server administator'})
            }
            else{
                res.status(200).json({status:true,msg:'Delet Data Successfully'})
                }
          })
       }
    
     catch(e)
     {  
        res.status(200).json({status:false,msg:'Server Error:: Pls contact server administator'})
     }

    })

    router.post('/Fetch_all_Product_by_Brand',function(req, res, next) {
        try{
           pool.query("select * from products where brandid=?",[req.body.brandid],function(error,result){
       
               if(error)
               {   
                   res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
               }
               else{
                   res.status(200).json({status:true,message:'Successfully',data:result})
        
               }
       
           })
        }
       
        catch(e)
        {  console.log('EEERRROORRR',e)
           res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
       
        }
       });
       

module.exports=router;

