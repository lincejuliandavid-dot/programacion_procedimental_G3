document.getElementById('formPedidos').addEventListener('submit', function(event) {
    
    event.preventDefault(); 

    // Limpiamos los errores visuales previos (quitar texto rojo e inputs rojos)
    document.querySelectorAll('.help.is-danger').forEach(el => el.textContent = '');
    document.querySelectorAll('.input').forEach(el => el.classList.remove('is-danger'));

    // Capturamos los valores directamente desde el formulario
    const fechaCorte = document.getElementById('fechaCorte').value;
    const concepto = document.getElementById('concepto').value;
    const valorTotal = document.getElementById('valorTotal').value;
    
    const ventasSemanales = document.getElementById('ventasSemanales').value;
    const ingresos = document.getElementById('ingresos').value;
    const egresos = document.getElementById('egresos').value;

    let esValido = true;

    // 1. Validar Fecha de Corte
    if (!fechaCorte) {
        mostrarError('fechaCorte', 'Por favor, selecciona una Fecha de Corte.');
        esValido = false;
    }

    // 2. Validar Concepto
    if (concepto.trim() === "") {
        mostrarError('concepto', 'El campo "Concepto" no puede estar vacío.');
        esValido = false;
    }

    // 3. Validar Valor Total
    if (!valorTotal || parseFloat(valorTotal) <= 0) {
        mostrarError('valorTotal', 'El "Valor Total" debe ser un número mayor a 0.');
        esValido = false;
    }

    // 4. Validar que al menos uno de los campos de montos opcionales tenga valor
    if (!ventasSemanales && !ingresos && !egresos) {
        document.getElementById('ventasSemanales').classList.add('is-danger');
        document.getElementById('ingresos').classList.add('is-danger');
        document.getElementById('egresos').classList.add('is-danger');
        
        const contenedorGrupo = document.getElementById('error-grupoMontos');
        if (contenedorGrupo) {
            contenedorGrupo.textContent = 'Error: Debes registrar un monto en al menos uno de los tres campos (Ventas, Ingresos o Egresos).';
        }
        esValido = false;
    }

    // Si el formulario no es válido, detenemos el proceso y mostramos alerta de SweetAlert2
    if (!esValido) {
        Swal.fire({
            title: 'Faltan datos requeridos',
            text: 'Por favor, revisa los campos señalados en rojo en el formulario.',
            icon: 'warning',
            confirmButtonColor: '#e63946'
        });
        return; 
    }

    // 5. Si todo es correcto, mostramos el éxito con SweetAlert2
    const resumenHTML = `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;">
            <p><strong>📅 Fecha de Corte:</strong> ${fechaCorte}</p>
            <p><strong>📝 Movimiento:</strong> ${concepto}</p>
            <p><strong>💰 Total General:</strong> $${parseFloat(valorTotal).toFixed(2)}</p>
            <hr style="margin: 10px 0; border: 0; border-top: 1px solid #ccc;">
            <p><strong>🏁 Ventas:</strong> $${ventasSemanales ? parseFloat(ventasSemanales).toFixed(2) : '0.00'}</p>
            <p><strong>📈 Ingresos Extra:</strong> $${ingresos ? parseFloat(ingresos).toFixed(2) : '0.00'}</p>
            <p><strong>📉 Egresos/Gastos:</strong> $${egresos ? parseFloat(egresos).toFixed(2) : '0.00'}</p>
        </div>
    `;

    Swal.fire({
        title: '¡Registro Exitoso!',
        html: resumenHTML,
        icon: 'success',
        confirmButtonColor: '#ffd60a',
        confirmButtonText: 'Entendido',
        iconColor: '#2ec4b6'
    }).then(() => {
        // Reiniciamos el formulario tras dar clic en el botón de la alerta exitosa
        document.getElementById('formPedidos').reset();
    });
});

// Función auxiliar para pintar de rojo el input y poner el texto debajo
function mostrarError(idElemento, mensaje) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.classList.add('is-danger'); 
    }
    const contenedorError = document.getElementById(`error-${idElemento}`);
    if (contenedorError) {
        contenedorError.textContent = mensaje; 
    }
}

// Botón de Cancelar con alerta de confirmación previa
document.getElementById('btnCancelar').addEventListener('click', function() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se borrarán todos los valores que hayas ingresado.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e63946',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sí, borrar todo',
        cancelButtonText: 'No, seguir aquí'
    }).then((result) => {
        if (result.isConfirmed) {
            // Limpia el formulario y los errores visuales
            document.getElementById('formPedidos').reset();
            document.querySelectorAll('.help.is-danger').forEach(el => el.textContent = '');
            document.querySelectorAll('.input').forEach(el => el.classList.remove('is-danger'));
        }
    });
});