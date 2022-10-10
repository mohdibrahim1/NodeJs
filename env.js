    const dev={
     port : 3002,
 connectionString : 'postgresql://postgres:winworld@1@localhost:5432/postgres'
}
function getEnv(){
    return dev;
}
const env =getEnv();


module.exports = env; 