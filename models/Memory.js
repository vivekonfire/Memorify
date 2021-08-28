const mongoose = require('mongoose');

const MemorySchema = mongoose.Schema({
    title:String,
    desc: String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    meter:{
        type:Number,
        min:1,
        max:10
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Memory',MemorySchema);