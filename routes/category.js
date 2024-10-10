var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
const verifyToken = require('./authMiddleware')

router.post('/submit_Data',upload.single('picture') ,function(req, res, next) {
 try{
    pool.query("insert into category (categoryname,picture) values(?,?)",[req.body.categoryname,req.file.filename],function(error,result){

        if(error)
        {   
            res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
        }
        else{
            res.status(200).json({status:true,message:'Category Submitted Successfully'})
 
        }

    })
 }

 catch(e)
 {  
    res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})

 }
});

router.get("/Display_All_Category",function(req,res){
try{
    pool.query("select * from  category",function(error,result){

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


router.post("/update_category_Data",function(req,res){
    try{
        pool.query("update category set categoryname=? where categoryid=?",[req.body.categoryname,req.body.categoryid],function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,message:'Server Error: Pls contact DataBase administator'})
            }
            else{
                res.status(200).json({status:true,message:'category update successfully'})
                }
          })
       }
    
     catch(e)
     {  
        res.status(200).json({status:false,message:'Server Error: Pls contact server administator'})
     }

    })
    


    
router.post("/edit_category_picture",upload.single('picture'),function(req,res){
    try{
        pool.query("update category set picture=? where categoryid=?",[req.file.filename,req.body.categoryid],function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
            }
            else{
                res.status(200).json({status:true,message:'Picture update successfully'})
                }
          })
       }
    
     catch(e)
     {  
        res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
     }

    })

    
router.post("/delete_category",function(req,res,next){
    try{
        pool.query("delete from category  where categoryid=?",[req.body.categoryid],function(error,result){
    
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



    

router.post('/Fetch_all_subcategory_by_category',function(req, res, next) {
    try{
       pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
   
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
   

    
module.exports = router;
