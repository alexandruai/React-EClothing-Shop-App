const User = require('../models/user')

// functia este exportata ca variabila createOrUpdateUser
exports.createOrUpdateUser = async (req, res) => {
  const {name, picture, email} = req.user;

  const user = await User.findOneAndUpdate({email: email}, {name: name, picture:picture}, {new: true});

  if(user) {
    res.json(user);
    console.log('userul a fost updatat', user);
  } else {
    const newUser = await new User ({
      email,
      name,
      picture
    }).save();
    console.log('userul a fost creat', user);
    res.json(newUser);
  }
};