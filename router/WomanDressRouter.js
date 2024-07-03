const express = require("express")
const WomanProduct = require("../models/WomanDressModel")
const WomanProductRouter = express.Router()

WomanProductRouter.post("/addWomanProduct", async(req,res) => {
  try {
    let newWomanProduct = req.body
    let newData = await WomanProduct.create(newWomanProduct)
    res.send(
      {
        status:true,
        data :  newData,
        message : "A Woman Product Has Been Saved To DataBase !"
      }
    )
  } catch (error) {
    res.status(404).send({status: false, message: error.message})
  }
})
WomanProductRouter.get("/allWomanProducts", async(req,res) => {
  try {
    const allProduct = await WomanProduct.find({})
    res.status(200).send({
      status: true, 
      message: "All Products !", 
      data: allProduct
    })
  } catch (error) {
    res.status(404).send({status: false, message: error.message})
  }
})


WomanProductRouter.delete("/deleteWomanProduct", async (req, res) => {
  try {
    let { id } = req.body;
    const deletedProduct = await WomanProduct.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).send({ status: false, message: 'Product Could Not Be Deleted!' });
    }
    
    res.status(200).send({
      status: true,
      message: `Product ${deletedProduct.nameOfProduct} Deleted!`,
      data: deletedProduct
    });
  } catch (error) {
    res.status(404).send({ status: false, message: error.message });
  }
});

WomanProductRouter.get('/findWomanProduct', async(req,res) => {
 try {
   let {id} = req.body
   const product = await WomanProduct.findById(id)
   res.status(200).send({
    status: 200, 
    message: 'Requested Product !', 
    data: product
  })
 } catch (error) {
   res.status(404).send({status: false, message: error.message})
 }
})

 WomanProductRouter.put("/updatedWomanProduct", async(req,res) => {
  try {
    let data = req.body
    if(!data._id){
      return res.status(404).send({status: false, message: "The Product Could Not Be Found!"})
    }
    await WomanProduct.findByIdAndUpdate(data._id, data)
    res.status(200).send({status: true, message: 'Product Updated!'})
  } catch (error) {
    res.status(404).send({status: false, message: error.message})
  }
 })


module.exports = WomanProductRouter