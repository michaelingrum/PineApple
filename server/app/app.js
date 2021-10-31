const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host     : 'database',
  user     : 'root',
  password : process.env.MYSQL_ROOT_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  port     : '3306'
});


app.listen(port, ()=>{
  console.log('App running on port ${port}');
});

app.get("/", async (req, res) => {
  res.json({status: "lets to it 🍍😎🍍"});
  console.log("Passwoed" + process.env.MYSQL_ROOT_PASSWORD);
});



app.get("/:nodeID", async (req, res) =>{
  console.log(req.params.nodeID);
  const query = "SELECT * FROM node as n where n.id = ?";
  pool.query(query, [req.params.nodeID], (error, results) =>{
    if(error){
      res.json({status: "DB is fucked! 🍆" + error.code});
      console.log(error);
    }
    else if (!results[0]){
      res.json({status: "Not Found 😶"});
    }else{
      res.json(results[0]);
    }
  } );
});
