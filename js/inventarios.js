const txtUbicacion = document.getElementById('ubicacion');
const txtCantidad = document.getElementById('cantidad');
const selectPlatillo = document.getElementById('platillo');
const txtComentarios = document.getElementById('comentarios');

const btnConfirmar = document.getElementById('btn-confirmar');
const btnLimpiar = document.getElementById('btn-limpiar');

btnConfirmar.addEventListener('click', () => {
    const ubicacion = txtUbicacion.value.trim();
    const cantidad = txtCantidad.value;
    const platillo = selectPlatillo.value;
    const comentarios = txtComentarios.value.trim();

   
    if (ubicacion === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campo Requerido',
            text: 'Por favor, ingresa tu ubicación o número de mesa.',
            confirmButtonColor: '#009432'
        }).then(() => txtUbicacion.focus());
        return;
    }

    
    if (cantidad === "" || parseInt(cantidad) < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Cantidad Inválida',
            text: 'La cantidad debe ser al menos 1.',
            confirmButtonColor: '#009432'
        }).then(() => txtCantidad.focus());
        return;
    }

   
    if (platillo === "") {
        Swal.fire({
            icon: 'error',
            title: 'Selecciona un platillo',
            text: 'Por favor, selecciona un platillo de la lista.',
            confirmButtonColor: '#009432'
        }).then(() => selectPlatillo.focus());
        return;
    }


    if (comentarios === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Faltan Comentarios',
            text: "Por favor, llena el campo de comentarios. Si no tienes preferencias, escribe 'Ninguno'.",
            confirmButtonColor: '#009432'
        }).then(() => txtComentarios.focus());
        return;
    }

    Swal.fire({
        icon: 'success',
        title: '¡Pedido Confirmado!',
        html: `
            <div style="text-align: left; background: #f9f9f9; padding: 15px; border-radius: 10px; border-left: 5px solid #009432;">
                <p><strong>📍 Ubicación:</strong> ${ubicacion}</p>
                <p><strong>🔢 Cantidad:</strong> ${cantidad}</p>
                <p><strong>🍽️ Platillo:</strong> ${platillo}</p>
                <p><strong>💬 Comentarios:</strong> ${comentarios}</p>
            </div>
        `,
        confirmButtonColor: '#009432',
        confirmButtonText: '¡Excelente!'
    });
});


btnLimpiar.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se borrarán todos los datos ingresados en el formulario.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#009432',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, limpiar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            txtUbicacion.value = "";
            txtCantidad.value = "1";
            selectPlatillo.selectedIndex = 0; 
            txtComentarios.value = "";
            
            
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Formulario vacío',
                showConfirmButton: false,
                timer: 2000
            });
        }
    });
});