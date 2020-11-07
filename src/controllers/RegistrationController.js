const Registration = require("../models/Registration");


module.exports = {
    async create(req,res){
        const {user_id} = req.headers;
        const {eventId} = req.params;
        const {date} = req.body;

        const registration = await Registration.create({
            user: user_id,
            event: eventId,
            date
        })

        return res.json(registration)
    }
}