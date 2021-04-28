import express from "express";
import { isAuthenticated, isAdmin } from "../middleware.js";
import {
    register,
    login,
    logout,
    isLoggedIn,
    updateProfile,
    getAllUsers,
    deleteUser,
    updateUser
} from "../controllers/users.js";

const router = express.Router();

router.route('/')
    .get(isAuthenticated, isAdmin, getAllUsers)

router.route("/register")
    .post(register);

router.route("/login")
    .post(login)

router.route("/logout")
    .delete(isAuthenticated, logout);

router.route("/isLoggedIn")
    .get(isLoggedIn);

router.route("/profile")
    .put(isAuthenticated, updateProfile);

router.route('/:id')
    .delete(isAuthenticated, isAdmin, deleteUser)
    .put(isAuthenticated, isAdmin, updateUser)

export default router

