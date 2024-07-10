const express = require("express");
const ManProduct = require("../models/ManDressModel");
const WomanProduct = require("../models/WomanDressModel");
const GeneralProductRouter = express.Router();

GeneralProductRouter.get('/product/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        let product = await ManProduct.findById(productId);
        if (!product) {
            product = await WomanProduct.findById(productId);
        }

        if (!product) {
            return res.status(404).send({ status: false, message: 'Product not found!' });
        }

        res.status(200).send({
            status: true,
            message: 'Product found!',
            data: product
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
});

module.exports = GeneralProductRouter;
