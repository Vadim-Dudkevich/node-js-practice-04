const asyncHandler = require('express-async-handler');
const driverModel = require('../models/driversModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  // Save user to data base/

  register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(400);
      throw new Error('Registration error');
    }
    const candidate = await driverModel.findOne({ email });
    if (candidate) {
      res.status(400);
      throw new Error('Driver allready exists');
    }

    const hashPassword = bcrypt.hashSync(password, 5);

    const driver = await driverModel.create({
      ...req.body,
      password: hashPassword,
    });
    if (driver) {
      res.status(201).json(driver);
    }
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(400);
      throw new Error('Login or password is required');
    }

    const user = await driverModel.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error('Driver not found');
    }

    // console.log(user);

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      res.status(409);
      throw new Error('Login or password is wrong');
    }

    const token = this.generationToken(user._id);
    user.token = token;
    await user.save();
    res.status(200).json({ user });
  });

  logout = asyncHandler(async (req, res) => {
    res.send('logout');
  });

  generationToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
  };
}

module.exports = new AuthController();
