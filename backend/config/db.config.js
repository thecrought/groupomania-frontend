const Sequelize = require("sequelize");
module.exports = new Sequelize("nodejs-login","root","",{host:"localhost", dialect:"mysql"});