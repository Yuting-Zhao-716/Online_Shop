function dataFlushing(req,data,action){
    req.session.inputData=data;
    req.session.save(action);
}

function dataRetrieving(req){
    const inputData=req.session.inputData;
    req.session.inputData=null;
    return inputData;
}

module.exports={
    dataRetrieving:dataRetrieving,
    dataFlushing:dataFlushing
}