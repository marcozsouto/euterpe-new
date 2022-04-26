const fs = require('fs');

class FileReader{

    static filesAt(name) {
        return new Promise((resolve, reject)=> {
            fs.readdir(name, function name(err, filenames) {
                if (err) reject({status: -1, code: 400, message: `erro read folder`});
                resolve(filenames);
            });
        });
    }

    static remove(files){
        for(var prop in files){
            fs.unlinkSync(files[prop][0].path);
        }
    }
}

module.exports = FileReader;