const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host     : 'database',
  user     : process.env.MYSQL_APP_USER,
  password : process.env.MYSQL_APP_PASS,
  database : process.env.MYSQL_DATABASE,
  port     : '3306'
});


app.listen(port, ()=>{
  console.log('App running on port ${port}');
});

app.get("/", async (req, res) => {
  res.json({status: "lets to it 🍍😎"});
});

app.get("/allNodes/", async (req, res) =>{
  console.log(req.params.nodeID);
  const query = "SELECT * FROM node";
  pool.query(query, [req.params.nodeID], (error, results) =>{
    if(error){
      res.json({status: "DB is down. 😶" + error.code});
      console.log(error);
      console.log("Passwoed" + process.env.MYSQL_APP_PASS);
    }
    else if (!results[0]){
      res.json({status: "Not Found 😶"});
    }else{
      res.json(results);
    }
  } );
});

app.post("/setData", async (req, res) => {
  const { id, is_alive, ip } = req.body;
  let sql = 'CALL touchNode(?,?,?)';
  pool.query(sql, [id, is_alive, ip], (error, results) =>{
    if(error){
      res.json({status: "DB is down" + error.code});
      console.log(error);
    }
    else{
      res.json({status: "200 OK"});
    }
  } );
});


app.get("/:nodeID", async (req, res) =>{
  console.log(req.params.nodeID);
  const query = "SELECT * FROM node as n where n.id = ?";
  pool.query(query, [req.params.nodeID], (error, results) =>{
    if(error){
      res.json({status: "DB is down" + error.code});
      console.log(error);
    }
    else if (!results[0]){
      res.json({status: "Not Found 😶"});
    }else{
      res.json(results[0]);
    }
  } );
});


app.get('/light/phase', async (req, res) =>{
  if (!req.query['node_id'] && !req.query['light_id']){
    res.type('text').status(400).send('Missing Required GET parameters: node_id, light_id');
  }else if (!req.query['node_id'] && req.query['light_id']){
      res.type('text').status(400).send('Missing Required GET parameters: node_id');
  }else if (req.query['node_id'] && !req.query['light_id']){
      res.type('text').status(400).send('Missing Required GET parameters: light_id');
  }else{
    const query = "SELECT * FROM phase as n where n.node_id = ? and n.light_id = ?";
    pool.query(query, [req.query['node_id'], req.query['light_id']], (error, results) =>{
      if(error){
        res.status(500);
        res.json({er_status: "DB is down" + error.code});
        console.log(error);
      }
      else if (!results[0]){
        res.status(400);
        res.json({er_status: "Not Found 😶"});
      }else{
        res.status(200);
        res.json(results[0]);
      }
    } );
  }
});

app.get('/light/color', async (req, res) =>{
  if (!req.query['node_id'] ){
    res.type('text').status(400).send('Missing Required GET parameters: node_id');
  }else{
    const query = "SELECT * FROM light as n where n.parent_node = ?";
    pool.query(query, [req.query['node_id']], (error, results) =>{
      if(error){
        res.status(500);
        res.json({er_status: "DB is down" + error.code});
        console.log(error);
      }
      else if (!results[0]){
        res.status(400);
        res.json({er_status: "Not Found 😶"});
      }else{
        res.status(200);
        res.json(results);
      }
    } );
  }
});


app.post("/setLightPhase", async (req, res) => {
  const { node_id, light_id, phase } = req.body;
  let sql = 'CALL setPhase(?,?,?)';
  pool.query(sql, [node_id, light_id, phase], (error, results) =>{
    if(error){
      res.json({status: "DB is down" + error.code});
      console.log(error);
    }
    else{
      res.json({status: "200 OK"});
    }
  } );
});