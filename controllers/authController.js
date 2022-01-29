const router = require("express").Router();


    router.get("/register", (req, res) => {
        res.render("register.hbs");
    });

    router.post("/register", async(req, res) => {
        try{
            await req.auth.register(req.body.email, req.body.password);
        res.redirect("/");
        }catch(err) {
            console.log(err);
            res.redirect("/auth/register");
        }
    });

    router.get("/login", (req, res) => {
        res.render("login.hbs");
    });

    router.post("/login", (req, res) => {
        res.render("login.hbs");
    });


module.exports = router;