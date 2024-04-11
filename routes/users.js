const express = require("express");
const route = express.Router();
const Progres = require('../Controllers/Users/index')



//tampil data users
route.get("/", Progres.allData);

// Signup
route.post("/signup", Progres.signUp);

// Login
route.post("/login", Progres.login);

// delete user
route.delete("/:id", Progres.deleteUser);

// Logout
route.delete("/logout/:id", Progres.logOut);

module.exports = route;
