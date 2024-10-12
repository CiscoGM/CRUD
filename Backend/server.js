const express=require("express");
const cors=require("cors");
const mysql=require("mysql")
const app=express();

app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud"

})

app.get("/", (req,res)=>{
   const sql="select * from students "
   db.query(sql,(err,results)=>{
    if(err) return res.json("Error ")
        return res.json(results)
   })
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO students (name, email) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

app.put("/update/:id",(req,res)=>{
    const sql = "UPDATE students SET name = ?, email = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ];
    const stid=req.params.id
    db.query(sql, [...values, stid], (err, results) => {
        if (err) return res.json("Error");
        return res.json(results);
    });
});

app.get("/student/:id", (req, res) => {
    const studentId = req.params.id;
    const sql = "SELECT * FROM students WHERE id = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) return res.json("Error");
        return res.json(result[0]); // Devolver el estudiante encontrado
    });
});

app.delete("/deleteStd/:id", (req, res) => {
    const studentId = req.params.id;
    const sql = "DELETE FROM students WHERE id = ?";
    db.query(sql, [studentId], (err, result) => {
        if (err) return res.json("Error");
        return res.json(result[0]); 
    });
});

app.listen(8081,()=>{
    console.log("listening")
})