

let data = {};
//const Swal = require('sweetalert2')

$(document).ready(function () {
    console.log("ready!");
    getChannels();
});
async function generateRandomPage() {
    let datar = "";
    let ChannelsOk = data.filter((channel)  => channel)
    ChannelsOk.channels.forEach((channel) => {
        console.log(channel)
        datar = channel[Math.floor(Math.random() * channel.length)].URL;
        paintIframe(datar)
    })

    console.log(response)
}
async function getChannels() {

    let response = await callData('data/data.json', null);

    if (response.status) {
        data = response.results;
        TestChannels();
        generateRandomPage();
    }
}

function TestChannels() {
    let responseData = {};
    data.channels.forEach(async (channel) => {
        responseData = await callData(channel.URL, null);
        channel.Status = responseData.status;
        console.log(data)
    })
}

function paintIframe(url) {
    $('contentIframe').attr('src', url);
}

async function callData(url, data) {
    let responseData = {
        status: false,
        results: {}
    }
    await fetch(url)
        .then(response => response.json()).then(json => {
            responseData.status = true
            responseData.results = json
            console.log(json)
        })
        .catch(error => console.log(error));
    return responseData;
}

const AlertAsync = async (title, text, icon, confirmButtonText = 'Aceptar') => {

    const htmlMessage = `<p class="text-modal">${text}</p>`;
    const customFire = Swal.mixin({
        customClass: {
            title: 'title-modal',
            confirmButton: 'button-primary',
        },
        buttonsStyling: false,
    });

    await customFire.fire({
        title,
        html: htmlMessage,
        allowOutsideClick: false,
        icon,
        confirmButtonText,
    });
};








// Bloquea el uso de window.open
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
