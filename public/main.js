let lastResponse

async function getRss(){
        let fetched =  await fetch('/rss');
        return await fetched.json()
}
$(document).ready(function () {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ) {
            console.log("llega Mobile")
            $('#bodyMobile').show();
        }else{
            console.log("llega Desktop")
             $('#bodyDesktop').show();
        }
    });

getRss().then((res)=> {
    fillDesktop(res)
    fillDesktopGrid(res)

    $("li").hover(function() {
        $(this).toggleClass('scale-up').siblings('li').toggleClass('scale-down')
    })
})



function fillDesktop(res){
    $("#bodyDesktop").append('<div id ="allFeeds" class="parent">');
    res.forEach((t,i) => {
        if(t.allFeeds.length > 0) {
            //   console.log('adding column for: ' + t.source)
            $('#allFeeds').append('<li id ="' + t.source + 'Column" class= "fit">');
            $('#' + t.source + 'Column').append('<div id ="' + t.source + 'Header" class= "header" />');
            $('body').on('click', '#' + t.source + 'ToggleButton', function () {
                toggleColumn(t.source + 'Column')
            });
            $('#' + t.source + 'Header').append('<h1 id ="' + t.source + 'H1"/>');

            $('#' + t.source + 'H1').append('<img style="width: 100%;" src="' + t.frontEndImage + '" alt="' + t.source + 'Logo" />');
            $('#' + t.source + 'H1').append('<button id ="' + t.source + 'MoveUpButton" class="move-up-button" />↑');
            $('body').on('click', '#' + t.source + 'MoveUpButton', function () {
                moveNewsUp(t.source + 'News')
            });
            $('#' + t.source + 'H1').append('<button id ="' + t.source + 'MoveDownButton" class="move-down-button" />↓');
            //revisar esto de news
            $('body').on('click', '#' + t.source + 'MoveDownButton', function () {
                moveNewsDown(t.source + 'News', this)
            });

            $('#' + t.source + 'Column').append('<div id ="' + t.source + 'News" class= "news-container" />');
        }})
}


function fillDesktopGrid(res){
    res.forEach((y) => {
        if(y.hasNewElements === true ||$("#"+y.source+"News").find("div").length ==0) {
            console.log("entramos")
            let source = y.source
            $("#"+source+"Column").addClass("newFeed")
            setTimeout(()=>{$("#"+source+"Column").removeClass("newFeed")},500)
            $('#' + source + 'News').empty()
            y.allFeeds.forEach((feed, j) => {
                $('#' + source + 'News').append('<div id ="' + source + 'New' + j + '" class= "news-item" />');
                $('#' + source + 'New' + j).append('<h2 id ="' + source + 'h2_' + j + '" style = "color: black; font-weight: bold;"  class= "news-title" />');
                $('#' + source + 'h2_' + j).append('<a id ="' + source + '_a_' + j + ' href= "' + feed.link + '"  target="blank" />' + feed.title + '');
                $('#' + y.source + 'New' + j).append('<div id ="' + source + 'NewsImageContainer_' + j + '" class= "news-image-container" />');
                $('#' + source + 'NewsImageContainer_' + j).append('<img id ="' + source + '_thumbNail_' + j + '" src="' + feed.thumbnailUrl + '"  class= "news-image" />');
                $('#' + source + 'New' + j).append('<h3 id ="' + source + 'h3_' + j + '"  />');
                $('#' + source + 'h3_' + j).append('<div id ="' + source + '_newsContent_' + j + '" class ="news-content" />');
                $('#' + source + '_newsContent_' + j).append('<div id ="' + source + '_newsDescription_' + j + '" class ="news-desciption" />');
                $('#' + source + '_newsDescription_' + j).append('<p  />' + new Date(feed.pubDate).toLocaleString() + ' fuente: ' + source);
                $('#' + source + '_newsDescription_' + j).append('<p  />' + feed.description);
            })
        }

    });
}



let minsRefresh = 2
setInterval(()=>getRss().then((res)=> {
 fillDesktopGrid(res)
}),1000*60*minsRefresh)

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

    const columnId = container.closest('.news-container').id;

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

