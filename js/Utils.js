let data ={}
async function callFetch(url) {
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
async function getChannels() {

    let response = await callFetch('data/channelsJson.json', null);
    if (response.status) {
        data = response.results;
    }
    return response;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}