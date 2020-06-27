const Company = require('../models/Company');
const CompanyJob = require('../models/CompanyJob');
const Candidate = require('../models/Candidates');
const CandidateJob = require('../models/CandiadteJob')

const CompanyController =()=>{
    const createCompany = async(req,res)=>{
        console.log(req.body);
        try{
            if(req.body.name && req.body.location){
                let check = await Company.findOne({
                    where:{
                        name : req.body.name,
                    }
                });
                if(check){
                    return res.status(200).json({msg : "The company with this name exists"});
                }
                let company = await Company.create({
                    name : req.body.name,
                    location : req.body.location,
                    details : req.body.details,
                });
                return res.status(200).json({company});
            }else{
                return res.status(200).json({msg : "name and location to be provided"});
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({msg : "Internal Server Error"});
        }
    }

    const AddJob = async(req,res)=>{
        console.log(req.body);
        try{
            if(req.body.company_id && req.body.job){
                let company = await Company.findOne({
                    where:{
                        id : req.body.company_id,
                    }
                });
                if(company){
                    let check_job = await CompanyJob.findOne({
                        where:{
                            company_id : req.body.company_id,
                            job : req.body.job,
                        }
                    });
                    if(check_job){
                        return res.status(200).json({msg : "Job already added to the company"})
                    }
                    let job = await CompanyJob.create({
                        company_id : req.body.company_id,
                        job : req.body.job,
                        job_details : req.body.job_details,
                    });
                    return res.status(200).json({job});
                }
                else{
                    return res.status(200).json({msg : "Company doesnot exists"})
                }
            }
            else{
                return res.status(200).json({msg : "company_id and job to be provided"})
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({msg : "Internal Server error"})
        }
    }

    const getCandidates = async(req,res)=>{
        console.log(req.query);
        try{
            if(req.query.company_id && req.query.job){
                let company = await Company.findOne({
                    where:{
                        id : req.query.company_id,
                    }
                });
                if(!company){
                    return res.status(200).json({msg : "The company doesnot exists"});
                }
                let candidates = await CompanyJob.findAll({
                    where:{
                        company_id : req.query.company_id,
                        job : req.query.job,
                    },
                    include:[
                        {
                            model : Candidate,
                            through:{
                                attributes : []
                            }
                        }
                    ]
                });
                return res.status(200).json({candidates});
            }
            else if(req.query.company_id){
                let company = await Company.findOne({
                    where:{
                        id : req.query.company_id,
                    }
                });
                if(!company){
                    return res.status(200).json({msg : "The company doesnot exists"});
                }
                let candidates = await CompanyJob.findAll({
                    where:{
                        company_id : req.query.company_id,
                    },
                    include:[
                        {
                            model : Candidate,
                            through:{
                                attributes : ['status']
                            }
                        }
                    ]
                });
                return res.status(200).json({candidates});
            }
            else{
                return res.status(200).json({msg : "provide atleast company_id"})
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({msg : "Internal Server error "});
        }
    }

    const statusUpdate = async(req,res)=>{
        console.log(req.body);
        try{
            if(req.body.candidate_id && req.body.job_id && req.body.status){
                let check = await CandidateJob.findOne({
                    where:{
                        CandidateId : req.body.candidate_id,
                        CompanyJobId : req.body.job_id,
                    }
                });
                if(!check){
                    return res.status(200).json({msg : "candidates job doesnot exists"});
                }
                let updated_candidate = await CandidateJob.update(
                    {
                        status : req.body.status,
                    },
                    {
                        where:{
                            CandidateId : req.body.candidate_id,
                            CompanyJobId : req.body.job_id,
                        },
                        returning : true,
                        plain : true,
                    }
                );
                let candidate = updated_candidate[1];
                return res.status(200).json({candidate});
            }
            else{
                return res.status(200).json({msg : "Provide the candidate_id,job_id and status to be updated"})
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({msg : "Internal server error "})
        }
    }

    return{
        createCompany,
        AddJob,
        getCandidates,
        statusUpdate,
    }
}

module.exports = CompanyController;