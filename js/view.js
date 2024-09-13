// Cargar el navbar y footer usando fetch

let queryId

$(document).ready(function () {
    console.log("ready!");
    load();
});

document.addEventListener("DOMContentLoaded", function () {
    fetch('/ComponentsHTML/NavBar.html')
        .then(response => response.text())
        .then(data1 => document.getElementById('navBar').innerHTML = data1);  

}); 

async function load() {
    let response = await getChannels();
    if (response.status) {
        queryId = getQueryParam('IDChannel')
        data = response.results;
        let item = data.Channels.find(item => item.ID.toString() === queryId)
        paintIframe('Iframe',item.URL)
    }
}
function paintIframe(id, url){    
    document.getElementById(id).src = url;
}

window.open = function() {
    console.log("Intento de abrir nueva ventana bloqueado.");
    return null;
};

// Bloquea enlaces con target="_blank"
document.addEventListener('click', function(event) {
    const element = event.target.closest('a');
    if (element && element.target === '_blank') {
        event.preventDefault();
        console.log("Enlace con target='_blank' bloqueado.");
    }
});
document.addEventListener("DOMContentLoaded", function () {

    // Eliminar divs con clases típicas de anuncios
    const adDivs = document.querySelectorAll("div[class*='ad'], div[id*='ad']");
    adDivs.forEach(function (div) {
        div.remove();
    });

    // Eliminar scripts que cargan anuncios
    const adScripts = document.querySelectorAll("script[src*='ad']");
    adScripts.forEach(function (script) {
        script.remove();
    });
});