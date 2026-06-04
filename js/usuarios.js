  let fechaNacimiento = document.getElementById("fechaNacimiento").value;
let nombre_US = document.getElementById("nombre_US").value;
let apellido_US = document.getElementById("apellido_US").value;
let tipoDocumento = document.getElementById("tipoDocumento").value;
let numeroDocumento = document.getElementById("numeroDocumento").value;
let telefono = document.getElementById("telefono").value;
let email = document.getElementById("email").value;
let masculino = document.querySelector("#masculino").value;
let femenino = document.querySelector("#femenino").value;
let otro = document.querySelector("#otro").value;
let cliente = document.querySelector("#cliente").value;
let empleado = document.querySelector("#empleado").value;
let administrador = document.querySelector("#administrador").value;
let contrasena = document.getElementById("contrasena").value;


function Nmbre() {
    if (nombre_US === "" || apellido_US === "" || fechaNacimiento === "" || tipoDocumento === "" || numeroDocumento === "" || telefono === "" || email === "" || contrasena === "") {
        console.log("Por favor, ingresa tu nombre.");
    }
    else {
        if(nombre_US !=/[a-zA-Z]+/){
            console.log("El nombre no puede contener números.");
        }
        else if(apellido_US !=/[a-zA-Z]+/){
            console.log("El apellido no puede contener números.");
        }
        else if(numeroDocumento.length != 10 || numeroDocumento !=/[0-9]+/){
            console.log("El número de documento debe tener 10 dígitos.");
        }
        else if(telefono.length != 10 || telefono !=/[0-9]+/){
            console.log("El número de teléfono debe tener 10 dígitos.");
        }
        else if(!email.includes("@") || !email.includes(".")){
            console.log("El correo electrónico no es válido.");
        }
        else if(contrasena.length < 8 ){
            console.log("La contraseña debe tener al menos 8 caracteres.");
        }
    }
}