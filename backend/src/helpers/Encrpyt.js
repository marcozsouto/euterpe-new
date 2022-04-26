const bcrypt = require("bcrypt");

class Encrpyt{

    static async encrypt(value) {
        return await new Promise(async (resolve)=>{
            const salt = await bcrypt.genSalt(10);
            value = await bcrypt.hash(value, salt);
            resolve(value);
        });
    }
    static async compare(first, second) {
        return await new Promise(async (resolve)=>{
            const validPassword = await bcrypt.compare(first, second);
            resolve(validPassword);
        });
    }
}

module.exports = Encrpyt;