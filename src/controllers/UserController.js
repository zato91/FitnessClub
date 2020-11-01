const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res){
        try {
            
            const{ email, firstName, lastName, password} = req.body;

            const existentUser = await User.findOne({email});

            if (!existentUser){
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email,
                firstName,
                lastName,
                password:hashedPassword
            });

          return res.json(user)
            } 

            return res.status(400).json({
                message: 'email/user already exist! want to login instead?'
            })
        } catch (error) { 
            throw Error(`Error wile registering a new user : ${error}`)
        }
    }


}