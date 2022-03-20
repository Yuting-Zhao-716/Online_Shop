const User = require('../models/user');
const bcrypt = require('bcryptjs');
const dataFlushing = require('../utility/dataFlushing');

function getSignupPage(req,res){
    let inputData=dataFlushing.dataRetrieving(req);
    if(!inputData){
        inputData={
            errorMessage:'',
            email:'',
            confirmedEmail:'',
            password:'',
            confirmedPassword:'',
            name:'',
            phone:'',
            address:'',
            postal:'',
            city:''
        }
    }
    res.render('./authViews/signup', {data: inputData});
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

    /* Data for flushing */
    const inputData={
        email:email,
        confirmedEmail:confirmedEmail,
        password:password,
        confirmedPassword:confirmedPassword,
        name:name,
        phone:phone,
        address:address,
        postal:postal,
        city:city
    }

    /* Input check */
    if(!email ||!confirmedEmail || !password || !confirmedPassword || !name || !phone || !address || !postal || !city
        || email!==confirmedEmail || password!==confirmedPassword || !email.includes('@') || password.trim()<6){
        console.log('please enter correct input!');
        dataFlushing.dataFlushing(req,{
            errorMessage:'Invalid input, please enter again.',
            ...inputData
        },function (){
            res.redirect('/signup');
        })
        return;
    }

    /* Check if the User existed already or not */
    try{
        const userCheckResult= await User.hasUserInDB(email);
        if(userCheckResult){
        console.log('User already existed !');
        dataFlushing.dataFlushing(req,{
            errorMessage:'User registered already, please try another email or login instead.',
            ...inputData
        },function (){
            res.redirect('/signup');
        })
        return;
    }

    /* If error happens, the error middleware will handle it */
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

    res.redirect('/login');
}

function getLoginPage(req,res){
    let inputData = dataFlushing.dataRetrieving(req);
    if(!inputData){
        inputData={
            errorMessage:'',
            email:'',
            password:''
        }
    }
    res.render('./authViews/login',{data:inputData});
}

async function postLoginPage(req,res,next){
    const input=req.body;
    const email=input.email;
    const password=input.password;
    const inputData={
        email:email,
        password:password
    }

    let result;
    /* Check if the user has registered or not */
    try{
        result= await User.hasUserInDB(email);
    }
    catch (e){
        next(e);
        return;
    }
    /* User not existed */
    if(!result){
        dataFlushing.dataFlushing(req,{
            errorMessage:'Wrong username or password, please try again.',
            ...inputData
        },function (){
            res.redirect('/login');
        })
        return;
    }

    /* User does exist */
    const isDetailTrue = await bcrypt.compare(password, result.password);

    /* But user details are not correct */
    if(!isDetailTrue){
        dataFlushing.dataFlushing(req,{
            errorMessage:'Wrong username or password, please try again.',
            ...inputData
        },function (){
            res.redirect('/login');
        })
        return;
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