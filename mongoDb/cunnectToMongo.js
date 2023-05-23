const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbUrl = "mongodb://127.0.0.1/expressAppDb";
const connect = async () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", () => {
        console.log("could not connect");
    });
    db.once("open", () => {
        console.log("> Successfully connected to database");
    });
};
module.exports = { connect };