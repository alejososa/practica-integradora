import usersModel from "../models/users.model.js";
import BasicMongo from "./basic.manager.js";


class UsersMongo extends BasicMongo {
    constructor() {
        super(usersModel, "products");
    }

    async findByEmail(email) {
        try {
            const response = await usersModel.findOne({ email });
            return response
        } catch (error) {
            return error
        }
    }
}


export const usersMongo = new UsersMongo();


