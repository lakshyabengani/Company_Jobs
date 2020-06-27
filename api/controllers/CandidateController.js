const Candidate = require('../models/Candidates');
const CandidateJob = require('../models/CandiadteJob');
const Company = require('../models/Company');
const CompanyJob = require('../models/CompanyJob');

const CandidateController = ()=>{
    const createCandidate = async(req,res)=>{
        console.log(req.body);
        try{
            if(req.body.name && req.body.email_id){
                let check = await Candidate.findOne({
                    where:{
                        email_id : req.body.email_id,
                    }
                });
                if(check){
                    return res.status(200).json({msg : "Candidate with such email_id already exists"});
                }
                let candidate = await Candidate.create({
                    name : req.body.name,
                    email_id : req.body.email_id,
                    details : req.body.details,
                    college : req.body.college,    
                });
                return res.status(200).json({candidate});
            }
            else{
                return res.status(200).json({msg : "provide email_id and name atleast"})
            }
        }catch(err){
            console.log(err);
        }
    }

    const getStatus = async(req,res)=>{
        console.log(req.query);
        try{
            if(req.query.candidate_id && req.query.job_id){
                let check = await Candidate.findOne({
                    where:{
                        id : req.query.candidate_id
                    }
                });
                if(!check){
                    return res.status(200).json({msg : "The candidate doesnot exists"});
                }
                let applications = await Candidate.findOne({
                    where:{
                        id : check.id 
                    },
                    include:{
                        model : CompanyJob,
                        through :{
                            attributes : ['status']
                        },
                        where:{
                            id : req.query.job_id,
                        }
                    }
                });
                return res.status(200).json({applications});
            }
            else if (req.query.candidate_id){
                let check = await Candidate.findOne({
                    where:{
                        id : req.query.candidate_id
                    }
                });
                if(!check){
                    return res.status(200).json({msg : "The candidate doesnot exists"});
                }
                let applications = await Candidate.findAll({
                    where:{
                        id : check.id 
                    },
                    include:{
                        model : CompanyJob,
                        through :{
                            attributes : ['status']
                        },
                    }
                });
                return res.status(200).json({applications});
            }
            else{
                return res.status(200).json({msg : "provide atleast the candidate_id"})
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({msg : "Internal Server error"})
        }
    }

    const applyJob = async(req,res)=>{
        console.log(req.body);
        try{
            if(req.body.candidate_id && req.body.job_id){
                let check = await Candidate.findOne({
                    where:{
                        id : req.body.candidate_id
                    }
                });
                if(!check){
                    return res.status(200).json({msg : "The candidate doesnot exists"});
                }
                let check_application = await CandidateJob.findOne({
                    where:{
                        CandidateId : req.body.candidate_id,
                        CompanyJobId : req.body.job_id,
                    }
                });
                if(check_application){
                    return res.status(200).json({msg : "already applied to the job"});
                }
                let application = await CandidateJob.create({
                    CandidateId : req.body.candidate_id,
                    CompanyJobId : req.body.job_id,
                    status : "Under Review",
                });
                return res.status(200).json({application});
            }
            else{
                return res.status(200).json({msg : "provide candidate_id and job_id" })
            }
        }catch(err){
            console.log(err);
            return res.status(200).json({msg : "Internal server error"});
        }
    }

    const getJobs = async(req,res)=>{
        console.log(req.query);
        try{
            if(req.query.candidate_id){
                let check = await Candidate.findOne({
                    where:{
                        id : req.query.candidate_id
                    }
                });
                if(!check){
                    return res.status(200).json({msg : "The candidate doesnot exists"});
                }
                let jobs = await Candidate.findOne({
                    where:{
                        id : check.id,
                    },
                    include:{
                        model: CompanyJob,
                        through:{
                            attributes : ['status']
                        }
                    }
                });
                return res.status(200).json({jobs});
            }
            else{
                return res.status(200).json({msg : "Provide candidate_id"})
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({msg : "Internal Server error"});
        }
    }

    return {
        getStatus,
        createCandidate,
        getJobs,
        applyJob,
    };
};

module.exports = CandidateController;