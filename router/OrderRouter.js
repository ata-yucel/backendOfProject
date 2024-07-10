const express = require("express");
const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const OrderRouter = express.Router();

OrderRouter.post("/create", async (req, res) => {
  try {
    const { username, products, totalPrice, address } = req.body;

    if (!username || !products || !totalPrice || !address) {
      return res.status(400).send({ status: false, message: 'All fields are required!' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ status: false, message: 'User not found!' });
    }

    if (user.balance < totalPrice) {
      return res.status(400).send({ status: false, message: 'Insufficient balance!' });
    }

    user.balance -= totalPrice;
    await user.save();

    const newOrder = new Order({
      username,
      products,
      totalPrice,
      address
    });

    await newOrder.save();
    res.status(200).send({ status: true, message: 'Order created successfully!', newBalance: user.balance });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
});

OrderRouter.get("/user-orders", async (req, res) => {
  try {
    const { username } = req.query;

    if (!username) {
      return res.status(400).send({ status: false, message: 'Username is required!' });
    }

    const orders = await Order.find({ username });

    res.status(200).send({ status: true, orders });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
});

module.exports = OrderRouter;
