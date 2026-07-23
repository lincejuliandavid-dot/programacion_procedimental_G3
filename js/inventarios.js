document.addEventListener('DOMContentLoaded', () => {
    // 1. Capturar los elementos del DOM
    const inputUbicacion = document.getElementById('ubicacion');
    const inputCantidad = document.getElementById('cantidad');
    const selectPlatillo = document.getElementById('platillo');
    const inputComentarios = document.getElementById('comentarios');
    
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnLimpiar = document.getElementById('btn-limpiar');

    // Función auxiliar para limpiar estilos de error
    function limpiarEstilos() {
        [inputUbicacion, inputCantidad, selectPlatillo].forEach(elem => {
            elem.style.borderColor = '';
            elem.style.boxShadow = '';
        });
    }

    // Función auxiliar para resaltar campos con error
    function marcarError(elemento) {
        elemento.style.borderColor = '#EF4444'; // Rojo de advertencia
        elemento.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
    }

    // --- EVENTO: CONFIRMAR PEDIDO ---
    btnConfirmar.addEventListener('click', (evento) => {
        evento.preventDefault();
        limpiarEstilos();

        // Extraer y limpiar valores
        const ubicacion = inputUbicacion.value.trim();
        const cantidad = inputCantidad.value;
        const platillo = selectPlatillo.value;
        const comentarios = inputComentarios.value.trim();

        // 2. Sistema de Validaciones (Evitar espacios vacíos)
        if (ubicacion === "") {
            marcarError(inputUbicacion);
            Swal.fire({
                icon: 'error',
                title: 'Falta Ubicación',
                text: 'Por favor, ingresa tu número de mesa o ubicación.',
                confirmButtonColor: '#009432',
                background: '#ffffff',
                color: '#2f3542'
            }).then(() => inputUbicacion.focus());
            return;
        }

        if (!cantidad || parseInt(cantidad) <= 0) {
            marcarError(inputCantidad);
            Swal.fire({
                icon: 'error',
                title: 'Cantidad Inválida',
                text: 'La cantidad debe ser un número mayor a 0.',
                confirmButtonColor: '#009432',
                background: '#ffffff',
                color: '#2f3542'
            }).then(() => inputCantidad.focus());
            return;
        }

        if (platillo === "") {
            marcarError(selectPlatillo);
            Swal.fire({
                icon: 'warning',
                title: 'Elige tu Platillo',
                text: 'Por favor, selecciona un platillo especial de la lista.',
                confirmButtonColor: '#009432',
                background: '#ffffff',
                color: '#2f3542'
            });
            return;
        }

        // 3. Imprimir el registro en la consola en un formato limpio
        console.log("🍔 ¡Pedido Confirmado Exitosamente!");
        console.log({
            ubicacion: ubicacion,
            cantidad: parseInt(cantidad),
            platillo: platillo,
            comentarios: comentarios || "Sin preferencias especiales"
        });

        // 4. Mostrar alerta de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Pedido Recibido!',
            html: `
                <div style="text-align: left; background: #f9f9f9; padding: 15px; border-radius: 12px; border: 1px solid #dfe4ea; font-size: 15px; color: #2f3542;">
                    <p style="margin-bottom: 6px;"><strong>📍 Ubicación:</strong> ${ubicacion}</p>
                    <p style="margin-bottom: 6px;"><strong>📦 Cantidad:</strong> ${cantidad} ud(s)</p>
                    <p style="margin-bottom: 6px;"><strong>🍽️ Platillo:</strong> ${platillo}</p>
                    <p style="margin-bottom: 0;"><strong>💬 Notas:</strong> ${comentarios || 'Ninguna'}</p>
                </div>
            `,
            confirmButtonColor: '#009432',
            confirmButtonText: '¡Excelente!',
            background: '#ffffff',
            color: '#2f3542'
        }).then(() => {
           
            inputUbicacion.value = "";
            inputCantidad.value = "1";
            selectPlatillo.value = "";
            inputComentarios.value = "";
            limpiarEstilos();
        });
    });

    
    btnLimpiar.addEventListener('click', (evento) => {
        evento.preventDefault();
        inputUbicacion.value = "";
        inputCantidad.value = "1";
        selectPlatillo.value = "";
        inputComentarios.value = "";
        limpiarEstilos();
        
        console.log("🧹 Formulario de pedido limpiado.");
    });
});