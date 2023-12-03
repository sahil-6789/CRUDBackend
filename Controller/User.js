const USER = require("../Model/User");


exports.fetchAllUsers =async (req, res) => {
    try {
        let success=false;
        const users = await USER.find({});
        success=true;
        res.json({success,users});

    } catch (error) {
        res.status(500).json("Server error");
    }
};

exports.addUser=async (req, res) => {
    try {
        let success=false;
        const { id,first_name,last_name,email,gender,avatar,domain,available} = req.body;
        let userEmail = await USER.findOne({ email });
        let userId = await USER.findOne({ id});
      
        if (userEmail) {
          return res.status(200).json({ success: false, error: "User with same email already exists" });
        }
      
        if (userId) {
          return res.status(200).json({ success: false, error: "User with same id already exists" });
        }
        const user = new USER({
            id,first_name,last_name,email,gender,avatar,domain,available,
        })
    
        const saveuser = await user.save();
        success=true;
        res.json({success,saveuser});

    } catch (error) {
        res.status(500).json("Server error");
    }
};

exports.updateUser=async (req, res) => {
    try {
        let success=false;
        const {first_name,last_name,gender,avatar,domain,available}= req.body;   
        const newUser={};   
        if(first_name){newUser.first_name=first_name}
        if(last_name){newUser.last_name=last_name}
        if(gender){newUser.gender=gender}
        if(avatar){newUser.avatar=avatar}
        if(domain){newUser.domain=domain}
        newUser.available=available
         
        let user =  await USER.findById(req.params.id);
        if(!user){
            return res.status(200).json({ success, error: "User  is not found" });
        }
        user = await USER.findByIdAndUpdate(req.params.id,{$set :newUser}, {new:true });
        success=true;
        res.json({success,user});
    } catch (error) {
        res.status(500).json("Server error ");
    }
};

exports.deleteUser=async (req, res) => {
    try {
        let success=false
        let user =  await USER.findById({"_id":req.params.id});
        if(!user){
            return res.status(200).json({ success, error: "User not found" });
        }
        
        user = await USER.findByIdAndDelete(req.params.id);
        success=true;
        res.json({success,user});
    } catch (error) {
        res.status(500).json("Server Error");
    }
};

exports.fetchUsersByName=async (req, res) => {
    try {
        let success=false;
        var query = req.query.search;
        const query_data = await USER.find({
            $or: [
                { "first_name": { $regex: ".*" + query + ".*", $options: 'i' } },
                { "last_name": { $regex: ".*" + query + ".*", $options: 'i' } }
            ]
        });

        if (query_data === 0) {
            return res.status(200).json({ success, error: "No Data Found" })
        }
        success=true;
        res.json({success,query_data});

    } catch (error) {
        res.status(500).json("Server error ");
    }
};

exports.fetchUserByDomain= async (req, res) => {
    try {
        const uniqueDomains = await USER.distinct('domain');
        res.json(uniqueDomains);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

 exports.fetchUserByGender= async (req, res) => {
    try {
        const uniqueDomains = await USER.distinct('gender');
        res.json(uniqueDomains);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.fetchUserByAvailability=async (req, res) => {
    try {
        const queryObject={};
        queryObject.available=true
        const uniqueAvailable =   await USER.find(queryObject);
        
        res.json(uniqueAvailable);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.searchUserByFilter=async (req, res) => {
    let success = false;
    try {
        const domain = req.query.domain;
        const gender = req.query.gender;
        const available =req.query.available;
        const queryObject={};
        if(domain){
            queryObject.domain=domain;
        }
        if(gender){
            queryObject.gender=gender;
        }
        if(available==="true"){
            queryObject.available=true
        }
        if(available==="false"){
            queryObject.available=false
            
        }
        const filter_data = await USER.find(queryObject);

        if (filter_data.length === 0) {
            return res.status(200).json({ success, error: "No Data" })

        } 
        success=true
        res.json({success,filter_data});

    } catch (error) {
        res.status(500).json("Server Error");
    }
};