const router = require("express").Router();


router.get("/", async(req, res) => {
    res.render("home.hbs");
});

router.get("/create", (req, res) => {
    res.render("create.hbs");
});

router.post("/create", async(req, res) => {
    console.log(req.body);
    res.redirect("/create");
});





module.exports = router;