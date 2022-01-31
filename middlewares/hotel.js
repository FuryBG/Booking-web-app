const hotelService = require("../services/hotel");

module.exports = () => {
    return (req, res, next) => {

        req.storage = {
            getAll: hotelService.getAll,
            getById: hotelService.getById,
            createItem,
            deleteItem,
            editItem: hotelService.edit,
            book: hotelService.book
        };

        next();
    };

    async function createItem(data) {
        const existing = await hotelService.getByName(data.name);

        if(existing.length > 0) {
            console.log("Hotel name is taken!");
            throw new Error("Hotel with that name exsisting!");
        }
        const newItem = await hotelService.create(data);
        return newItem;
    };

    async function deleteItem(id) {
        const existing = await hotelService.getById(id);

        if(!existing) {
            console.log("This item is not available");
            throw new Error("Item is no longer in database!");
        }
        await hotelService.del(id);
    };

};