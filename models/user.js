const db = require('../database/database');
const bcrypt = require('bcryptjs');

class User {
    constructor(email, password, name, phone, address, postal, city) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.postal = postal;
        this.city = city;
    }

    async save() {
        const psw = await bcrypt.hash(this.password, 6);

        db.getDb().collection('users').insertOne({
            email: this.email,
            password: psw,
            name: this.name,
            phone: this.phone,
            address: this.address,
            postal: this.postal,
            city: this.city
        })
    }
    static async hasUserInDB(emailInput){
        return await db.getDb().collection('users').findOne({email: emailInput});
    }
}

module.exports = User;