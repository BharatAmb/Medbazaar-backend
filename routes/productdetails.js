var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
const verifyToken = require('./authMiddleware');

  
router.post('/submit_Productdetails',upload.any(),function(req,res,next){

    try{
        var file=req.files.map((file)=>file.filename)
        pool.query('insert into productdetails (categoryid, subcategoryid, brandid, productid, concernid ,productsubname, weight, weighttype, type, packaging, qty, price, offerprice, offertype, description ,picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,req.body.concernid,req.body.productsubname,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.qty,req.body.price,req.body.offerprice,req.body.offertype,req.body.description,file+""],function(error,result){
            if(error)
            { 
                console.log('FILES',req.files)
            res.status(200).json({status:'false',message:'Pls Contact Database Administator..'})
            }
            else{ 
                res.status(200).json({status:'true',message:'Products Submited Succesfully'})
    
            }
    
        })
    }
    
    catch(e)
    {   console.log('errrrrror',e)
        res.status(200).json({status:false,message:'Server Error: Pls Contact Server Admin.'})
    }
    
    
    })
    

    
router.get("/Display_All_Product",verifyToken,function(req,res){
    try{
        pool.query("select D.*,(select C.categoryname from category C where C.categoryid=D.categoryid ) as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid=D.subcategoryid) as subcategoryname ,(select B.brandname from brand B where B.brandid=D.brandid) as brandname , (select P.productname from products P where P.productid=D.productid) as productname ,(select Cn.concernname from concern Cn where Cn.concernid=D.concernid ) as concernname from  productdetails D ",function(error,result){
    
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
    

    router.post("/update_product_DetailData",function(req,res){
        try{
            pool.query("update productdetails set categoryid=?, subcategoryid=?, brandid=?, productid=? , productsubname=?, weight=?, weighttype=?, type=?, packaging=?, qty=?, price=?, offerprice=?, offertype=?, description=?  where productdetailid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,req.body.productsubname,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.qty,req.body.price,req.body.offerprice,req.body.offertype,req.body.description,req.body.productdetailid],function(error,result){
        
                if(error)
                {   
                    res.status(200).json({status:false,message:'Server Error: Pls contact DataBase administator'})
                }
                else{
                    res.status(200).json({status:true,message:'ProductDetails update successfully'})
                    }
              })
           }
        
         catch(e)
         {  
            res.status(200).json({status:false,message:'Server Error: Pls contact server administator'})
         }
    
        })


               
router.post("/edit_productdetail_picture",upload.single('picture'),function(req,res){
    try{
        pool.query("update productdetails set picture=? where productdetailid=?",[req.file.filename,req.body.productdetailid],function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
            }
            else{
                res.status(200).json({status:true,message:'Productdetail Picture update successfully'})
                }
          })
       }
    
     catch(e)
     {  
        res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
     }

    })

       
router.post("/delete_productdetails_data",function(req,res,next){
    try{
        pool.query("delete from productdetails  where productdetailid=?",[req.body.productdetailid],function(error,result){
    
            if(error)
            {   
                res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
            }
            else{
                res.status(200).json({status:true,message:'Data Delete  Successfully'})
                }
          })
       }
    
     catch(e)
     {  
        res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
     }

    })

        
    module.exports=router;
  