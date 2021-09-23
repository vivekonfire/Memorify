const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");

const app = express();

connectDB();

app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/memo", require("./routes/memories"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
