const moongose = require("mongoose");
moongose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        return console.log("Connected To Database");
    })
    .catch((err) => {
        return console.log("Unable to Connect To Database try Again because", err.message);
    });