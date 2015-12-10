var User = require('../Models/userModel.js');
module.exports = {
  createNewUser: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      return res.json(user);
    });
  },

  getUser: function(req, res) {
    User.find({'userName':req.body.userName, 'password':req.body.password}, function(err, users) {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      return res.json(users);
    })
  },

    getAllBarbers: function(req, res) {
    User.find({}, 'name', function(err, users) {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      return res.json(users);
    })
  }
};
