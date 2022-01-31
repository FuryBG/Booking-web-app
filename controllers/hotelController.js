const { isUser } = require("../middlewares/guards");

const router = require("express").Router();


router.get("/", async(req, res) => {
    const allHotels = await req.storage.getAll();
    res.render("home.hbs", {allHotels: allHotels});
});

router.get("/edit/:id", async(req, res) => {
    let currHotel = await req.storage.getById(req.params.id);
    res.render("edit.hbs", currHotel);
});

router.get("/delete/:id", async(req, res) => {
    await req.storage.deleteItem(req.params.id);
    res.redirect("/");
});

router.post("/edit/:id", async(req, res) => {
    try {
        if(req.body.name == "" || req.body.city == "" || req.body.imgUrl == "") {
            throw new Error("All fields are required!");
        }
        if(!req.body.imgUrl.startsWith("http://") && !req.body.imgUrl.startsWith("https://")) {
        throw new Error("Image URL must be valid!");
        };

        if(req.rooms < 1 || req.rooms > 100) {
            throw new Error("Rooms must be between 1 and 100");
        }

        req.body.owner = req.user._id;

        await req.storage.editItem(req.params.id, req.body);
        res.redirect(`/details/${req.params.id}`);
    }catch(err) {
        console.log(err.message);
        res.render("edit.hbs", {errors: err.message.split("\n")});
    }
});

router.get("/book/:id", async(req, res) => {
    await req.storage.book(req.params.id, req.user._id);
    await req.auth.book(req.user._id, req.params.id);
    res.redirect(`/details/${req.params.id}`);
});

router.get("/details/:id", isUser(), async(req, res) => {
    let currHotel = await req.storage.getById(req.params.id);
    if(currHotel.owner == req.user._id) {
        currHotel.isOwner = true;
    };
    let ifBooked = currHotel.userBooked.find(x => x._id == req.user._id);
    if(ifBooked) {
        currHotel.ifBooked = true;
    }

    res.render("details.hbs", currHotel);
});

router.get("/create", (req, res) => {
    res.render("create.hbs");
});

router.post("/create", async(req, res) => {

    try {
        if(req.body.name == "" || req.body.city == "" || req.body.imgUrl == "") {
            throw new Error("All fields are required!");
        }
        if(!req.body.imgUrl.startsWith("http://") && !req.body.imgUrl.startsWith("https://")) {
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