const User = require('../models/user');

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
module.exports={
    getSignupPage:getSignupPage,
    postSignupPage:postSignupPage,
}