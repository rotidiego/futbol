// Cargar el navbar y footer usando fetch

let queryId
let CurrentChannel
let URLOptions
$(document).ready(function () {
    console.log("ready!");
    load();
});

async function load() {
    let response = await getChannels();
    if (response.status) {
        queryId = getQueryParam('IDChannel')
        data = response.results;
        CurrentChannel = data.Channels.find(item => item.ID.toString() === queryId)
        URLOptions = await getOptionsChannel(CurrentChannel)
        if (URLOptions != '') {
            paintIframe(CurrentChannel.URL)
            paintOptions();
        }
    }
}
function paintIframe(url) {
    let iframe = document.getElementById('Iframe');
    iframe.src = url;
    iframe.onload = function() {
      iframe.contentWindow.open = function() {
        console.log("Intento de abrir ventana desde iframe bloqueado.");
        return null;
      };
    };
    iframe.contentWindow.open = function() {
      console.log("Intento de abrir ventana desde iframe bloqueado.");
      return null;
    };

    // Bloquear enlaces que abren en una nueva pestaña
    iframe.querySelectorAll('a[target="_blank"]').forEach(function (link) {
        link.removeAttribute('target');
    });

    
}

window.open = function () {
    console.log("Intento de abrir nueva ventana bloqueado.");
    return null;
};

// Bloquea enlaces con target="_blank"
document.addEventListener('click', function (event) {
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

function paintOptions() {
    $('#OptionsChannel').html(GenerateOptionsBtn(URLOptions));

}

async function getOptionsChannel(channelOp) {
    let data = Object.keys(channelOp).filter(item => item.includes('URL'));
    let OptionsChannel = [];

    if (data.length > 0) {
        for (let item of data) {
            if (channelOp[item] != "" && channelOp[item] != null) {
                let resultTesting = await CallTest(channelOp[item], { method: 'GET', mode: 'no-cors' });
                if (resultTesting) {
                    OptionsChannel.push(channelOp[item]);
                }
            }
        }
    }

    return OptionsChannel;
}
async function CallTest(url, headers) {
    let resultTest = true;
    /* try {
         await fetch(url, headers)
             .then(response => {
                 if (response.ok) {
                     resultTest = true
                 }
             })
             .catch(error => console.log(error));
 
     } catch (error) {
         resultTest = false;
         console.error(error)
     }9*/
    return resultTest;

}