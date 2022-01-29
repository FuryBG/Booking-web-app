const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {type: String, required: true},
    city: {type: String, required: true},
    imgUrl: {type: String, required: true},
    rooms: {type: Number, required: true},
    userBooked: [{type: Schema.Types.ObjectId, ref:"User"}],
    owner: {type: Schema.Types.ObjectId}
});


module.exports = model("Hotel", schema);