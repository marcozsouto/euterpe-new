class Validator{

    static validateNumber(number, range = false, text = "number") {
        if(range){
            if(range.length !== 2){
                throw { status: -1, code: 400, message: `Range invalid` };
            }
            if(!Number.isInteger(range[0]) || isNaN(range[0]) || !Number.isInteger(range[1]) || isNaN(range[1])){
                throw { status: -1, code: 400, message: 'Range invalid' };
            }
        }

        if (number < range[0] || isNaN(number) || number > range[1] || !Number.isInteger(number)) {
            throw { status: -1, code: 400, message: `${text} invalid` };
        }
    }

    static validateString(string, size = false, text = "string") {
        if(!string) throw { status: -1, code: 400, message: `${text} invalid` }
        
        if(size || size.length == 2){
            if(string.length > size[1] || string.length < size[0] ) throw { status: -1, code: 400, message: `${text} with invalid size` };
        }

       
        if(!string || typeof string !== 'string' || string.length == 0 || /^\s*$/.test(string)){
            throw { status: -1, code: 400, message: `${text} invalid` };
        }
    }
}

module.exports = Validator;