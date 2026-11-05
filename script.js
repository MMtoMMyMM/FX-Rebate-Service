// =========================================
// 1. LÓGICA DE LA CALCULADORA
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    // Obtenemos los elementos del DOM
    const tipoCuenta = document.getElementById('tipoCuenta');
    const activo = document.getElementById('activo');
    const lotes = document.getElementById('lotes');
    const resultado = document.getElementById('resultado');

    // Función que realiza el cálculo
    function calcularCashback() {
        // Obtenemos los valores seleccionados
        const cuenta = tipoCuenta.value;
        const instrumento = activo.value;
        const volumen = parseFloat(lotes.value) || 0;
        
        // Comisiones base por instrumento (según tabla del PDF)
        const comisiones = {
            'EURUSD': 3,
            'GBPUSD': 4,
            'XAUUSD': 18,
            'XTIUSD': 53
        };

        let total = 0;

        // Lógica de cálculo especial para Bitcoin
        if (instrumento === 'BTC') {
            const comisionBTC = 25; 
            if (cuenta === 'cent') {
                total = comisionBTC * (volumen / 100) * 0.42 * 0.95;
            } else {
                total = comisionBTC * volumen * 0.42 * 0.95;
            }
        } else {
            // Lógica para Forex, Oro y Petróleo
            const base = comisiones[instrumento];
            if (cuenta === 'cent') {
                // En cuenta Cent, 100 lotes cent = 1 lote standard
                total = base * (volumen / 100) * 0.95;
            } else {
                total = base * volumen * 0.95;
            }
        }

        // Formateamos el resultado (4 decimales si es muy pequeño, 2 si es normal)
        let textoFinal = total < 0.01 && total > 0 
            ? total.toFixed(4) 
            : total.toFixed(2);
            
        // Mostramos el resultado en pantalla
        resultado.innerText = '$' + textoFinal;
        
        // Pequeña animación visual para notar el cambio
        resultado.style.transform = 'scale(1.05)';
        setTimeout(() => { 
            resultado.style.transform = 'scale(1)'; 
        }, 150);
    }

    // Escuchamos los cambios en los selectores e input
    tipoCuenta.addEventListener('change', calcularCashback);
    activo.addEventListener('change', calcularCashback);
    lotes.addEventListener('input', calcularCashback);

    // Ejecutamos el cálculo una vez al cargar la página
    calcularCashback();
});

// =========================================
// 2. FUNCIÓN PARA COPIAR EL PARTNER ID
// =========================================
function copyID() {
    const idText = document.getElementById('partnerId').innerText;
    
    // Usamos la API del portapapeles del navegador
    navigator.clipboard.writeText(idText)
        .then(() => {
            alert('Partner ID ' + idText + ' copiado al portapapeles.');
        })
        .catch(err => {
            console.error('Error al copiar el ID: ', err);
            alert('No se pudo copiar el ID automáticamente. Por favor, selecciónalo manualmente.');
        });
}

// =========================================
// 3. LÓGICA DEL ACORDEÓN FAQ
// =========================================
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        
        // Alterna la clase 'active' para abrir/cerrar
        parent.classList.toggle('active');
        
        // Cambia el símbolo de + a - y viceversa
        const icon = item.querySelector('.faq-icon');
        if (icon) {
            icon.innerText = parent.classList.contains('active') ? '-' : '+';
        }
    });
});