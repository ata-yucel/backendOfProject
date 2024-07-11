const express = require("express");
const ManProduct = require("../models/ManDressModel");
const ManDressRouter = express.Router();

ManDressRouter.post("/addManProduct", async (req, res) => {
  try {
    let newManProduct = req.body;
    let newData = await ManProduct.create(newManProduct);
    res.send({
      status: true,
      data: newData,
      message: "A Man Product Has Been Saved To DataBase !",
    });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});

ManDressRouter.get("/allManProducts", async (req, res) => {
  try {
    const allProduct = await ManProduct.find({});
    res.status(200).send({
      status: true,
      message: "All Products !",
      data: allProduct,
    });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});

ManDressRouter.delete("/deleteManProduct", async (req, res) => {
  try {
    let { id } = req.body;
    const deletedProduct = await ManProduct.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).send({ status: false, message: "Product Could Not Be Deleted!" });
    }

    res.status(200).send({
      status: true,
      message: `Product ${deletedProduct.nameOfProduct} Deleted!`,
      data: deletedProduct,
    });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});

ManDressRouter.post("/findManProduct", async (req, res) => {
  try {
    let { id } = req.body; 
    const product = await ManProduct.findById(id);
    res.status(200).send({
      status: 200,
      message: "Requested Product !",
      data: product,
    });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});


ManDressRouter.put("/updatedManProduct", async (req, res) => {
  try {
    let data = req.body;
    if (!data._id) {
      return res.status(404).send({ status: false, message: "The Product Could Not Be Found!" });
    }
    await ManProduct.findByIdAndUpdate(data._id, data);
    res.status(200).send({ status: true, message: "Product Updated!" });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});

module.exports = ManDressRouter;
