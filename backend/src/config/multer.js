const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const storageTypes = {
     local: multer.diskStorage({
          destination: (req, file, cb) => {
               let path = `./tmp/${file.fieldname}`;    
               cb(null, path);
          },
          filename: (req, file, cb) => {
               crypto.randomBytes(16, (err) => {
                    if (err) cb(err);
                    file.key = `${Date.now()}-${file.originalname}`;
                    cb(null, file.key);
               });
          }
     })
};

module.exports = {
     dest: path.resolve("..", "..","tmp"),
     storage: storageTypes[process.env.STORAGE_TYPE],
     limits: {
     fileSize: 12 * 1024 * 1024
     },
     fileFilter: (req, file, cb) => {
          const allowedMimes = [
               "image/jpeg",
               "image/pjpeg",
          ];
          if (allowedMimes.includes(file.mimetype)) {
               cb(null, true);
          } else {
               cb(new Error(`File mime wrong!`));
          }
     }
}