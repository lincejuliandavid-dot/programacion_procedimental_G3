document.getElementById('formContable').addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const fechaCorte = document.getElementById('fecha_de_corte').value;
    const concepto = document.getElementById('concepto').value.trim();
    const valorTotal = document.getElementById('valor_total').value;
    const ventasSemanales = document.getElementById('ventas').value;
    const ingresos = document.getElementById('ingresos').value;
    const egresos = document.getElementById('egresos').value;

    
    if (!fechaCorte) {
        Swal.fire({
            icon: 'error',
            title: 'Falta Fecha',
            text: 'Por favor, selecciona una Fecha de Corte.',
            confirmButtonColor: '#0052FF'
        }).then(() => document.getElementById('fecha_de_corte').focus());
        return; 
    }

    if (concepto === "") {
        Swal.fire({
            icon: 'error',
            title: 'Campo Requerido',
            text: 'El campo "Concepto" no puede estar vacío.',
            confirmButtonColor: '#0052FF'
        }).then(() => document.getElementById('concepto').focus());
        return;
    }

    if (!valorTotal || parseFloat(valorTotal) <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Monto Inválido',
            text: 'El "Valor Total" debe ser un número mayor a 0.',
            confirmButtonColor: '#0052FF'
        }).then(() => document.getElementById('valor_total').focus());
        return;
    }

    
    if (!ventasSemanales && !ingresos && !egresos) {
        Swal.fire({
            icon: 'warning',
            title: 'Datos Insuficientes',
            text: 'Error: Debes registrar un monto en al menos uno de los tres campos (Ventas, Ingresos o Egresos).',
            confirmButtonColor: '#0052FF'
        });
        return;
    }

   
    Swal.fire({
        icon: 'success',
        title: '¡Validación Exitosa!',
        html: `
            <div style="text-align: left; background: #F8FAFC; padding: 15px; border-radius: 12px; border: 1px solid #E2E8F0; font-size: 14px;">
                <p style="margin-bottom: 6px;"><strong>💼 Movimiento:</strong> ${concepto}</p>
                <p style="margin-bottom: 6px;"><strong>💰 Total:</strong> $${parseFloat(valorTotal).toFixed(2)}</p>
                <hr style="margin: 8px 0; border: 0; border-top: 1px solid #E2E8F0;">
                <p style="margin-bottom: 4px; color: #64748B;"><strong>📊 Desglose:</strong></p>
                <p style="margin-left: 10px; margin-bottom: 4px;">• Ventas: $${ventasSemanales || 0}</p>
                <p style="margin-left: 10px; margin-bottom: 4px;">• Ingresos: $${ingresos || 0}</p>
                <p style="margin-left: 10px;">• Egresos: $${egresos || 0}</p>
            </div>
        `,
        confirmButtonColor: '#0052FF',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        
        this.reset(); 
    });
});