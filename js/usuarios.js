function Nmbre() {
    // 1. Capturamos los valores en tiempo real (al hacer clic en el botón)
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let nombre_US = document.getElementById("nombre_US").value.trim();
    let apellido_US = document.getElementById("apellido_US").value.trim();
    let tipoDocumento = document.getElementById("tipoDocumento").value;
    let numeroDocumento = document.getElementById("numeroDocumento").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let email = document.getElementById("email").value.trim();
    let contrasena = document.getElementById("contrasena").value;

    // Capturar si se ha seleccionado algún radio button para Género y Rol
    let generoSeleccionado = document.querySelector('input[name="genero"]:checked');
    let rolSeleccionado = document.querySelector('input[name="rol"]:checked');

    // Expresiones Regulares para validar formatos
    const soloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    const soloNumeros = /^[0-9]+$/;

    // 2. Validación de campos de texto vacíos
    if (nombre_US === "" || apellido_US === "" || fechaNacimiento === "" || tipoDocumento === "" || numeroDocumento === "" || telefono === "" || email === "" || contrasena === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacíos',
            text: 'Por favor, rellene todos los campos de texto del formulario.',
            confirmButtonColor: '#3085d6'
        });
        return; // Detiene la ejecución aquí
    }

    // Validación de Género vacío
    if (!generoSeleccionado) {
        Swal.fire({
            icon: 'warning',
            title: 'Falta seleccionar el género',
            text: 'Por favor, selecciona una opción de género (Masculino, Femenino u Otro).',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    // Validación de Rol vacío
    if (!rolSeleccionado) {
        Swal.fire({
            icon: 'warning',
            title: 'Falta seleccionar el rol',
            text: 'Por favor, selecciona un rol en la empresa (Cliente, Empleado o Administrador).',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    // 3. Validaciones de Formato Específicas

    // Validar que el nombre solo contenga letras
    if (!soloLetras.test(nombre_US)) {
        Swal.fire({
            icon: 'error',
            title: 'Nombre inválido',
            text: 'El nombre no puede contener números ni caracteres especiales.',
            confirmButtonColor: '#d33'
        });
    } 
    // Validar que el apellido solo contenga letras
    else if (!soloLetras.test(apellido_US)) {
        Swal.fire({
            icon: 'error',
            title: 'Apellido inválido',
            text: 'El apellido no puede contener números ni caracteres especiales.',
            confirmButtonColor: '#d33'
        });
    } 
    // Validar que el documento sea numérico y de exactamente 10 caracteres
    else if (numeroDocumento.length !== 10 || !soloNumeros.test(numeroDocumento)) {
        Swal.fire({
            icon: 'error',
            title: 'Documento incorrecto',
            text: 'El número de documento debe tener exactamente 10 dígitos numéricos.',
            confirmButtonColor: '#d33'
        });
    } 
    // Validar que el teléfono sea numérico y de exactamente 10 caracteres
    else if (telefono.length !== 10 || !soloNumeros.test(telefono)) {
        Swal.fire({
            icon: 'error',
            title: 'Teléfono incorrecto',
            text: 'El número de teléfono debe tener exactamente 10 dígitos numéricos.',
            confirmButtonColor: '#d33'
        });
    } 
    // Validar el formato de correo electrónico
    else if (!email.includes("@") || !email.includes(".")) {
        Swal.fire({
            icon: 'error',
            title: 'Email inválido',
            text: 'Por favor, ingresa una dirección de correo electrónico válida.',
            confirmButtonColor: '#d33'
        });
    } 
    // Validar longitud de la contraseña minimo 8 
    else if (contrasena.length < 8) {
        Swal.fire({
            icon: 'error',
            title: 'Contraseña muy corta',
            text: 'La contraseña debe tener al menos 8 caracteres.',
            confirmButtonColor: '#d33'
        });
    } 
    // ¡Todo correcto! Se guarda el registro
    else {
        Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: `El usuario ${nombre_US} ha sido guardado exitosamente con el rol de ${rolSeleccionado.value}.`,
            confirmButtonColor: '#48c78e'
        }).then((result) => {
            if (result.isConfirmed) {
                limpiarFormulario();
            }
        });
    }
}

// Función para restablecer los campos del formulario
function limpiarFormulario() {
    document.getElementById("nombre_US").value = "";
    document.getElementById("apellido_US").value = "";
    document.getElementById("fechaNacimiento").value = "";
    document.getElementById("tipoDocumento").selectedIndex = 0;
    document.getElementById("numeroDocumento").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contrasena").value = "";

    let genero = document.querySelector('input[name="genero"]:checked');
    if (genero) genero.checked = false;

    let rol = document.querySelector('input[name="rol"]:checked');
    if (rol) rol.checked = false;
}

// Escuchador para el botón Cancelar en el formulario
document.getElementById('btnCancelar').addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se borrarán los datos que hayas ingresado en el formulario.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f14668',
        cancelButtonColor: '#7a7a7a',
        confirmButtonText: 'Sí, borrar todo',
        cancelButtonText: 'No, continuar editando'
    }).then((result) => {
        if (result.isConfirmed) {
            limpiarFormulario();
        }
    });
});