const User = require('../models/userModel');


class userControllers {
  static postNew(req, res) {
    const { name, phone } = req.body;

    const createTest = new User({ name, phone });

    createTest.save().then((doc) => {
      res.status(201).send(doc);
    }).catch((err) => {
      res.status(400).json(err);
    });
  }

}

module.exports = userControllers;
