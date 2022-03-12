function getSignupPage(req,res){
    res.render('./authViews/signup');
}

module.exports={
    getSignupPage:getSignupPage,

}