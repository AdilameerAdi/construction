const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(" Database Connected Successfully!"))
    .catch((err) => console.log(" Error Connecting Database: " + err));
