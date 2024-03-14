"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = void 0;
const User_1 = require("../../models/User");
async function listUsers(req, res) {
    try {
        const user = await User_1.User.find();
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.listUsers = listUsers;
