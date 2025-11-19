const express = require ('express');
const cors = require ( 'cors');

const mysql = require ('mysql');

const morgan = require ("morgan");


const app = express();
app.use (cors());
app.use (express.json())
app.use (morgan("dev"));



const conn = mysql.createConnection({
  host: 'localhost',
  database: 'tp',
  user: 'root'
});

app.get('/api/asistencias/hoy/:materia/:alumno', (req, res) => {
  conn.query('SELECT tipo FROM registros WHERE DATE(creado) = DATE(CURRENT_TIMESTAMP) AND materia = ? AND alumno = ?', [req.params.materia, req.params.alumno], (err, rs) => {
    res.status(200).json(rs);
  });
});

app.get('/api/asistencias/:materia/:fecha', (req, res) => {
  const params = [req.params.materia, req.params.fecha];
  conn.query('SELECT r.id, a.apellidos, a.nombres, tipo, TIME(creado) AS creado FROM registros r JOIN alumnos a ON a.id = r.alumno WHERE materia = ? AND DATE(creado) = ?', params, (err, rs) => {
    let i = 1;
    for (let e of rs) { e.orden = i; i++; }
    res.status(200).json(rs);
  });
});

app.post ('/api/alumnos', (req,rs) => { 
  let query='INSERT INTO alumnos (nombres,apellidos,curso) VALUES';
  console.log(req.body);
  let lista = req.body;
for (let i=0;i <lista.length;i++) {
let {nombres,apellidos,curso}=
lista [i];
  query+= ('${nombres}', '${apellidos}', '${curso}');
  if (i=lista.length-1) query+=',';
}

  console.log(query);
  conn.query(query, (err, rs) => {
    res.status(200).json({ msg: 'INSERTS OK' });
  });
  });
app.put('/api/asistencias/:id', (req, res) => {
  const { tipo, creado } = req.body;
  const data = [tipo, creado, req.params.id];
  console.log(data);
  conn.query('UPDATE registros SET tipo = ?, creado = ? WHERE id = ?', data, (err, rs) => {
    if (err) console.error(err);
    res.status(200).json({ msg: 'update ok' });
  });
});

app.post('/api/asistencias', (req, res) => {
  const { tipo, alumno, materia } = req.body;
  conn.query('SELECT * FROM registros WHERE alumno = ? AND materia = ? AND DATE(creado) LIKE DATE(CURRENT_TIMESTAMP)', [alumno, materia], (err, rs) => {
    console.log(rs);
    if (rs.length > 0) return res.status(400).json({ msg: 'no se puede' });
    const data = [tipo, alumno, materia];
    const q = 'INSERT INTO registros(tipo, alumno, materia) VALUES (?,?,?)';
    conn.query(q, data, (err, rs) => {
      res.status(201).json({ msg: 'Alta OK' });
    });
  });
});

// dame todos los cursos
app.get('/api/cursos', (req, res) => {
  conn.query('SELECT * FROM cursos', (err, rs) => {
    res.status(200).json(rs);
  });

});

// dame todos los alumnos de una materia
app.get('/api/alumnos/:materia', (req, res) => {
  const materia = req.params.materia;
  const q = 'SELECT a.id, a.nombres, a.apellidos FROM alumnos a JOIN cursos c ON a.curso = c.id JOIN materias m ON m.curso = c.id WHERE m.id = ?';
  conn.query(q, [materia], (err, rs) => {
    res.status(200).json(rs);
  });
});

// dame todas las materias de un curso
app.get('/api/materias/:curso', (req, res) => {
  const curso = req.params.curso;
  conn.query('SELECT * FROM materias WHERE curso = ?', [curso], (err, rs) => {
    res.status(200).json(rs);
  });
});

     
  

//app.post ("/api/asistencias", (req,res) =>
  


// esto conecta a la base de datos
conn.connect(err => {
  if (err) throw err;
  console.log('DB conectada');  
});






app.listen(3000, () => console.log('Server andando...'));
