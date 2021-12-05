const Encrpyt = require("../helpers/Encrpyt");
const Validator = require("../helpers/Validator");
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const jwt = require('jsonwebtoken');
const { Op  } = require("sequelize");

class UserController {
     
    async login(req, res){
        try{
            Validator.validateString(req.body.login, [0, 255], "login");
            Validator.validateString(req.body.password, [0, 255], "password");

            let user = await User.findAll({
                where: {
                    [Op.or]: [
                      { username:  req.body.login},
                      { email: req.body.login}
                    ]
                },
                include: [
                    {model: Playlist, as: "playlist", attributes: ['id']}
                ],
                nest: true
            });
            
            user = user.map((team) => team.get({ plain: true }));

            if(user.length == 1){ 
                user = user[0];
                user.playlist = user.playlist.map(x => x.id);
                if(await Encrpyt.compare(req.body.password, user.password)){
                    const token = jwt.sign(user, process.env.SECRET, {expiresIn: "24h"});
                    return res.json({status: 1, token: token});
                }
                throw { message: `password incorrect`, status: -1, code: 400 }
            } 
            
            throw { message: `login doesn't exist`, status: -1, code: 400 };
            
        }catch(error){
            console.error(error);
            return res.status(500).json(error);
        }
    }

    async signup(req, res){
        try{
            Validator.validateString(req.body.name, [0, 255], "name");
            Validator.validateString(req.body.icon, [0, 255], "icon");
            Validator.validateString(req.body.username, [0, 255], "username");
            Validator.validateString(req.body.password, [0, 255], "password");
            Validator.validateString(req.body.email, [0, 255], "email");
            Validator.validateNumber(req.body.age, [0, 110], "age");
            Validator.validateDate(req.body.birthdate, "birthdate");
            
            req.body.status = "activated";
            req.body.password = await Encrpyt.encrypt(req.body.password);

            const user = await User.create(req.body);
            return res.json({status: 1, user});
        }catch(error){
            return res.status(500).json(error);
        }
    }
}

module.exports = new UserController();