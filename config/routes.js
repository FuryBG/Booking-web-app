const authController = require("../controllers/authController");
const hotelController = require("../controllers/hotelController");

module.exports = (app) => {
    app.use("/auth", authController);
    app.use("/", hotelController);
};