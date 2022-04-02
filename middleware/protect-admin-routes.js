function protectAdminRoutes(req,res,next){
    if(!res.locals.uid){
        return res.redirect('/401');
    }
    if(!res.locals.isAdmin && (req.path.startsWith('/product-management')||req.path.startsWith('/update-product')||req.path.startsWith('/delete-product'))){
        return res.redirect('/403');
    }
    next();
}

module.exports=protectAdminRoutes;