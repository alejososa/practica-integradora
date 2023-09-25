import { Router } from "express";
import { productsMongo } from "../managers/products/ProductsMongo.js";
import { productsModels } from "../db/models/products.model.js";
import { cartsMongo } from "../managers/carts/CartsMongo.js";

const router = Router();


export default router;
