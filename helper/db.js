var Sequelize = require('sequelize');
var env = require('../env');

var seq = new Sequelize(env.connectionString,{
    dialect:'postresql',
    // operatorsAliases:false,
    SCHEMA:"dish",
    // logging:0,
    host : 'localhost',
    define : {
        timestamps : false,
        freezeTableName: true
    },
    pool:{
        max:5,
        min:0,
        acquire:500,
        idle:10000
    }
});

seq.authenticate().then(()=>{
    console.log("connection success");
})
const db ={}
db.Sequelize = Sequelize;
db.seq =seq;
db.Dish = require('../model/Dish')(seq,Sequelize)
module.exports=db;