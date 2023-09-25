import passport from "passport";
import { usersMongo } from "../db/managers/users.manager.js";
import { Strategy as googleStrategy} from "passport-google-oauth20";
import { Strategy as localStrategy} from "passport-local";
import { compareHashData, hashData } from "../utils.js";


//local login
passport.use("localLogin", new localStrategy({
    usernameField:"email"
},
async(email,password, done)=>{
try {
    const user= await usersMongo.findByEmail(email);
    if(!user){
        return done (null,false);
    }
    const comparePassword= compareHashData(password,user.password)
    if(!comparePassword){
        return done(null,false)
    }
    done(null,user)
} catch (error) {
        done (error)
}
}
))



// local sing up
passport.use(
    "localSignUp",
    new localStrategy({
        usernameField:"email",
        passReqToCallback: true,
    },
    async(req, email, password, done)=>{
        const {first_name, last_name}=req.body
        if(!first_name || !last_name || !username ||!password||!age){
            return done (null,false);
        }
        try {
            const user = await usersMongo.findByEmail(email)
            if(user){
            return done (null,false);
            }
            const hashPassword= await hashData(password)
            const newUser ={...req.body, password:hashPassword}
            const response= await usersMongo.createOne(newUser)
            done(null,response)
        } catch (error) {
            done (error)
        }
    })
    );



passport.serializeUser((user, done)=>{
done (null, user._id)
});

passport.deserializeUser(async(id, done)=>{
try {
    const user= await usersMongo.findById(id);
    done(null, user)
} catch (error) {
    done(error);
}
});