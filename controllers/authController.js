const { COOKIE_NAME } = require("../config");

const router = require("express").Router();


    router.get("/register", (req, res) => {
        res.render("register.hbs");
    });

    router.get("/user/:id", async(req, res) => {
        let currUser = await req.auth.getUserById(req.user._id);
        currUser.booked = currUser.booked.map(element => {
            return element.name + " " + element.city
        });
        currUser.booked = currUser.booked.join(", ");
        res.render("profile.hbs", currUser);
    });

    router.post("/register", async(req, res) => {
        try{

            if(req.body.username == "" || req.body.email == "" || req.body.password == "" || req.body.rePass == "") {
                throw new Error("All fields are required!");
            }
            if(req.body.password != req.body.rePass) {
                throw new Error("Passwords must match!");
            }

            await req.auth.register(req.body.email, req.body.username, req.body.password);
            res.redirect("/");
        res.redirect("/");
        }catch(err) {
            console.log(err);
            res.render("register.hbs", {errors: err.message.split("\n")});
        }
    });

    router.get("/login", (req, res) => {
        res.render("login.hbs");
    });

    router.post("/login", async(req, res) => {
        try {
            await req.auth.login(req.body.username, req.body.password);
            res.redirect("/");
        }catch(err) {
        res.render("login.hbs", {errors: err.message.split("\n")});
        }
    });

    router.get("/logout", (req, res) => {
        res.clearCookie(COOKIE_NAME);
        res.redirect("/");
    });


module.exports = router;