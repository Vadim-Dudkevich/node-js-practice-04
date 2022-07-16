const driverModel = require('../models/driversModel');

const asyncHandler = require('express-async-handler');

class DriversController {
  save = asyncHandler(async (req, res) => {
    console.log(req.user.id);
    const isExists = await driverModel.findOne({
      email: req.body.email,
    });

    if (isExists) {
      res.status(400).json({
        message: 'Driver ready exist',
        code: 400,
      });
      throw new Error('Driver ready exist');
    }

    const driver = await driverModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      points: req.body.points,
    });

    await driver.save();

    res.status(201).json({
      message: 'OK',
      code: 201,
      data: driver,
    });
  });

  getAll = asyncHandler(async (req, res) => {
    const drivers = await driverModel.find({});
    if (!drivers) {
      res.status(400).json({
        message: 'Bad request',
        code: 400,
      });
      throw new Error('Bad drivers request');
    }
    res.status(200).json({
      message: 'OK',
      code: 200,
      data: drivers,
      qty: drivers.length,
    });
  });

  getOne(req, res) {
    res.send('get one');
  }

  update(req, res) {
    res.send('update');
  }

  remove(req, res) {
    res.send('remove');
  }
}

module.exports = new DriversController();
