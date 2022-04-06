const db = require('../database/database');
const mongodb = require('mongodb');

class Category{
    constructor(brand, model, generation,_id) {
        this.brand=brand;
        this.model=model;
        this.generation=generation;
        this._id=_id;
    }
    async save(){
        /* saving the category */
        if(!this._id){
            const data={
                brand:this.brand,
                model:this.model,
                generation:this.generation
            }
            await db.getDb().collection('categories').insertOne(data);
        }
        /* updating the category */
        else{
            const id=new mongodb.ObjectId(this._id);
            await db.getDb().collection('categories').updateOne({_id:id},{$set:{brand:this.brand,model:this.model,
                    generation: this.generation}});
        }
    }

    static async findModelByBrand(brand){
        const records= await db.getDb().collection('categories').find({brand:brand}).toArray();
        const allModels=[];
        for(const record in records){
            if(!allModels.includes(record.model)){
                allModels.push(record.model);
            }
        }
        console.log(allModels);
        return allModels;
    }

    static async  findGenerationByModel(model){
        const records= await db.getDb().collection('categories').find({model:model}).toArray();
        const allGenerations=[];
        for(const record in records){
            if(!allGenerations.includes(record.generation)){
                allGenerations.push(record.generation);
            }
        }
        console.log(allGenerations);
        return allGenerations;
    }

    static  async findAllRecords(){
        const records= await db.getDb().collection('categories').find().toArray();
        return records.map(function (record){
            return new Category(record.brand,record.model,record.generation,record._id);
        })
    }
    static async delete(categoryId){
        let _id;
        try {
            _id = new mongodb.ObjectId(categoryId);
        }
        catch (e) {
            e.code=404;
            throw e;
            return;
        }

        await db.getDb().collection('categories').deleteOne({_id:_id});
    }
}
module.exports=Category;