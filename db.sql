CREATE DATABASE tp;

USE tp;

CREATE TABLE cursos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  anio INT,
  division INT,
  esp ENUM('Automotores','Ciclo basico', 'Computacion'),
  aula INT
);

CREATE TABLE alumnos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombres VARCHAR(255),
  apellidos VARCHAR(255),
  dni INT,
  curso INT,
  FOREIGN KEY (curso) REFERENCES cursos(id)
);


CREATE TABLE materias(
  id INT AUTO_INCREMENT PRIMARY KEY,
  horas INT,
  profesor VARCHAR(255),
  contraturno BOOLEAN,
  nombre VARCHAR(255),
  curso INT,
  FOREIGN KEY (curso) REFERENCES cursos(id)
);

CREATE TABLE registros(
  id INT AUTO_INCREMENT PRIMARY KEY,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tipo ENUM('A','P','T','RA','AP'),
  alumno INT,
  materia INT,
  FOREIGN KEY (alumno) REFERENCES alumnos(id),
  FOREIGN KEY (materia) REFERENCES materias(id)
);


INSERT INTO cursos VALUES
  (NULL,4,3,'Computacion',19);