

function mergeAllNews() {
    // Obtén los contenedores de noticias de todas las columnas
    const newsContainers = document.querySelectorAll('.news-container:not(.news-column-hidden)');

    // Obtén el contenedor de "Todas las Noticias"
    const todasLasNoticiasContainer = document.getElementById('todasLasNoticias');

    // Limpia el contenido actual del contenedor de "Todas las Noticias"
    todasLasNoticiasContainer.innerHTML = '';

    // Crea un array para almacenar todas las noticias
    const allNews = [];

    // Recorre todos los contenedores de noticias y agrega sus noticias al array
    newsContainers.forEach(container => {
        const newsItems = container.querySelectorAll('.news-item');
        allNews.push(...newsItems);
    });

    // Ordena todas las noticias por fecha de publicación (más reciente primero)
    allNews.sort((a, b) => {
        const dateA = new Date(a.querySelector('p').textContent);
        const dateB = new Date(b.querySelector('p').textContent);
        return dateB - dateA;
    });

    // Agrega las noticias ordenadas al contenedor de "Todas las Noticias"
    allNews.forEach(newsItem => {
        todasLasNoticiasContainer.appendChild(newsItem.cloneNode(true));
    });
}

function mergeAllNewsBoton() {
// Oculta todas las columnas de noticias
const allColumns = document.querySelectorAll('.news-column:not(.news-column-hidden)');
allColumns.forEach(column => {
    column.style.display = 'none';
});
    // Asegúrate de que la columna de "Todas las Noticias" esté visible
    const todasLasNoticiasColumn = document.getElementById('todasLasNoticiasColumn');
    todasLasNoticiasColumn.style.display = 'block';

    // Ajusta el ancho de las columnas visibles
     // Ajusta el ancho de la columna visible (opcional)
     const visibleColumns = [todasLasNoticiasColumn];
     const newWidth = 85 / visibleColumns.length + '%';
     visibleColumns.forEach(column => {
         column.style.width = newWidth;
     });
}
