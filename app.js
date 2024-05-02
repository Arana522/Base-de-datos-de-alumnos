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