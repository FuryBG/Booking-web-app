const Hotel = require("../models/Hotel");


async function getAll() {
    const allItems = await Hotel.find({}).sort({rooms: -1});
    return allItems;
};

async function create(data) {
    const newItem = new Hotel(data);
    await newItem.save();
    return newItem;
};

async function getById(id) {
    const currItem = await Hotel.findById(id);
    return currItem;
};

async function getByName(name) {
    const currItem = await Hotel.find({name: name});
    return currItem;
};

async function edit(hotelId, data) {
    let oldHotelData = await Hotel.findById(hotelId);
    let newItem = Object.assign(oldHotelData, data);
    await newItem.save();
    return newItem;
};

async function del(id) {
    await Hotel.findOneAndDelete({_id: id});
};



module.exports = {
    getAll,
    getById,
    create,
    edit,
    del,
    getByName
};