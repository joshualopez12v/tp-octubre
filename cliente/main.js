function handleClik (event) {
let row = event.target.parentElement.parentElement;
let idAlumno = row.children [0].textcontent;
let select = document.querySelector ("#materias");
let idMateria = select.value;
let datos = {

    tipo: event.target.textcontent,
    alumno: idAlumno,
    materia: idMateria
  
  
};
     
      const options ={

       method: "POST", 
       body: JSON.stringify (datos),
       Headers: {"content-type": "application/json"} 

  };
     const url = "http://localhost:3000/api/asistencias";
     fecht (url,options)
     then (res => res.json())
     then (data => {

})

      .catch( err => alert (err.stack));

      function cargarLista(e) {
     //alert ("id de materia = " + e target.value);

     const materiaId = e.target.value;
     fecht ('http://localhost:3000/api/alumnos'+ materiaId)
     then (res => res.json())
     then (data =>{
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    const btns = ['P', 'A', 'T','RA','AP'];
    for (let alumno of data) {
     let tr = document.createElement ('tr');
     let aid = document.createElement ('td');
     let nombre = document.createElement ('td');
     let apellido = document.createElement ('td');
     let {id, nombres,apellidos} = alumno;
     aid.textContent = id;
     nombre.textContent = nombres;
     apellido.textContent = apellido;
     tr.append (aid,nombre,apellido);
     let td = Document.createElement ('td');
      for (let text of btns) {
        let button = document.createElement ('button');
        button.textContent = text;
        button.onclick = handleClik;
        td.append (button);
      }
       tr.append (td);
       tbody.append (tr);
    }



     });


      }

    
    }

     function cargarAlumnos(e) {
      e.preventDefault();
      let lista = e.target.lista.value.split ('\n');
       let data =[];
       for (let elem of lista) {
        let alumno = {};
        alumno.nombres = elem.split ('') [0];
       alumno.apellidos = elem.split ('') [1];
        alumno.curso = e.target.curso.value;
       data.push (alumno);
     }
       
      const options ={
       method: 'POST',
      Headers: {'content-type': 'application/json'},
      body: JSON.stringify (data)
    
     };


      fetch ('http://localhost:3000/api/alumnos', options);
       e.target.reset();

       function cargarCursos () {
        fetch ('http://localhost:3000/api/cursos')
         then (res.json())
          then (data=> {
         const selects = document.querySelectorAll ('cursos');
          for (let select of selects) {
           select.innerHTML = '';
            for (let curso of data) {
            const option = document.createElement ('options');
             const {anio,division,esp} = curso;
              option.textContent = '$ {año} $ {division} $ {esp}';
              option.value = curso.id;
               select.append (option);
              
              }
    }        })
                 .catch (err =>alert(err.stack));
  
            }
             
            function changeDate (e) {
             let date = e.target.value
             let select = document.querySelector ('#materias');
             let materia = select.value
              fetch ('http://localhost:3000/api/asistencias/'+materia+'/'+date)
               then (lista => {
                let tbody = document.querySelector ('.registros tbody');
                 tbody.innerHTML = '';
                for (let alumno of lista) {
                 let tr = document.createElement ('tr');
                 let orden = document.querySelector ('td');
                 let apellido = document.querySelector ('td');
                 let nombre = document.querySelector ('td');
                 let registro = document.querySelector('td');
                  let hi= document.querySelector ('td');
                  let he = document.querySelector ('td');
                  if (alumno.tipo == 't') hi.textContent = alumno.creado;
                   orden.textContent = alumno.orden;
                    apellido.textContent = alumno.nombres;
                    registro.textContent = alumno.tipo;
                     tr.append (orden, apellido,nombre,registro,hi,he);
                     tbody.append (tr);

                }
              })


                }            
                
""



                        function removeRow(e) {
  let btn = e.target;
  let row = e.target.parentElement.parentElement;
  let id = row.children[6].textContent;
  alert(id);
  /*
  const options = {
    method: 'DELETE'
  };
  fetch(url + '/' + id, options)
    .then(res => res.json())
    .then(data => {
      updateTable();
    });*/
}

function editRow(e) {
  let btn = e.target;
  let row = e.target.parentElement.parentElement;
  if (btn.textContent == 'E') {
    let i = 3;
    while (i < 6) {
      row.children[i].contentEditable = true;
      i++;
    }
    row.children[7].children[0].textContent = 'G';
  } else {

    let data = {
      tipo: row.children[3].textContent,
      creado: row.children[4].textContent
    };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const id = row.children[6].textContent;
    fetch('http://localhost:3000/api/asistencias/'+id , options);

                    

                     }


                   }
                  }





        

 
       














