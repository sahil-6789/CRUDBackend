const express = require('express');
const router = express.Router();
const { fetchAllTeams,fetchTeamById,addTeam } = require('../Controller/Team');

router.get("/allTeam", fetchAllTeams)
.get("/Team/:id",fetchTeamById)
.post("/addTeam", addTeam);
exports.router = router;