import { Router } from "express";
import { usersMongo } from "../db/managers/users.manager.js";
import {hashData} from "../utils.js";


const router= Router();


router.get("/", async(req,res)=>{
try {
    const users= await usersMongo.findAll();
    if(!users.length){
        return res.status(200).json({message:"No useres"})
    }
    res.status(200).json({message:"Users founded", users})
} catch (error) {
    res.status(500).json({message: error.message});
}
})

router.get("/:userId", async (req,res)=>{
    const {userId}= req.params;
    try {
        const user= await usersMongo.findById(userId);
        if(!user){
            return res.status(400).json({message:"There is no user with that id"})
        }
        res.status(200).json({message:"User founded", user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post("/", async (req,res)=>{
    const {first_name, last_name, username, age, email, password}=req.body;
    if(!first_name || !last_name || !username || !age || !email || !password){
        res.status(400).json({message:"Complete all fields"})
    }
    try {
        const hashPassword= await hashData(password)
        const newUser = {...req.body, password:hashPassword}
        const response= await usersMongo.createOne(newUser);
        res.status(200).json({message:"User created", response})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.delete("/:userId", async(req,res)=>{
    const {userId}= req.params;
    try {
        const deletedUser= await usersMongo.deleteOne(userId);
        if(!deletedUser){
            return res.status(400).json({message:"There is no user with that id"})
        }
        res.status(200).json({message:"User deleted", deletedUser});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})


export default router;
