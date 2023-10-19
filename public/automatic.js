

/*...........................................*/
let scrollInterval;

function moveNewsUp(containerId) {
    const container = document.getElementById(containerId);
    const newsItemHeight = container.querySelector('.news-item').offsetHeight; // Altura de un elemento de noticias

    clearInterval(scrollInterval); // Detener cualquier desplazamiento anterior
    const downButtons = document.querySelectorAll('.move-down-button');
    downButtons.forEach(button => button.classList.remove('active'));

    if (container.scrollTop > 0) {
        container.scrollTop -= newsItemHeight;
    } else {
        // Si ya está en la parte superior, detener el intervalo y mantener en la parte superior
        clearInterval(scrollInterval);
    }
}
// Objeto para almacenar los intervalos por columna
const columnIntervals = {};


function moveNewsDown(containerId, button) {
    const container = document.getElementById(containerId);
    const newsItemHeight = container.querySelector('.news-item').offsetHeight; // Altura de un elemento de noticias

    const columnId = container.closest('.news-column').id;

    clearInterval(columnIntervals[columnId]); // Detener el intervalo anterior

    button.classList.add('active'); // Agregar clase para cambiar el color a verde

    columnIntervals[columnId] = setInterval(() => {
        if (container.scrollTop < container.scrollHeight - container.clientHeight) {
            container.scrollTop += newsItemHeight;
        } else {
            // Si ya está en la parte inferior, mueve el primer elemento al final
            const firstItem = container.querySelector('.news-item');
            const lastItem = container.querySelector('.news-item:last-child');
            container.removeChild(firstItem);
            container.appendChild(firstItem);
            container.scrollTop = container.scrollHeight - container.clientHeight - newsItemHeight; // Ajusta el desplazamiento inicial
        }
    }, 10000); // Intervalo de desplazamiento en milisegundos (10 segundos en este ejemplo)
}


function stopScroll() {
    clearInterval(scrollInterval); // Detener el desplazamiento cuando se presiona nuevamente el botón
}


    
        // Función para automatizar el botón "move-down-button"
function automatizarBotones() {
    const buttons = document.querySelectorAll('.move-down-button');
    let index = 0;

    function clickBoton() {
        if (index < buttons.length) {
            console.log(`Haciendo clic en el botón ${index + 1}`);
            buttons[index].click(); // Simula un clic en el botón
            index++;
            setTimeout(clickBoton, 1000); // Espera 10 segundos antes de hacer clic en el siguiente botón
        } else {
            console.log('Automatización completada.');
        }
    }

    clickBoton(); // Inicia el proceso de automatización haciendo clic en el primer botón
}

// Agregar un evento al botón "Automatizar" para iniciar la automatización
const automatizarButton = document.getElementById('automatizar-button');
automatizarButton.addEventListener('click', automatizarBotones);

