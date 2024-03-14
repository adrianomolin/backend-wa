"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const User_1 = require("../../models/User");
async function deleteUser(req, res) {
    try {
        const { userId } = req.params;
        await User_1.User.findByIdAndDelete(userId);
        res.sendStatus(204);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
exports.deleteUser = deleteUser;
