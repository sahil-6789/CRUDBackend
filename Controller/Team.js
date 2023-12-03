const TEAM = require("../Model/Team");

exports.fetchAllTeams=async (req, res) => {
    try {
      const teams = await TEAM.find();
      res.json({ success: true, teams });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  };


  exports.fetchTeamById=async (req, res) => {
    try {
        let success=false;
        const team = await TEAM.findById(req.params.id);
        if(team.length<0){
            return res.status(200).json({ success, error: "No Team Found" })
        }
        success=true;
        res.json({success,team});

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
};

exports.addTeam=async (req, res) => {
    try {
        let success=false;
        const { teamName, description, member } = req.body;
        const team = new TEAM({
            teamName,
            description,
            member,
        });

        // Save the team
        const savedTeam = await team.save();

        res.json({ success: true, savedTeam });

    } catch (error) {
        console.log(error.message);
        res.status(500).json("IServer error");
    }
};