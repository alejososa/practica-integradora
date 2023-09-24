import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const secretKey = " KEYJWT"

export const __dirname= dirname(fileURLToPath(import.meta.url));

//para hashear

export const hashData= async(data)=>{
    return bcrypt.hash(data, 10);
};
//para comparar la data y la data hasheada
export const compareHashData= async (data,hashedData)=>{
    return bcrypt.compare(data, hashedData);
};

export const generateToken= (user)=>{
    const token= jwt.sign(user, secretKey,{expiresIn:'1h'})
    return token;
};