import { Router } from "express";
import { productsMongo } from "../db/managers/products.manager.js";



const router =Router() ;




router.get('/aggregation', async (req,res)=>{
    const response = await productsMongo.aggregationMet()
    res.json({response})
})



router.get('/', async (req, res)=>{
    try {
        
        const products  = await productsMongo.findAll(req.query)
        
        res.status(200).json({message:"Products", products})
        
    } catch (error) {
        
        res.status(500).json({error})
    }
})


//get
router.get('/:id', async (req, res)=>{
    const productId= req.params.id    
    try {
        //const product= await productManager.getProductById(+productId)
        const product = await productsMongo.findById(productId)
        res.status(200).json({message:"product found", product})
    } catch (error) {
        res.status(500).json({error})
    }
})

//post
router.post('/', async (req, res)=>{
    const {product_title, product_description, product_price, product_code, product_stock, product_category, product_thumbnail}=req.body
    if(!product_title|| !product_description|| !product_price|| !product_code|| !product_stock|| !product_category|| !product_thumbnail){
    return  res.status("complete all fields")
    }
    try {
        //const newProduct= await productManager.addProduct(req.body)
        const newProduct = await productsMongo.createOne(req.body)
        res.status(200).json({message:"Product created", user: newProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})
//delete
router.delete('/:id', async (req, res)=>{
    const productId= req.params.id;
    try {
        //const response = await productManager.deleteProduct(+productId)
        const response = await productsMongo.deleteOne(productId)
        res.status(200).json({message:'Product deleted'})
    } catch (error) {
        res.status(500).json({error})
    }
})

//put
router.put('/:id', async (req, res)=>{
    const productId= req.params.id;
    try {
        //const updatedProduct= await productManager.updateProduct(+productId, req.body)
        const updatedProduct= await productsMongo.updateOne(productId, req.body)
        return updatedProduct
        res.status(200).json({message:'Product updated'})
    } catch (error) {
        res.status(500).json({error})
    }
})







export default router;