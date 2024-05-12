/*Proyecto: Base de datos de alumnos
Descripción
Crearán un pequeño proyecto con html, css y js con el cual podrán gestionar a los alumnos de una clase, así como sus calificaciones y sacar datos importantes sobre su performance.
Requisitos
1.- Crear una clase alumno, la cual debe incluir:
Nombre
Apellidos
Edad
Materias inscritas
Calificaciones
(Esta es la clase base, si quieren agregarle mas datos son libres de hacerla tan completa como quieran)
2.- Alta de alumnos
Una vez creada la clase desde su sitio, deberán dar de alta alumnos, por defecto lo único que deben pedir como requisito al inicio es nombre, apellidos, edad.
3.- Después deberas crear funciones y vistas que les ayuden a hacer lo siguiente:
Inscribir un alumno a una clase.
Asignarle sus calificaciones.
Crear grupos y asignarle alumnos (Usen estructuras de datos).
4.- Ya que tengan sus grupos con alumnos, deberán crear e implementar las siguientes funciones:
Buscar por nombre.
Buscar por apellido.
Obtener promedio de un alumno.
Obtener promedio del grupo.
Obtener lista de alumnos ordenados ascendente y descendente por calificación.
Con los datos almacenados en la clase, deben agregar otro ordenamiento o búsqueda bajo el parámetro que quieran (Este es el punto extra).
5.- Preferentemente todo guarden en LocalStorage para que puedan tener persistencia de datos (Opcional x2)*/ 


class Alumno {
    constructor(nombre, apellido, edad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.materias = [];
        this.calidicaciones = [];

    }
}

let alumnos = [];

