
const express = require('express');
const mysql = require('mysql');

const morgan = require ("morgan");

const app = express();
app.use (cors());
app.use (express.json())
app.use (morgan("dev"));



const connection = mysql.createConnection({
  host: 'localhost',
  database: 'tp',
  user: 'root'
  
})

//app.post ("/api/asistencias", (req,res) =>
  


// esto conecta a la base de datos
connection.connect(err => {
  if (err) throw err;
  console.log('DB conectada');  
});




app.listen(3000, () => console.log('Server andando...'));