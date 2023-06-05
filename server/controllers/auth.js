const User = require('../models/user')

// functia este exportata ca variabila createOrUpdateUser
exports.createOrUpdateUser = async (req, res) => {
  try {
    const {picture, email} = req.user;

    const user = await User.findOneAndUpdate(
      {email: email}, 
      {name: email.split("@")[0], picture:picture},
      {new: true});
  console.log('Uite ce am gasit:', user);
    if(user) {
      res.json(user);
      console.log('userul a fost updatat', user);
    } else {
      console.log('se creeaza noul user');
      const newUser = await new User ({
        email,
        name: email.split("@")[0],
        picture
      }).save();
      console.log('userul a fost creat', newUser);
      res.json(newUser);
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
