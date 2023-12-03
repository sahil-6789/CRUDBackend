const express = require('express');
const router = express.Router();
const { fetchUsersByName,fetchUserByDomain,fetchUserByAvailability,fetchUserByGender,searchUserByFilter } = require('../Controller/User');

router.get("/searchByName",fetchUsersByName )
      .get('/domains', fetchUserByDomain)
      .get('/gender', fetchUserByGender)
      .get('/available',fetchUserByAvailability )
      .get("/searchByFilter",searchUserByFilter );



exports.router = router;