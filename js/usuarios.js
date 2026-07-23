document.addEventListener('DOMContentLoaded', () => {
   
    const inputNombre = document.getElementById('nombre_US');
    const inputApellido = document.getElementById('apellido_US');
    const inputTipoDoc = document.getElementById('tipoDocumento');
    const inputNumDoc = document.getElementById('numeroDocumento');
    const inputTelefono = document.getElementById('telefono');
    const inputEmail = document.getElementById('email');
    const inputFechaNac = document.getElementById('fechaNacimiento');
    const inputContrasena = document.getElementById('contrasena');

   
    const btnRegistrar = document.querySelector('button.is-link');
    const btnCancelar = document.getElementById('btnCancelar');

    
    function obtenerContenedorError(inputElement) {
       
        let contenedorPadre = inputElement.closest('.control') || inputElement.closest('.select');
        let campoField = contenedorPadre.closest('.field');
        
        let errorParagraph = campoField.querySelector('.help.is-danger');
        if (!errorParagraph) {
            errorParagraph = document.createElement('p');
            errorParagraph.className = 'help is-danger';
            campoField.appendChild(errorParagraph);
        }
        return errorParagraph;
    }

    // Limpiar clases de error y mensajes del formulario
    function limpiarErrores() {
        const inputs = [inputNombre, inputApellido, inputTipoDoc, inputNumDoc, inputTelefono, inputEmail, inputFechaNac, inputContrasena];
        
        inputs.forEach(input => {
            if (input) {
                input.classList.remove('is-danger');
               
                if (input.tagName === 'SELECT') {
                    input.closest('.select').classList.remove('is-danger');
                }
                const pError = obtenerContenedorError(input);
                pError.textContent = '';
            }
        });

      
        const grupoGeneros = document.getElementById('error-genero');
        if (grupoGeneros) grupoGeneros.textContent = '';
        const grupoRoles = document.getElementById('error-rol');
        if (grupoRoles) grupoRoles.textContent = '';
    }

   
    function validarYRegistrar() {
        limpiarErrores();
        let tieneErrores = false;

        // 1. Validar Nombre
        if (inputNombre.value.trim() === '') {
            inputNombre.classList.add('is-danger');
            obtenerContenedorError(inputNombre).textContent = 'El nombre no puede estar vacío.';
            tieneErrores = true;
        }

        // 2. Validar Apellido
        if (inputApellido.value.trim() === '') {
            inputApellido.classList.add('is-danger');
            obtenerContenedorError(inputApellido).textContent = 'El apellido no puede estar vacío.';
            tieneErrores = true;
        }

        // 3. Validar Tipo de Documento
        if (inputTipoDoc.value === '') {
            inputTipoDoc.closest('.select').classList.add('is-danger');
            obtenerContenedorError(inputTipoDoc).textContent = 'Selecciona un tipo de documento.';
            tieneErrores = true;
        }

        // 4. Validar Número de Documento
        if (inputNumDoc.value.trim() === '') {
            inputNumDoc.classList.add('is-danger');
            obtenerContenedorError(inputNumDoc).textContent = 'El número de documento es obligatorio.';
            tieneErrores = true;
        }

        // 5. Validar Teléfono
        if (inputTelefono.value.trim() === '') {
            inputTelefono.classList.add('is-danger');
            obtenerContenedorError(inputTelefono).textContent = 'El teléfono es obligatorio.';
            tieneErrores = true;
        }

        // 6. Validar Email
        if (inputEmail.value.trim() === '') {
            inputEmail.classList.add('is-danger');
            obtenerContenedorError(inputEmail).textContent = 'El correo electrónico es obligatorio.';
            tieneErrores = true;
        }

        // 7. Validar Género (Radio)
        const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
        if (!generoSeleccionado) {
            let contenedorRadios = document.querySelector('input[name="genero"]').closest('.field');
            let pError = contenedorRadios.querySelector('.help.is-danger') || document.createElement('p');
            pError.id = 'error-genero';
            pError.className = 'help is-danger';
            pError.textContent = 'Debes seleccionar un género.';
            contenedorRadios.appendChild(pError);
            tieneErrores = true;
        }

        // 8. Validar Rol (Radio)
        const rolSeleccionado = document.querySelector('input[name="rol"]:checked');
        if (!rolSeleccionado) {
            let contenedorRoles = document.querySelector('input[name="rol"]').closest('.field');
            let pError = contenedorRoles.querySelector('.help.is-danger') || document.createElement('p');
            pError.id = 'error-rol';
            pError.className = 'help is-danger';
            pError.textContent = 'Debes seleccionar un rol para el usuario.';
            contenedorRoles.appendChild(pError);
            tieneErrores = true;
        }

        // 9. Validar Fecha de Nacimiento
        if (!inputFechaNac.value) {
            inputFechaNac.classList.add('is-danger');
            obtenerContenedorError(inputFechaNac).textContent = 'La fecha de nacimiento es obligatoria.';
            tieneErrores = true;
        }

        // 10. Validar Contraseña
        if (inputContrasena.value.length < 6) {
            inputContrasena.classList.add('is-danger');
            obtenerContenedorError(inputContrasena).textContent = 'La contraseña debe tener al menos 6 caracteres.';
            tieneErrores = true;
        }

        
        if (tieneErrores) {
            Swal.fire({
                icon: 'error',
                title: 'Campos Incompletos',
                text: 'Por favor, rellene todos los espacios marcados.',
                confirmButtonColor: '#485fc7'
            });
            return;
        }

       
        const datosUsuario = {
            nombre: inputNombre.value.trim(),
            apellido: inputApellido.value.trim(),
            documento: {
                tipo: inputTipoDoc.value,
                numero: inputNumDoc.value.trim()
            },
            contacto: {
                telefono: inputTelefono.value.trim(),
                email: inputEmail.value.trim()
            },
            genero: generoSeleccionado.value,
            rol: rolSeleccionado.value,
            fechaNacimiento: inputFechaNac.value,
            contrasena: inputContrasena.value
        };

        console.log(" [Registro] Datos de usuario validados correctamente:");
        console.log(datosUsuario);

        Swal.fire({
            icon: 'success',
            title: '¡Registro Exitoso!',
            text: `El usuario ${datosUsuario.nombre} ${datosUsuario.apellido} ha sido creado con el rol de ${datosUsuario.rol}.`,
            confirmButtonColor: '#485fc7'
        }).then(() => {
            reiniciarFormulario();
        });
    }

    function reiniciarFormulario() {
        inputNombre.value = '';
        inputApellido.value = '';
        inputTipoDoc.value = '';
        inputNumDoc.value = '';
        inputTelefono.value = '';
        inputEmail.value = '';
        inputFechaNac.value = '';
        inputContrasena.value = '';

        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => radio.checked = false);

        limpiarErrores();
        console.log(" Formulario de registro limpio.");
    }

    // Asignación limpia de eventos (Adiós a los onclick directos en HTML)
    if (btnRegistrar) {
        btnRegistrar.removeAttribute('onclick'); // Remueve el antiguo atributo para evitar conflictos
        btnRegistrar.addEventListener('click', validarYRegistrar);
    }

    if (btnCancelar) {
        btnCancelar.addEventListener('click', reiniciarFormulario);
    }
});