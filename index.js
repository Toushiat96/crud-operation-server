const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const fileUpload = require("express-fileupload");
var mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

const port = 5000;

var dBConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud-operation",
});

dBConnect.connect();
app.post("/add", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const body = req.body.body;

  dBConnect.query(
    "insert into details (name,email,body)values(?,?,?)",
    [name, email, body],
    function (err, result) {
      res.send({ result: "success" });
    }
  );
});

app.get("/show", (req, res) => {
  dBConnect.query("select * from details", function (err, result) {
    res.send({ result });
  });
});

app.delete("/delete", (req, res) => {
const id = req.body.id;
dBConnect.query("delete from details where id = ?",id, function (err, result) {
  res.send({result});
})
});

app.get('/editcomment/:id',(req, res) => {
   const id = req.params.id;
   dBConnect.query('select * from details where id = ?',id, function (err,result){
   res.send({message : result});
   })
})

app.put('/update',(req, res) =>{
const id = req.body.id;
const name = req.body.name;
const email = req.body.email;

dBConnect.query('update details set name=?,email=? where id=?',[name,email,id],(err,result) =>{
res.send({message:result})

})

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
