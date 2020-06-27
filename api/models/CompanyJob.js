const Sequelize = require("sequelize");

const sequelize = require("../../config/database");

const tableName = "company_jobs";
const Company = require("./Company");

const CompanyJob = sequelize.define("CompanyJob", {
    company_id :{
        type : Sequelize.BIGINT
    },
    job:{
        type: Sequelize.STRING,
    },
    job_details:{
        type: Sequelize.STRING,
    }
}, { tableName });

//Foreign Keys 
//company_id (References from Company)

//Realations:
//CompanyJob..Company: many to one
//candidate..ComapnyJob: many to many

Company.hasMany(CompanyJob,{
    foreignKey : 'company_id'
});
CompanyJob.belongsTo(Company,{
    foreignKey : 'company_id'
});

// eslint-disable-next-line
CompanyJob.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = CompanyJob;