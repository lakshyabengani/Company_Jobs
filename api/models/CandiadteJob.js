const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "candidate_jobs";
const Candidate = require("./Candidates");
const CompanyJob = require("./CompanyJob");

const CandidateJob = sequelize.define("CandidateJob", {
  status:{
    type : Sequelize.STRING,
    default : "Under Review", 
  }
}, { tableName });

CompanyJob.belongsToMany(Candidate, { through: "CandidateJob" });
Candidate.belongsToMany(CompanyJob, { through: "CandidateJob" });

// eslint-disable-next-line

CandidateJob.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = CandidateJob;