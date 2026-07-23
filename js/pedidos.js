document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formPedidos');

   
    const inputFecha = document.getElementById('fechaCorte');
    const inputConcepto = document.getElementById('concepto');
    const inputValorTotal = document.getElementById('valorTotal');
    const inputVentas = document.getElementById('ventasSemanales');
    const inputIngresos = document.getElementById('ingresos');
    const inputEgresos = document.getElementById('egresos');

    const errorFecha = document.getElementById('error-fechaCorte');
    const errorConcepto = document.getElementById('error-concepto');
    const errorValorTotal = document.getElementById('error-valorTotal');
    const errorGrupoMontos = document.getElementById('error-grupoMontos');

    const btnCancelar = document.getElementById('btnCancelar');

    // Función para limpiar alertas previas
    function limpiarErrores() {
        [inputFecha, inputConcepto, inputValorTotal, inputVentas, inputIngresos, inputEgresos].forEach(input => {
            input.classList.remove('is-danger');
        });
        [errorFecha, errorConcepto, errorValorTotal, errorGrupoMontos].forEach(p => {
            p.textContent = "";
        });
    }

-
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault(); 
        limpiarErrores();

        // Extraer valores limpando espacios en blanco
        const fechaCorte = inputFecha.value;
        const concepto = inputConcepto.value.trim();
        const valorTotal = inputValorTotal.value;
        const ventasSemanales = inputVentas.value;
        const ingresos = inputIngresos.value;
        const egresos = inputEgresos.value;

        let tieneErrores = false;

        // 1. Validar Fecha de Corte
        if (!fechaCorte) {
            inputFecha.classList.add('is-danger');
            errorFecha.textContent = "La fecha de corte es obligatoria.";
            tieneErrores = true;
        }

        // 2. Validar Concepto
        if (concepto === "") {
            inputConcepto.classList.add('is-danger');
            errorConcepto.textContent = "Debes ingresar un concepto o descripción.";
            tieneErrores = true;
        }

        // 3. Validar Valor Total
        if (!valorTotal || parseFloat(valorTotal) <= 0) {
            inputValorTotal.classList.add('is-danger');
            errorValorTotal.textContent = "El valor total debe ser un monto mayor a 0.";
            tieneErrores = true;
        }

        // 4. Validar Distribución de Montos (Al menos uno requerido)
        if (!ventasSemanales && !ingresos && !egresos) {
            inputVentas.classList.add('is-danger');
            inputIngresos.classList.add('is-danger');
            inputEgresos.classList.add('is-danger');
            errorGrupoMontos.textContent = "Error: Rellena al menos un campo en la Distribución de Montos.";
            tieneErrores = true;
        }

       
        if (tieneErrores) {
            Swal.fire({
                icon: 'error',
                title: 'Registro Incompleto',
                text: 'Por favor, revisa los campos marcados en rojo.',
                confirmButtonColor: '#e63946',
                background: '#1f1f1f',
                color: '#f1faee'
            });
            return;
        }

        // 5. Si todo está correcto, imprimir objeto limpio en consola
        console.log("🏁 [BURGER RACING] Registro financiero guardado con éxito:");
        console.log({
            fechaCorte: fechaCorte,
            concepto: concepto,
            valorTotal: parseFloat(valorTotal),
            distribucion: {
                ventasSemanales: parseFloat(ventasSemanales) || 0,
                otrosIngresos: parseFloat(ingresos) || 0,
                egresosGastos: parseFloat(egresos) || 0
            }
        });

        // 6. Alerta de éxito personalizada estilo Dark/Burger Racing
        Swal.fire({
            icon: 'success',
            title: '¡Registro Exitoso!',
            html: `
                <div style="text-align: left; background: #2b2b2b; padding: 15px; border-radius: 12px; font-size: 14px; color: #f1faee; line-height: 1.6;">
                    <p><strong>📅 Fecha:</strong> ${fechaCorte}</p>
                    <p><strong>📝 Concepto:</strong> ${concepto}</p>
                    <p style="color: #ffd60a;"><strong>💰 Total:</strong> $${parseFloat(valorTotal).toFixed(2)}</p>
                </div>
            `,
            confirmButtonColor: '#e63946',
            confirmButtonText: 'Aceptar',
            background: '#1f1f1f',
            color: '#f1faee'
        }).then(() => {
            formulario.reset();
            limpiarErrores();
        });
    });

   
    btnCancelar.addEventListener('click', () => {
        formulario.reset();
        limpiarErrores();
        console.log("🧹 Formulario BURGER RACING reiniciado.");
    });
});