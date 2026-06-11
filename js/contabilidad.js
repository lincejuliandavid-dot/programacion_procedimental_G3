document.getElementById('formContable').addEventListener('submit', function(evento) {
    evento.preventDefault(); 


    const fechaCorte = document.getElementById('fecha_de_corte').value;
    const concepto = document.getElementById('concepto').value.trim();
    const valorTotal = document.getElementById('valor_total').value;
    const ventasSemanales = document.getElementById('ventas').value;
    const ingresos = document.getElementById('ingresos').value;
    const egresos = document.getElementById('egresos').value;


  

    
    if (!fechaCorte) {
        alert(' Por favor, selecciona una Fecha de Corte.');
        return; 
    }

    
    if (concepto === "") {
        alert(' El campo "Concepto" no puede estar vacío.');
        return;
    }

    
    if (!valorTotal || parseFloat(valorTotal) <= 0) {
        alert(' El "Valor Total" debe ser un número mayor a 0.');
        return;
    }

    if (!ventasSemanales && !ingresos && !egresos) {
        alert(' Error: Debes registrar un monto en al menos uno de los tres campos (Ventas, Ingresos o Egresos).');
        return;
    }



    alert(` ¡Validación Exitosa!\n` +
          `Movimiento: ${concepto}\n` +
          `Total: $${valorTotal}\n` +
          `Ventas: $${ventasSemanales || 0}\n` +
          `Ingresos: $${ingresos || 0}\n` +
          `Egresos: $${egresos || 0}`);

    this.reset(); 
});