const mongoose = require("mongoose");

const MemorySchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    desc: String,
    meter: {
        type: Number,
        min: 1,
        max: 10,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    photo: Object,
});

module.exports = mongoose.model("Memory", MemorySchema);
