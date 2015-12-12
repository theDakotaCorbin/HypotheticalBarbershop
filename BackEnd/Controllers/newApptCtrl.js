var Appt = require('../Models/newApptModel.js');
module.exports = {
  createNewAppt: function(req, res) {
    var newAppt = new Appt(req.body);
    newAppt.save(function(err, appt) {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
      return res.json(appt);
    });
  },

  getAppt: function(req, res) {
    Appt.find({}).populate('barber', 'name')
      .exec(function(err, appts) {
        if (err) {
          console.log(err)
          return res.status(500).send(err);
        }
        return res.json(appts);
      })
  },

  deleteAppt: function(req, res) {
    Appt.findByIdAndRemove(req.params.id, function(err, result) {
      console.log(err);
      if (err) return res.status(500).send(err);
      return res.status(200).json(result);
    });
  }

}