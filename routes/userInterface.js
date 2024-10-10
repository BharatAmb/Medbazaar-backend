var express = require('express');
var router = express.Router();
var pool=require('./pool');


router.post("/show_all_banner",function(req,res){
   
    try{
        pool.query("select * from banner where bannertype=?",[req.body.bannertype],function(error,result){
    
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

    router.get("/show_all_brand",function(req,res){
   
        try{
            pool.query("select * from brand where brandid!=0",function(error,result){
        
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
    


router.get("/show_all_category",function(req,res){
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




router.post("/Display_All_Product_By_Offer",function(req,res){
    try{
        pool.query("select D.*,PR.* ,D.picture as multi_picture ,D.description as PD_description ,(select C.categoryname from category C where C.categoryid=D.categoryid ) as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid=D.subcategoryid) as subcategoryname ,(select B.brandname from brand B where B.brandid=D.brandid) as brandname ,(select Cn.concernname from concern Cn where Cn.concernid=D.concernid ) as concernname from  productdetails D, products PR where D.productid=PR.productid and D.offertype=?",[req.body.offertype],function(error,result){
    
            if(error)
            {    console.log(error)
                res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
            }
            else{
                console.log(error)
                res.status(200).json({status:true,message:'Success',data:result})
                console.log("hii",result)
            }
    
        })
     }
    
     catch(e)
     {   console.log(error)
        res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
        
      }
    })
    


    
router.get("/Display_All_Product",function(req,res){
    try{
        pool.query("select * from productdetails",function(error,result){
    
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
    
    

    
router.get("/show_all_concern",function(req,res){
    try{
        pool.query("select * from concern",function(error,result){
    
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




    
router.post("/display_all_productdetail_by_category",function(req,res){
    try{ console.log("Filter",req.body)
    
    var q="select D.*,PR.* ,D.picture as multi_picture ,D.description as PD_description ,(select C.categoryname from category C where C.categoryid=D.categoryid ) as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid=D.subcategoryid) as subcategoryname ,(select B.brandname from brand B where B.brandid=D.brandid) as brandname from  productdetails D, products PR where (D.productid=PR.productid ) and (D.categoryid= "+req.body.categoryid+" or D.subcategoryid= "+req.body.subcategoryid+" or D.productsubname like '%"+req.body.pattern+"%') "
        console.log(q)   
    pool.query(q,
        function(error,result){
            
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
     {   console.log(error)
        res.status(200).json({status:false,message:'Server Error:: Pls contact server administator'})
        
      }
    })
    


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
       

module.exports=router;    