import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    first_name:{type:String, required: true},
    last_name: {type:String, required:true},
    email: {type:String, required: true}, 
    username:{type:String, required:true, unique:true},
    age:{type:Number, required:true},
    password:{type:String, required: true},
    //cart:{type: mongoose.SchemaType.objectId, ref:"carts", default:{}},
    role:{type:String, default:"user"},
    fromGithub: { type: Boolean, default: false},
})

const usersModel=  mongoose.model('Users',userSchema);

export default usersModel;