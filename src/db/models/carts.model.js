import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  cart_name: {
    type: String,
    required: true,
    unique: true
  },

  cart_products: [

    {
      //cuando uso el populate aca no funciona bien el quantity
      // product: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "products",
      // },
      // quantity: {
      //   type: Number
      // },
        product_id: String,
        product_title: String,
        quantity: Number
    },
  ],
  //más adelante vamos a er como relacionar esto y agregar la lista de productos seleccionados
});


export const cartsModels = mongoose.model("carts", cartsSchema)

