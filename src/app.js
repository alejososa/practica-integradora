import express from "express";
import "./db/dbconfig.js";
import usersRouter from "./routes/users.router.js"
import productsRouter from "./routes/products.router.js"
import passport from "passport";
import "./passport/passport.strategies.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

const app = express();
const PORT= 8080;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookies
app.use(cookieParser());

//session
app.use(session({
    store:new MongoStore({
        mongoUrl:`mongodb+srv://alejososa1987:Mongo54321@cluster0.donqjdb.mongodb.net/entregaDataBase?retryWrites=true&w=majority`,
    }),
    secreKey:"sessionMongo",
}));

//passport

app.use(passport.initialize());
app.use(passport.session());




app.listen(PORT,( )=>{
    console.log("Escuchando puerto 8080");
});

app.use("/api/products",productsRouter);