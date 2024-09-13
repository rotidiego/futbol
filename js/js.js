

let data = {};
//const Swal = require('sweetalert2')

$(document).ready(function () {
    console.log("ready!");
    getChannels();
});
async function generateRandomPage() {
    let datar = "";

    const result = data.channels.filter(item => item.status === true);
    if (result.length < 1) {
        return
    }
    console.log(result)
    datar = result[Math.floor(Math.random() * result.length)].URL;
    paintIframe(datar)

}
async function getChannels() {

    let response = await callData('data/data.json', null);


    if (response.status) {
        data = response.results;
        await TestChannels();
        generateRandomPage();
    }
}

async function TestChannels() {
    let responseData = {};
    data.channels.forEach(async (channel) => {
        responseData = await CallTest(channel.URL, { mode: 'no-cors' }), false;
        channel.status = responseData.status;
        console.log(data)
    })
}


function paintIframe(url) {
    alert("hola")
    document.getElementById('contentIframe').src = url;

}
async function CallTest(url, headers){
    let resultTest = false;
    try {
        await fetch(url, headers )
            .then(response => {
                if(response.ok){
                    resultTest = true
                }
            })
            .catch(error => console.log(error));
        
    } catch (error) {
        resultTest = false;
        console.error(error)
    }
    return resultTest;

}
async function callData(url) {
    let responseData = {
        status: false,
        results: {}
    }
    await fetch(url )
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

