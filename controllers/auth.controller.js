const User = require('../models/user');
const bcrypt = require('bcryptjs');

function getSignupPage(req,res){
    res.render('./authViews/signup');
}

async function postSignupPage(req, res,next) {
    const input=req.body;
    const email=input.email;
    const confirmedEmail=input.confirmedEmail;
    const password=input.password;
    const confirmedPassword=input.confirmedPassword;
    const name=input.name;
    const phone=input.phone;
    const address=input.address;
    const postal=input.postal;
    const city=input.city;
    /* Input check */
    if(!email ||!confirmedEmail || !password || !confirmedPassword || !name || !phone || !address || !postal || !city
        || email!==confirmedEmail || password!==confirmedPassword || !email.includes('@') || password.trim().length<6){
        console.log('please enter correct input!');
        res.redirect('/signup');
        return;
    }

    /* If error happens, the error middleware will handle it */
    try{
        const newUser=new User(
            email,password,name,phone,
            address,postal,city
        )
        await newUser.save();
    }
    catch (e) {
        next(e);
        return;
    }

    res.redirect('/');
}

function getLoginPage(req,res){
    res.render('./authViews/login');
}

async function postLoginPage(req,res){
    const input=req.body;
    const email=input.email;
    const password=input.password;

    /* Check if the user has registered or not */
    const result= await User.hasUserInDB(email);

    /* User not existed */
    if(!result){
        return res.redirect('/login');
    }

    /* User does exist */
    const isDetailTrue = await bcrypt.compare(password, result.password);

    /* But user details are not correct */
    if(!isDetailTrue){
        return res.redirect('/login');
    }

    /* Details are correct */
    req.session.uid=result._id.toString();
    req.session.isAdmin=result.isAdmin;
    req.session.save(function(){
        res.redirect('/');
    });
}

async function postLogout(req,res){
    req.session.uid=null;
    res.redirect('/login');
}

module.exports={
    getSignupPage:getSignupPage,
    postSignupPage:postSignupPage,
    getLoginPage:getLoginPage,
    postLoginPage:postLoginPage,
    postLogout:postLogout
}