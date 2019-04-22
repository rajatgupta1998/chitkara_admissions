const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('http-auth');
const mongoose = require('mongoose');
const passport = require('passport');
const Registration = mongoose.model('Registration');
//router.use(express.static(__dirname + '/res'));
/* Call main.css */
router.get('/res/css/main.css',function(req,res){
  res.sendFile(__dirname + '/res/css/main.css');
});

router.get('/res/vendor/bootstrap/css/bootstrap.min.css',function(req,res){
  res.sendFile(__dirname + '/res/vendor/bootstrap/css/bootstrap.min.css');
});
router.get('/res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',function(req,res){
  res.sendFile(__dirname + '/res/fonts/font-awesome-4.7.0/css/font-awesome.min.css');
});
router.get('/res/images/icons/favicon.ico',function(req,res){
  res.sendFile(__dirname + '/res/images/icons/favicon.ico');
});

router.get('/res/images/img-01.png',function(req,res){
  res.sendFile(__dirname + '/res/images/img-01.png');
});

router.get('/res/vendor/jquery/jquery-3.3.1.min.js',function(req,res){
  res.sendFile(__dirname + '/res/vendor/jquery/jquery-3.3.1.min.js');
});

router.get('/res/vendor/bootstrap/js/popper.js',function(req,res){
  res.sendFile(__dirname + '/res/vendor/bootstrap/js/popper.js');
});
router.get('/res/vendor/bootstrap/js/bootstrap.min.js',function(req,res){
  res.sendFile(__dirname + '/res/vendor/bootstrap/js/bootstrap.min.js');
});
router.get('/res/vendor/tilt/tilt.jquery.min.js',function(req,res){
  res.sendFile(__dirname + '/res/vendor/tilt/tilt.jquery.min.js');
});

router.get('/res/fonts/product-sans/product-sans-bold.ttf',function(req,res){
  res.sendFile(__dirname + '/res/fonts/product-sans/product-sans-bold.ttf');
});
router.get('/res/fonts/product-sans/product-sans-regular.ttf',function(req,res){
  res.sendFile(__dirname + '/res/fonts/product-sans/product-sans-regular.ttf');
});
router.get('/res/fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2',function(req,res){
  res.sendFile(__dirname + '/res/fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2');
});
router.get('/signup.html',function(req,res)
{
     res.sendFile(__dirname + '/signup.html');
});
router.get('/',(req,res)=>{
  res.sendFile(__dirname + '/starting.html');
  });
  router.get('/new.html',(req,res)=>{
    res.sendFile(__dirname + '/new.html');
    });
   /* router.post('/',passport.authenticate('local.login', {
      successRedirect: '/new.html',
      failureRedirect: '/',
    }));*/
  router.post('/',function(req,res)
  {
    var password=req.body.password;
    var emailid=req.body.emailid;
  
    Registration.findOne({emailid: emailid}, function(err,user)
    {
      if(emailid==='admin@chitkara'&& password=='admin')
      {
        return  res.sendFile(__dirname + '/new.html');
      }
      if(err)
      {
        console.log(err);
        return res.status(500).send();
      }
      if(!user)
      {
        return res.status(404).send("SORRY YOU ARE NOT RECOGNISED!");
      }
      else
      {
        if(user.password!=req.body.password)
        {
  return  res.sendFile(__dirname + '/starting.html');;
        }
      }
      return res.sendFile(__dirname + '/new.html');
    })
  }); 
  router.get('/forgot.html',(req,res)=>{
    res.sendFile(__dirname + '/forgot.html');
    });
    router.post('/forgot.html',function(req,res)
    {
 
      var emailid=req.body.emailid;
      Registration.findOne({emailid: emailid}, function(err,user)
      {
        if(err)
        {
          console.log(err);
          return res.status(500).send();
        }
        if(!user)
        {
          return res.status(404).send("SORRY YOU ARE NOT RECOGNISED!");
        }
        else
        {
          if(user.password!=req.body.password)
          {
            return res.status(404).send("SORRY YOU ARE NOT RECOGNISED!");
          }
          // Registration.user.password=req.body.npassword;
           //console.log(user.password);
           //console.log(req.body.npassword);
            return  res.sendFile(__dirname + '/forgot.html');;
          }
      })
    }); 
    router.post('/signup.html',function(req,res){
    var name=req.body.name;
    var password=req.body.password;
    var emailid=req.body.emailid;
    var phone=req.body.phone;
    var gender=req.body.gender;
    var percentage=req.body.percentage;
    var fname=req.body.fname;
    var stream=req.body.stream;
    var newuser= new Registration();
    newuser.name=name;
    newuser.emailid=emailid;
    newuser.password=password;
    newuser.percentage=percentage;
    newuser.phone=phone;
    newuser.gender=gender;
    newuser.fname=fname;
    newuser.stream=stream;
    newuser.save(function(err,savedUser){
    if(err)
    {
      console.log(err);
      return res.status(500).send();
    }
    return res.sendFile(__dirname + '/starting.html');
    })
    });
    module.exports = router;