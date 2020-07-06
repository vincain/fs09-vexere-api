const express = require('express')
const mongoose = require('mongoose')
const config = require("./config")

console.log(config)

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then(() => console.log("DB Connected!"))
.catch(console.log)

const app = express();

app.use("/uploads", express.static("./uploads"))

app.use(express.json());
app.use("/api/stations", require("./routers/api/controllers/stations"))
app.use("/api/trips", require("./routers/api/controllers/trips"))
app.use("/api/users", require("./routers/api/controllers/users"))
app.use("/api/tickets", require("./routers/api/controllers/tickets"))

// const port = 5000;
const port = process.env.PORT || config.port

app.listen(port, () =>{
    console.log(`App running on port ${port}`)
})