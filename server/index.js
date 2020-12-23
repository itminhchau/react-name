require("dotenv").config();

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

mongoose.connection.on("error", (err) => {
    console.log("Connect to MongoDB Error!");
});

mongoose.connection.once("open", () => {
    console.log(`Connected to MongoDB`);
});

require("./src/model/User");

const app = require("./src/app");

const port = process.env.PORT;

app.listen(port, () =>
    console.log(`Server running on port ${port}`)
);