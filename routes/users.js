var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
const e = require("express");

router.post("/submit_user", function (req, res, next) {
  try {
    pool.query(
      "insert into medbazzar.userdata (username, emailid, mobileno ) values(?,?,?)",
      [req.body.username, req.body.emailid, req.body.mobileno],
      function (error, result) {
        if (error) {
          res.status(200).json({
            status: "false",
            msg: "Pls Contact Database Administator..",
          });
        } else {
          res
            .status(200)
            .json({ status: "true", msg: " Register Succesfully" });
        }
      }
    );
  } catch (e) {
    res
      .status(200)
      .json({ status: false, msg: "Server Error: Pls Contact Server Admin." });
  }
});

router.post("/check_userdata", function (req, res, next) {
  try {
    pool.query(
      "select * from medbazzar.userdata where mobileno=?",
      [req.body.mobileno],
      function (error, result) {
        if (error) {
          res.status(200).json({
            status: "false",
            msg: "Pls Contact Database Administator..",
          });
        } else {
          if (result.length == 1)
            res
              .status(200)
              .json({ status: true, msg: " User Found", data: result[0] });
          else
            res
              .status(200)
              .json({ status: false, msg: " User Not Found", data: [] });
        }
      }
    );
  } catch (e) {
    res
      .status(200)
      .json({ status: false, msg: "Server Error: Pls Contact Server Admin." });
  }
});

router.post("/check_user_address", function (req, res, next) {
  try {
    pool.query(
      "select * from address where mobileno=?",
      [req.body.mobileno],
      function (error, result) {
        if (error) {
          res.status(200).json({
            status: "false",
            msg: "Pls Contact Database Administator..",
          });
        } else {
          if (result.length == 1)
            res
              .status(200)
              .json({ status: true, msg: " User Addres Found", data: result });
          else
            res.status(200).json({
              status: false,
              msg: " User Address  Not Found",
              data: [],
            });
        }
      }
    );
  } catch (e) {
    res
      .status(200)
      .json({ status: false, msg: "Server Error: Pls Contact Server Admin." });
  }
});

router.post("/delivery_address", function (req, res, next) {
  try {
    pool.query(
      "insert into address (address,mobileno,landmark,pincode,state,city) values(?,?,?,?,?,?)",
      [
        req.body.address,
        req.body.mobileno,
        req.body.landmark,
        req.body.pincode,
        req.body.state,
        req.body.city,
      ],
      function (error, result) {
        if (error) {
          res.status(200).json({
            status: false,
            msg: "Pls Contact Database Administator..",
          });
        } else {
          res
            .status(200)
            .json({ status: true, msg: "Address Sumbitted Succesfully" });
        }
      }
    );
  } catch (e) {
    res
      .status(200)
      .json({ status: false, msg: "Server Error: Pls Contact Server Admin." });
  }
});

router.post("/save_order", function (req, res) {
  try {
    pool.query(
      "insert into orders ( userid, orderdate,emailid ,mobileno, paymentid, paymentstatus) values(?,?,?,?,?,?)",
      [
        req.body.userid,
        new Date().toString(),
        req.body.emailid,
        req.body.mobileno,
        req.body.paymentid,
        req.body.paymentstatus,
      ],
      function (error, result) {
        if (error) {
          res.status(200).json({
            status: false,
            msg: "Pls Contact Database Administator..",
          });
        } else {
          console.log(result);
          pool.query(
            "insert into orderdetails (orderid,productdetailid, price, offerprice, qty) values ?",
            [
              req.body.orderlist?.map((item) => {
                return [
                  result.insertId,
                  item.productdetailid,
                  item.price,
                  item.offerprice,
                  item.qty,
                ];
              }),
            ],
            function (error, result) {
              if (error) {
                console.log("WWWWWW", e);
                res.status(200).json({
                  status: false,
                  msg: "Pls Contact Database Administator..",
                });
              } else {
                console.log(result);
                res
                  .status(200)
                  .json({ status: true, msg: "Order Sumbitted Succesfully" });
              }
            }
          );
        }
      }
    );
  } catch (e) {
    console.log("EEEEEE", e);
    res
      .status(200)
      .json({ status: false, msg: "Server Error: Pls Contact Server Admin." });
  }
});

router.get("/show_all_orders", function (req, res) {
  try {
    pool.query("select * from  orders ", function (error, result) {
      if (error) {
        res.status(200).json({
          status: false,
          message: "Server Error:: Pls contact server administator",
        });
      } else {
        res
          .status(200)
          .json({ status: true, message: "Success", data: result });
      }
    });
  } catch (e) {
    res.status(200).json({
      status: false,
      message: "Server Error:: Pls contact server administator",
    });
  }
});

router.post("/show_orderdetails", function (req, res) {
  try {
    pool.query(
      "select  OD.*,PD.*,(select P.picture from products P where P.productid=PD.productid) as picture from orderdetails OD, productdetails PD where OD.productdetailid=PD.productdetailid and OD.orderid=?",
      [req.body.orderid],
      function (error, result) {
        if (error) {
          console.log("EEEE", e);
          res.status(200).json({ status: false, message: "Server Error" });
        } else {
          res
            .status(200)
            .json({ status: true, message: "Success", data: result });
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      status: false,
      message: "Server Error:: Pls contact server administator",
    });
  }
});

module.exports = router;

