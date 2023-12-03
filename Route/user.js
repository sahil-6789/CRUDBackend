const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const USER = require("../Model/User");
const { fetchAllUsers,addUser,updateUser,deleteUser } = require('../Controller/User');

router.get("/fetchAllUser",fetchAllUsers)
.post("/adduser", addUser)
.put("/update/:id", updateUser)
.delete("/delete/:id", deleteUser);

exports.router = router;