
let categoriesFilters = {};
$(document).ready(function () {
    console.log("ready!");
    Load();
});


async function Load(){
    let response  = await getChannels();
    if (response.status) {
        data = response.results;
        categoriesFilters = getObjectFilters();
        paintFilters(categoriesFilters);
        paintChannels(data.Channels.sort(function(a, b) {
            return b.Name.localeCompare(a.Name);
          }));
        LoadEventsMenu()
    }
}

function paintFilters(items) {
    $('#filtersItems').html(GenerateMenuChannels(items));
    $('#dropdownFilters').html( GenerateMenuChannelsResponsive(items));
}

function paintChannels(items) {
    $('#listItems').html(GenerateList(items));
}

function getObjectFilters() {
    const categories = new Set();
    const countries = new Set();

    data.Channels.forEach(item => {
        categories.add(item.Category);
        countries.add(item.Country);
    });

    return {
        Category: Array.from(categories),
        Country: Array.from(countries)
    };
}

function filterChannels(att, val) {
    const result = data.Channels.filter(item => item[att] === val);
    console.log(1)
    if (result.length < 1) {
        return
    }
    paintChannels(result)
    dropdown.click();

}