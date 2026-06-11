const txtUbicacion = document.getElementById('ubicacion');
    const txtCantidad = document.getElementById('cantidad');
    const selectPlatillo = document.getElementById('platillo');
    const txtComentarios = document.getElementById('comentarios');
    
    const btnConfirmar = document.getElementById('btnConfirmar');
    const btnLimpiar = document.getElementById('btnLimpiar');

    btnConfirmar.addEventListener('click', () => {
        const ubicacion = txtUbicacion.value.trim();
        const cantidad = txtCantidad.value;
        const platillo = selectPlatillo.value;
        const comentarios = txtComentarios.value.trim();

    
        if (ubicacion === "") {
            alert("Por favor, ingresa tu ubicación o número de mesa.");
            txtUbicacion.focus();
            return;
        }

      
        if (cantidad === "" || parseInt(cantidad) < 1) {
            alert("La cantidad debe ser al menos 1.");
            txtCantidad.focus();
            return;
        }

  
        if (platillo === "") {
            alert("Por favor, selecciona un platillo de la lista.");
            selectPlatillo.focus();
            return;
        }

      
        if (comentarios === "") {
            alert("Por favor, llena el campo de comentarios. Si no tienes preferencias, escribe 'Ninguno'.");
            txtComentarios.focus();
            return;
        }

      
        const mensajeExito = `¡Pedido Confirmado con éxito!\n\n` +
                            ` Ubicación: ${ubicacion}\n` +
                            ` Cantidad: ${cantidad}\n` +
                            ` Platillo: ${platillo}\n` +
                            ` Comentarios: ${comentarios}`;
        
        alert(mensajeExito);
    });

    btnLimpiar.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que deseas limpiar los campos del pedido?")) {
            txtUbicacion.value = "";
            txtCantidad.value = "1";
            selectPlatillo.selectedIndex = 0; 
            txtComentarios.value = "";
        }
    });