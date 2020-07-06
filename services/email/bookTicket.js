const nodemailer = require("nodemailer")
const fs = require("fs") // built-in NodeJS (NodeAPI)
const hogan = require("hogan.js")

const template = fs.readFileSync("services/email/bookingTicketEmailTemplate.hjs", "utf-8")
const compliedTemplate = hogan.compile(template)

module.exports.sendBookTicketEmail = (user, trip, ticket) => {
    const transport = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        requireSSL: true,
        auth: {
            user: "betterlife178@gmail.com",
            pass: "1hai3bon5"
        }
    }

    const transporter = nodemailer.createTransport(transport)

    const mailOptions = {
        from: "betterlife178@gmail.com",
        to: "quangbui@betterlifejp.com",
        subject: "Mail xac nhan mua ve thanh cong",
        html: compliedTemplate.render({
            name: user.fullname,
            email: user.email,
            fromStation: trip.fromStation.name,
            toStation: trip.toStation.name,
            price: trip.price,
            amount: ticket.seats.length,
            total: ticket.totalPrice,
            seatCodes: ticket.seats.map(m => m.code).join(", ")
        })
    }

    transporter.sendMail(mailOptions, err => {
        if(err) return console.log(err)
        console.log("Send email successfully!")
    })
}