function getIndexPage(req,res){
    res.render('baseViews/index',{pageTitle:'Speed Factory NZ'});
}

module.exports={
    getIndexPage:getIndexPage,
}