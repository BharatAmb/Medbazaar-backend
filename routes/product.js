var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
const verifyToken = require('./authMiddleware');




   
router.post('/submit_Product',upload.single('picture') ,function(req, res, next) {
    try{
       pool.query("insert into products (categoryid,subcategoryid,brandid,productname,description,picture) values(?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.file.filename],function(error,result){
   
           if(error)
           {  
               res.status(200).json({status:false,message:'Server Error:: Pls contact Database administator'})
           }
           else{ console.log('EEE',error)
               res.status(200).json({status:true,message:'Product Submitted Successfully'})
    
           }
   
       })
    }
   
    catch(e)
    {  console.log('EEERRROORRR',e)
       res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
   
    }
   });

   
router.get("/Display_All_Product",verifyToken,function(req,res){
    try{
        pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid ) as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname ,(select B.brandname from brand B where B.brandid=P.brandid) as brandname from  products P",function(error,result){
    
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


    
    
router.post("/update_product_Data",function(req,res){
    try{
        pool.query("update products set categoryid=?, subcategoryid=?, brandid=?, productname=?, description=? where productid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.productid],function(error,result){
    
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
    

    
       
router.post("/edit_product_picture",upload.single('picture'),function(req,res){
    try{
        pool.query("update products set picture=? where productid=?",[req.file.filename,req.body.productid],function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
            }
            else{
                res.status(200).json({status:true,message:'Subcategory Picture update successfully'})
                }
          })
       }
    
     catch(e)
     {  
        res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
     }

    })

    
router.post("/delete_product",function(req,res,next){
    try{
        pool.query("delete from products  where productid=?",[req.body.productid],function(error,result){
    
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
   