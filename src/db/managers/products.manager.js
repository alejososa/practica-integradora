import { productsModels } from "../models/products.models.js";
import BasicMongo from "./basic.manager.js";


class ProductsMongo extends BasicMongo{
constructor(){
    super(productsModels, "users")
}

}

export const productsMongo = new ProductsMongo()

