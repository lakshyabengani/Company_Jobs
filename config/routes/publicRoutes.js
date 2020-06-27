const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',

  'POST /addCompany': 'CompanyController.createCompany',
  'POST /addJob': 'CompanyController.AddJob',
  'GET /getCandidates': 'CompanyController.getCandidates',
  'POST /updateStatus': 'CompanyController.statusUpdate',

  'POST /addCandidate': 'CandidateController.createCandidate',
  'POST /apply': 'CandidateController.applyJob',
  'GET /getJobs': 'CandidateController.getJobs',
  'GET /getStatus': 'CandidateController.getStatus',
};

module.exports = publicRoutes;
