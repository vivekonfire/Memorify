const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

connectDB();

app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/memo", require("./routes/memories"));

const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
