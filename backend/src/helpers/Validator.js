const REGEX_DATA = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
const REGEX_DT = /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))( (?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$)/;

class Validator{

    static validateNumber(number, range = false, text = "number") {
        if(range){
            if(range.length != 2){
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

       
        if(!string || typeof string != 'string' || string.length == 0 || /^\s*$/.test(string)){
            throw { status: -1, code: 400, message: `${text} invalid` };
        }
    }

    static validateDatetime(datetime, text = 'datetime') {
        if (typeof datetime != 'string') throw { message: `${text} must be string`, status: -1, code: 400 };
        if (!REGEX_DT.test(datetime)) throw { message: `${text} invalid, must be in format: YYYY-MM-DD hh:mm:ss`, status: -1, code: 400 };
    }
      
    static validateDate(data, text = 'data') {
    if (typeof data != 'string') throw { message: `${text} must be string`, status: -1, code: 400 };
    if (!REGEX_DATA.test(data)) throw { message: `${text} invalid, must be in format: YYYY-MM-DD`, status: -1, code: 400 };
    }
}

module.exports = Validator;