const bcrypt = require('bcrypt')
const User = require('../models/User');


module.exports = {
    async store(req,res){

        try {
            const {email, password} = req.body;

            if(!email || !password){
                return res.status(200).json({message: 'Required field missing!'})
            }

            const user  = await User.findOne({email});
            if(!user){
                return res.status(200).json({message: "User not found! Do you want to register ?"})
            }

            if (user && await bcrypt.compare(password, user.password)){
                const UserResponse= {
                    _id:user._id,
                    email: user.email,

                }
                return res.json(UserResponse)
            }else {
                return res.status(200).json({ message: "Email or Password does not match!"})
            }
            
        } catch (error) {
            throw Error(`Error while Authenticating a User ${error}`)
        }
    }


}