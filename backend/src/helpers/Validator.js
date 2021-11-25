class Validator{

    static validateNumber(number, range = false, text = "number") {
        if(range){
            if(range.length != 2){
                throw { status: -1, code: 400, mensagem: `Range invalid` };
            }
            if(!Number.isInteger(range[0]) || isNaN(range[0]) || !Number.isInteger(range[1]) || isNaN(range[1])){
                throw { status: -1, code: 400, mensagem: 'Range invalid' };
            }
        }

        if (number < range[0] || isNaN(number) || number < range[1] || !Number.isInteger(number)) {
            throw { status: -1, code: 400, mensagem: `${text} invalid` };
        }
    }
}

module.exports = Validator;