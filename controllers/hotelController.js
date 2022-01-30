const router = require("express").Router();


router.get("/", async(req, res) => {
    res.render("home.hbs");
});

router.get("/create", (req, res) => {
    res.render("create.hbs");
});

router.post("/create", async(req, res) => {

    try {
        if(req.body.name == "" || req.body.city == "" || req.body.imgUrl == "") {
            throw new Error("All fields are required!");
        }
        if(!req.body.imgUrl.startsWith("http://") || !req.body.imgUrl.startsWith("https://")) {
        throw new Error("Image URL must be valid!");
        };

        if(req.rooms < 1 || req.rooms > 100) {
            throw new Error("Rooms must be between 1 and 100");
        }

        req.body.owner = req.user._id;

        await req.storage.createItem(req.body);
        res.redirect("/");
    }catch(err) {
        console.log(err.message);
        res.render("create.hbs", {errors: err.message.split("\n")});
    }
});





module.exports = router;