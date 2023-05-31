const User = require('../models/user')

// functia este exportata ca variabila createOrUpdateUser
exports.createOrUpdateUser = async (req, res) => {
  const {name, picture, email} = req.user;

  const user = await User.findOneAndUpdate(
    {email: email}, 
    {name: user.email.split("@")[0], picture:picture},
    {new: true});

  if(user) {
    res.json(user);
    console.log('userul a fost updatat', user);
  } else {
    const newUser = await new User ({
      email,
      name: user.email.split("@")[0],
      picture
    }).save();
    console.log('userul a fost creat', user);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
