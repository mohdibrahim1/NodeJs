module.exports = (seq,Sequelize)=>{
    const Dish = seq.define('Dish',{
        dishName:{type:Sequelize.TEXT,field:'dishName'},
        price:{type:Sequelize.INTEGER,field:'price'}
    },{
        // tableName:'Dish',
        searchPath:'Dish',
        schema:'dish'
    })
    return Dish;
}