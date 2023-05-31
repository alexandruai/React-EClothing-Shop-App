// ca sa poti folosi express trebuie sa il importi
const express = require("express");

const router = express.Router();

// import middlewear
const {authCheck, adminCheck} = require('../middlewares/auth');

// trebuie importata cu destruct {}, altfel nu se importa bine
// controller
const {createOrUpdateUser, currentUser} = require("../controllers/auth");

// ruta definita
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;