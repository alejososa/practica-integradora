import express from "express";
import "./db/dbconfig.js";
import productsRouter from "./routes/products.router.js"

const app = express();
const PORT= 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.listen(PORT,( )=>{
    console.log("Escuchando puerto 8080");
});

app.use("/api/products",productsRouter);