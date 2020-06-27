const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'candidates';

const Candidate = sequelize.define('Candidate', {
  name: {
    type: Sequelize.STRING,
  },
  email_id: {
    type: Sequelize.STRING,
    unique : true,
  },
  details:{
    type: Sequelize.STRING,
  },
  college:{
    type: Sequelize.STRING,
  },
}, {tableName });

//Relations :
//Candidate..ComapnyJob: many to many

// eslint-disable-next-line
Candidate.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

module.exports = Candidate;
