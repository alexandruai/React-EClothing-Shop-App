const Service = require("../models/service");
const User = require("../models/user");

exports.create = async (req, res) => {
  try {
    const newService = await new Service(req.body).save();
    console.log({
        "name": "Spalat masica",
        "description": "Spalat masina",
        "price": 50,
        "duration": "1 hour",
        "category": "Servicii Auto",
        "ratings": 4,
        "image": ""
    })
    res.json(newService);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let services = await Service.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(services);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndRemove(req.params.id).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Service delete failed");
  }
};

exports.read = async (req, res) => {
  const service = await Service.findById(req.params.id)
    .populate("category")
    .exec();
  res.json(service);
};

exports.update = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("SERVICE UPDATE ERROR ----> ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.servicesCount = async (req, res) => {
  let total = await Service.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.serviceStar = async (req, res) => {
  const service = await Service.findById(req.params.serviceId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  let existingRatingObject = service.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  if (existingRatingObject === undefined) {
    let ratingAdded = await Service.findByIdAndUpdate(
      service._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Service.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    res.json(ratingUpdated);
  }
};

// WITH PAGINATION
exports.list = async (req, res) => {
    // console.table(req.body);
    try {
      // createdAt/updatedAt, desc/asc, 3
      const { sort, order, page } = req.body;
      const currentPage = page || 1;
      const perPage = 3; // 3
  
      const services = await Service.find({})
        .skip((currentPage - 1) * perPage)
        .populate("category")
        .populate("subs")
        .sort([[sort, order]])
        .limit(perPage)
        .exec();
  
      res.json(services);
    } catch (err) {
      console.log(err);
    }
  };

exports.listRelated = async (req, res) => {
  const service = await Service.findById(req.params.serviceId).exec();

  const related = await Service.find({
    _id: { $ne: service._id },
    category: service.category,
  })
    .limit(3)
    .populate("category")
    .exec();

  res.json(related);
};

// SEARCH / FILTER

const handleQuery = async (req, res, query) => {
  const services = await Service.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .exec();
  res.json(services);
};

const handlePrice = async (req, res, price) => {
  try {
    let services = await Service.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .exec();
    res.json(services);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let services = await Service.find({ category })
      .populate("category", "_id name")
      .exec();
    res.json(services);
  } catch (err) {
    console.log(err);
  }
};

const handleStar = (req, res, stars) => {
  Service.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Service.find({ _id: aggregates })
        .populate("category", "_id name")
        .exec((err, services) => {
          if (err) console.log("SERVICE AGGREGATE ERROR", err);
          res.json(services);
        });
    });
};

const handleSub = async (req, res, sub) => {
  const services = await Service.find({ subs: sub })
    .populate("category", "_id name")
    .exec();
  res.json(services);
};

const handleShipping = async (req, res, shipping) => {
  const services = await Service.find({ shipping })
    .populate("category", "_id name")
    .exec();
  res.json(services);
};

const handleColor = async (req, res, color) => {
  const services = await Service.find({ color })
    .populate("category", "_id name")
    .exec();
  res.json(services);
};

const handleBrand = async (req, res, brand) => {
  const services = await Service.find({ brand })
    .populate("category", "_id name")
    .exec();
  res.json(services);
};

exports.searchFilters = async (req, res) => {
  const {
    query,
    price,
    category,
    stars,
    sub,
    shipping,
    color,
    brand,
  } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (stars) {
    await handleStar(req, res, stars);
  }

  if (sub) {
    await handleSub(req, res, sub);
  }

  if (shipping) {
    await handleShipping(req, res, shipping);
  }

  if (color) {
    await handleColor(req, res, color);
  }

  if (brand) {
    await handleBrand(req, res, brand);
  }
};