// Función para dar de alta un alumno
function altaAlumno() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = document.getElementById('edad').value;

    if (nombre && apellidos && edad) {
        const alumno = new Alumno(nombre, apellidos, edad);
        alumnos.push(alumno);
        mostrarAlumnos();
        guardarAlumnosEnLocalStorage();
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Función para mostrar los alumnos en el contenedor correspondiente
function mostrarAlumnos() {
    const alumnosContainer = document.getElementById('alumnos-container');
    alumnosContainer.innerHTML = '';
    alumnos.forEach(alumno => {
        const alumnoDiv = document.createElement('div');
        alumnoDiv.textContent = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}`;
        alumnosContainer.appendChild(alumnoDiv);
    });
}

//Funcion para guardar los alumnos en el LocalStorage
function guardarAlumnosEnLocalStorage (){
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

}

//Funcion para cargar los alumnos desde el LocalStorage al cargar la pagina 
function cargarAlumnosDesdeLocalStorage () {
    const alumnosGuardados = localStorage.getItem('alumnos');
    if (alumnosGuardados) {
        alumnos = JSON.parse(alumnosGuardados);
        mostrarAlumnos();
    }
}

document.addEventListener('DOMContentLoaded', cargarAlumnosDesdeLocalStorage);

//Funcion para inscribir un alumno a una clase
function inscribirAlumnoAClase () {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellidos').value;
    const clase = document.getElementById('clase').value;


    //Buscar el alumno por nombre y apellido

    const alumno = alumnos.find(alumno => alumno.nombre === nombre && alumno.apellido === apellido);

    if (alumno) {
    alumno.clase = clase; 
    mostrarAlumnos();
    guardarAlumnosEnLocalStorage();
    } else {
    alert('No se encontró ningún alumno con ese nombre y apellido.')
    }

}

//Funcion para asignar calificaciones a un alumno
function asignarCalificaciones () {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellidos').value;
    const materia = document.getElementById('materia').value;
    const calificacion = document.getElementById('calificacion').value;

    // Buscar el alumno por nombre y apellido 

    const alumno = alumnos.find(alumno => alumno.nombre === nombre && alumno.apellido === apellido);

    if (alumno) {
        alumno.calidicaciones.push({ materia, calificacion});
        mostrarAlumnos();
        guardarAlumnosEnLocalStorage();
    } else {
        alert ('No se encontró ningún alumno con ese nombre y apellido.')
    }
}

// Función para crear grupos y asignarles alumnos

function crearGrupo () {
    const nombreGrupo = document.getElementById('nombre-grupo').value;
    const alumnosSeleccionados = Array.from(document.getElementById('alumnos-select').selectedOptions).map(option => option.valued);
    const alumnosGrupo = alumnosSeleccionados.map(index => alumnos[index]);

    const grupo = { nombre: nombreGrupo, alumnos: alumnosGrupo };
    console.log(grupo);

}

// Actualiza el select de alumnos para la función de inscribir en clase

function actualizarSelectAlumnos (){
    const selectAlumnos = document.getElementById('alumnos-select-clase');
    selectAlumnos.innerHTML = '';
    alumnos.forEach((alumno, index) => {
        const option = document.createElement('option');
        option.value = index; 
        option.textContent = `${alumno.nombre} ${alumno.apellido}`;
        selectAlumnos.appendChild(option);
    });
}

// Agregar opciones al select de alumnos para la función de crear grupo   

function actualizarSelectAlumnosGrupo () {
    const selectAlumnos = document.getElementById('alumnos-selecte');
    selectAlumnos.innerHTML = '';
    alumnos.forEach((alumno, index) => {
        const option = document.createElement ('option');
        option.value = index; 
        option.textContent = `${alumno.nombre} ${alumno.apellido}`;
        selectAlumnos.appendChild(option);
    });
}

function buscarPorNombre(nombre) {
    return alumnos.filter(alumno => alumno.nombre.toLowerCase() === nombre.toLowerCase());
}

function buscarPorApellido(apellido) {
    return alumnos.filter(alumno => alumno.apellido.toLowerCase() === apellido.toLowerCase());
}


// Función para obtener el promedio de un alumno
function obtenerPromedioAlumno() {
    const nombreAlumno = prompt('Ingrese el nombre del alumno:');
    const alumno = alumnos.find(alumno => alumno.nombre.toLowerCase() === nombreAlumno.toLowerCase());
    if (alumno) {
        const calificaciones = alumno.calificaciones;
        const promedio = calificaciones.reduce((acc, calificacion) => acc + calificacion, 0) / calificaciones.length;
        alert('El promedio del alumno ' + alumno.nombre + ' ' + alumno.apellido + ' es: ' + promedio);
    } else {
        alert('No se encontró ningún alumno con ese nombre.');
    }
}


// Función para obtener el promedio del grupo
function obtenerPromedioGrupo() {
    const calificacionesTotales = alumnos.flatMap(alumno => alumno.calificaciones);
    const promedio = calificacionesTotales.reduce((acc, calificacion) => acc + calificacion, 0) / calificacionesTotales.length;
    alert('El promedio del grupo es: ' + promedio);
}


// Función para obtener la lista de alumnos ordenados ascendentemente por calificación
function ordenarAlumnosAscendente() {
    const listaOrdenada = [...alumnos].sort((a, b) => {
        const promedioA = a.calificaciones.reduce((acc, calificacion) => acc + calificacion, 0) / a.calificaciones.length;
        const promedioB = b.calificaciones.reduce((acc, calificacion) => acc + calificacion, 0) / b.calificaciones.length;
        return promedioA - promedioB;
    });
    alert('Lista de alumnos ordenada ascendentemente por calificación: ' + listaOrdenada.map(alumno => alumno.nombre).join(', '));
}

// Función para obtener la lista de alumnos ordenados descendentemente por calificación
function ordenarAlumnosDescendente() {
    const listaOrdenada = [...alumnos].sort((a, b) => {
        const promedioA = a.calificaciones.reduce((acc, calificacion) => acc + calificacion, 0) / a.calificaciones.length;
        const promedioB = b.calificaciones.reduce((acc, calificacion) => acc + calificacion, 0) / b.calificaciones.length;
        return promedioB - promedioA;
    });
    alert('Lista de alumnos ordenada descendentemente por calificación: ' + listaOrdenada.map(alumno => alumno.nombre).join(', '));
}