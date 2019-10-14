const Booking = require('../models/Booking')
const Spot = require('../models/Spot')

module.exports = {
    async store(req, res){
        const { user_id } = req.headers
        const { spot_id } = req.params
        const { date } = req.body

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        })
        // Mostra todos os dados de spot e user
        await booking.populate('spot').populate('user').execPopulate()

        const ownerSocket = req.connectedUsers[booking.spot.user]

        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking)
        }

        return res.json(booking)
    },

    async show(req, res){
        const { user_id } = req.params

        const bookings = await Booking.find({ user: user_id}).populate('spot')
        
        return res.json(bookings)
    },

    async showByOwner(req, res){
        const { user_id } = req.params

        const bookings = await Booking.find({ user: user_id}).populate('spot')
        
        return res.json(bookings)
    },

    async remove(req, res){
        const { book_id } = req.params

        await Booking.find({ _id : book_id}).deleteOne()

        return res.json({'foi' : true})
    }
}