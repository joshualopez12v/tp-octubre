const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'tp',
  user: 'root'  
})

// esto conecta a la base de datos
connection.connect(err => {
  if (err) throw err;
  console.log('DB conectada');  
});

app.listen(3000, () => console.log('Server andando...'));