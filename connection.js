const mysql=require('mysql2');
var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sense@2023',
    database:'employeedb'
})
mysqlConnection.connect((err)=>{
    if(err){
        console.log("error in db connection"+JSON.stringify(err,undefined,2));
    }else{
        console.log("db connected successfully");
    }
})
module.exports=mysqlConnection