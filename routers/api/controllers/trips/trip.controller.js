const {
    Trip
} = require("../../../../models/Trip");
const {
    Seat
} = require("../../../../models/Seat");

const _ = require("lodash");

const codeArray = [
    "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12",
    "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12",
]

//getList
const getTrips = (req, res, next) => {
    // Hiển thị thêm availableSeats
    // (số lượng ghế trống)

    Trip.find()
        // .select("-seats")
        .then(trips => {
            const _trips = trips.map(trip => {
                // modifiedTrip = {
                //     ...trip._doc,
                //     availableSeats: trip.seats.filter(seat => !seat.isBooked).length
                // }
                // delete modifiedTrip.seats;
                // return modifiedTrip;
                // return {
                //     ..._.omit(trip._doc,["seats"]),
                //     availableSeats: trip.seats.filter(seat => !seat.isBooked).length
                // }
                // return _.assign {
                //     _.omit(trip._doc,["seats"]),
                //     {availableSeats: trip.seats.filter(seat => !seat.isBooked).length}
                // }
                return _.chain(trip)
                .get("_doc")
                .omit(["seats"])
                .assign({availableSeats: trip.seats.filter(seat => !seat.isBooked).length})
                .value()
            })

            res.status(200).json(_trips)
        })
        .catch(err => res.json(err))
}

//getDetail
const getTripById = (req, res, next) => {
    const {
        id
    } = req.params
    Trip.findById(id)
        .then(trips => {
            res.status(200).json(trips)
        })
        .catch(err => res.json(err))
}

//add
const postTrips = async (req, res, next) => {
    const {
        fromStation,
        toStation,
        startTime,
        price
    } = req.body;
    const seats = codeArray.map(code => {
        return new Seat({
            code
        })
    })

    try {
        const newTrip = new Trip({
            fromStation,
            toStation,
            startTime,
            price,
            seats
        })
        await newTrip.save();
        res.status(200).send(newTrip)
    } catch (err) {
        res.send(err)
    }
}

//update
const patchTripById = (req, res, next) => {
    const {id} = req.params;
    Trip.findById(id)
    .then(trip => {
        if(!trip) return Promise.reject({
            status: 404,
            message: "Trip not found"
        })

        // const seats = codeArray.map(code => {
        //     return new Seat({
        //         code
        //     })
        // })

        const keys = ["fromStation", "toStation", "startTime", "price"]
        keys.forEach(key => {
            trip[key] = req.body[key] ? req.body[key] : trip[key];
            // req.body[key].seats.forEach(code => {
            //     isBooked[code] = req.body[key].seats[code].isBooked ? req.body[key].seats[code].isBooked : false;
            // })
        })

        return trip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.json(err))
}

//delete
const deleteTripById = (req, res, next) => {
    Trip.findByIdAndDelete(req.params.id)
        .then(trip => res.status(200).json(trip))
        .catch(err => res.json(err))
}

module.exports = {
    getTrips,
    getTripById,
    postTrips,
    patchTripById,
    deleteTripById
}