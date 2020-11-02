const Event = require('../models/Event');
const User = require('../models/Users');


module.exports ={
    async createEvent (req, res){
        const{ title, description, price} = req.body;
        const { userId } = req.headers;
        const {filename} = req.file;
        
        const user_id = await userId.find(userId)

        if(!user){
            return res.status(400).json({ message:"user doest not exit"})
        }

        const event = await Event.create({
            title,
            description,
            price,
            user_id: userId,
            thumbnail: filename


        })
        return res.json(event);

    }
}