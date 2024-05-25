const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  servicesCount,
  serviceStar,
  listRelated,
  searchFilters,
} = require("../controllers/service");

// routes
router.post("/service", authCheck, adminCheck, create);
router.get("/services/total", servicesCount);

router.get("/services/:count", listAll); // services/100
router.delete("/service/:id", authCheck, adminCheck, remove);
router.get("/service/:id", read);
router.put("/service/:id", authCheck, adminCheck, update);

router.post("/services", list);
// rating
router.put("/service/star/:serviceId", authCheck, serviceStar);
// related
router.get("/service/related/:serviceId", listRelated);
// search
router.post("/search/services", searchFilters);

module.exports = router;