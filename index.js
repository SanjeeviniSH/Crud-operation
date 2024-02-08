const connection=require('./connection')
const express=require('express');
const bodyParser=require('body-parser');
var app=express();

app.use(bodyParser.json())

app.get('/employees',(req,res)=>{
    connection.query('SELECT * FROM employee',(err,rows)=>{
        if(err){
            console.log(err)
        }else{
           // console.log(rows)
           res.send(rows)
        }
    })
})

app.get('/employees/:id',(req,res)=>{
    connection.query('SELECT * FROM employee WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            res.send(rows)
        }
    })
})

app.delete('/employees/remove/:id',(req,res)=>{
    connection.query('DELETE  FROM employee WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            res.send(rows)
        }
    })
})

app.post('/employees/add',(req,res)=>{
    var emp=req.body
    //console.log(emp)
    var empData=[emp.name,emp.salary]
    connection.query('INSERT INTO employee(name,salary) values(?)',[empData],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            res.send(rows)
        }
    })
})







// app.patch("/user/:id", async (req, res) => {
//     try {
//       const { id } = req.params;
//       //console.log(id)
//       const { name, salary } = req.body;
//       //console.log(name)
//       //console.log(salary)
//       const update = await connection
//         .promise()
//         .query(
//           `UPDATE employee set name = ${name}, salary = ${salary}, where id = ${id}`,
//           [ name, salary, id]
//         );
//         console.log(salupdateary)
//       res.status(200).json({
//         message: "updated",
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: err,
//       });
//     }
//   });

app.patch("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, salary } = req.body;
  
      const update = await connection
        .promise()
        .query(
          'UPDATE employee SET name=?, salary = ? WHERE id = ?',
          [name, salary, id]
        );
  
      console.log(update); // Note: Corrected the console.log statement
  
      res.status(200).json({
        message: "updated",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  });
  

app.listen(5000,()=>console.log('Express server is running on 5000'));