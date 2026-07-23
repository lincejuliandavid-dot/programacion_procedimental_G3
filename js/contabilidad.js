document.getElementById('formContable').addEventListener('submit', function(evento) {
    evento.preventDefault(); 

   
    const inputFecha = document.getElementById('fecha_de_corte');
    const inputConcepto = document.getElementById('concepto');
    const inputValorTotal = document.getElementById('valor_total');
    const inputVentas = document.getElementById('ventas');
    const inputIngresos = document.getElementById('ingresos');
    const inputEgresos = document.getElementById('egresos');

    const fechaCorte = inputFecha.value;
    const concepto = inputConcepto.value.trim();
    const valorTotal = inputValorTotal.value;
    const ventasSemanales = inputVentas.value;
    const ingresos = inputIngresos.value;
    const egresos = inputEgresos.value;

  
    [inputFecha, inputConcepto, inputValorTotal, inputVentas, inputIngresos, inputEgresos].forEach(input => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });

    
    function marcarError(elemento) {
        elemento.style.borderColor = '#EF4444'; // Color rojo de advertencia
        elemento.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
    }

  
    if (!fechaCorte) {
        marcarError(inputFecha);
        Swal.fire({
            icon: 'error',
            title: 'Falta Fecha',
            text: 'Por favor, selecciona una Fecha de Corte.',
            confirmButtonColor: '#0052FF',
            background: '#1E293B',
            color: '#F8FAFC'
        }).then(() => inputFecha.focus());
        return; 
    }

    if (concepto === "") {
        marcarError(inputConcepto);
        Swal.fire({
            icon: 'error',
            title: 'Campo Requerido',
            text: 'El campo "Concepto" no puede estar vacío.',
            confirmButtonColor: '#0052FF',
            background: '#1E293B',
            color: '#F8FAFC'
        }).then(() => inputConcepto.focus());
        return;
    }

    if (!valorTotal || parseFloat(valorTotal) <= 0) {
        marcarError(inputValorTotal);
        Swal.fire({
            icon: 'error',
            title: 'Monto Inválido',
            text: 'El "Valor Total" debe ser un número mayor a 0.',
            confirmButtonColor: '#0052FF',
            background: '#1E293B',
            color: '#F8FAFC'
        }).then(() => inputValorTotal.focus());
        return;
    }

    if (!ventasSemanales && !ingresos && !egresos) {
        marcarError(inputVentas);
        marcarError(inputIngresos);
        marcarError(inputEgresos);
        Swal.fire({
            icon: 'warning',
            title: 'Datos Insuficientes',
            text: 'Error: Debes registrar un monto en al menos uno de los tres campos (Ventas, Ingresos o Egresos).',
            confirmButtonColor: '#0052FF',
            background: '#1E293B',
            color: '#F8FAFC'
        });
        return;
    }

    // 3. Imprimir registros en la Consola 
    console.log("🚀 ¡Transacción Contable Capturada Exitosamente!");
    console.log({
        fechaCorte: fechaCorte,
        concepto: concepto,
        valorTotal: parseFloat(valorTotal),
        desglose: {
            ventasSemanales: parseFloat(ventasSemanales) || 0,
            ingresosExtra: parseFloat(ingresos) || 0,
            egresosGastos: parseFloat(egresos) || 0
        }
    });

    // 4. Mostrar resumen de éxito al usuario
    Swal.fire({
        icon: 'success',
        title: '¡Validación Exitosa!',
        html: `
            <div style="text-align: left; background: #0F172A; padding: 15px; border-radius: 12px; border: 1px solid #334155; font-size: 14px; color: #E2E8F0;">
                <p style="margin-bottom: 6px;"><strong>📅 Fecha:</strong> ${fechaCorte}</p>
                <p style="margin-bottom: 6px;"><strong>💼 Movimiento:</strong> ${concepto}</p>
                <p style="margin-bottom: 6px;"><strong>💰 Total:</strong> $${parseFloat(valorTotal).toFixed(2)}</p>
                <hr style="margin: 8px 0; border: 0; border-top: 1px solid #334155;">
                <p style="margin-bottom: 4px; color: #94A3B8;"><strong>📊 Desglose de importes:</strong></p>
                <p style="margin-left: 10px; margin-bottom: 4px; color: #38BDF8;">• Ventas Semanales: $${ventasSemanales ? parseFloat(ventasSemanales).toFixed(2) : '0.00'}</p>
                <p style="margin-left: 10px; margin-bottom: 4px; color: #34D399;">• Ingresos Adicionales: $${ingresos ? parseFloat(ingresos).toFixed(2) : '0.00'}</p>
                <p style="margin-left: 10px; color: #F87171;">• Egresos / Gastos: $${egresos ? parseFloat(egresos).toFixed(2) : '0.00'}</p>
            </div>
        `,
        confirmButtonColor: '#0052FF',
        confirmButtonText: 'Confirmar y Guardar',
        background: '#1E293B',
        color: '#F8FAFC'
    }).then(() => {
       
        this.reset(); 
    });
});