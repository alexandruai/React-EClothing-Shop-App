// ca sa poti folosi express trebuie sa il importi
const express = require("express");

const router = express.Router();

// import middlewear
const {authCheck} = require('../middlewares/auth');

// trebuie importata cu destruct {}, altfel nu se importa bine
// controller
const {createOrUpdateUser} = require("../controllers/auth");

// ruta definita
router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;