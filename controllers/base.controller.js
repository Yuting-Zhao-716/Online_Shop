function getIndexPage(req,res){
    res.render('baseViews/index');
}

module.exports={
    getIndexPage:getIndexPage,
}