function errorHandling(error,req, res,next){
    console.log('an error has occurred');
    if(error.code===404){
        return res.status(404).render('./baseViews/404');
    }
    res.status(500).render('./baseViews/500');
}

module.exports=errorHandling;