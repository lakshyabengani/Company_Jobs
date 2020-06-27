const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'comapnies';

const Company = sequelize.define('Company', {
  name: {
    type: Sequelize.STRING,
    unique : true,
  },
  location: {
    type: Sequelize.STRING,
  },
  details:{
    type: Sequelize.STRING,
  }
}, {tableName });

//Relations 
//Company..CompanyJob.. one to many Relationship 

// eslint-disable-next-line
Company.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = Company;
