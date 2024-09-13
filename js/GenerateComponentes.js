

function GenerateList(List) {
    let HtmlResult = '<div class="columns is-multiline">';

    let HtmlItem = htmlCard;
    let UrlDestiny = ""

    List.forEach(item => {
        UrlDestiny = URLSite + "/View.html?IDChannel=" + item.ID;
        HtmlResult += '<div class="column is-3">';
        HtmlItem = htmlCard.replace('{URL}', UrlDestiny).replace('{Image}', item.Icon).replace('{Title}', item.Name).replace('{Country}', item.Country)
        HtmlResult += HtmlItem + '</div>';
    });

    HtmlResult += '</div>';

    return HtmlResult;
}
function GenerateMenuChannels(List) {
    let tabs = Object.keys(List);
    let HtmlResult = '<aside class="menu">'
    let HtmlVal = '';
    tabs.forEach(tab => {
        HtmlVal = "";
        List[tab].forEach(category => {
            HtmlVal += htmlMenuItem.replace('{ItemMenu}', category).replace('{filters}', "'" + tab + "','" + category + "'")
        })
        HtmlResult += htmlMenuLabel.replace('{LabelMenu}', tab).replace('{ItemsMenu}', HtmlVal)
    })
    HtmlResult += htmlCleanFilters + '</aside>' ;
    return HtmlResult;
}
function GenerateMenuChannelsResponsive(List) {
    let tabs = Object.keys(List);
    let HtmlResult =  htmlDropDownTrigger;
    HtmlResult += '<div class="dropdown-menu" id="dropdown-menu" role="menu">'
        + '<div class="dropdown-content">'

        tabs.forEach(tab => {
            HtmlVal = "";
            List[tab].forEach(category => {
                HtmlVal += htmlMenuItemResponsive.replace('{ItemMenu}', category).replace('{filters}', "'" + tab + "','" + category + "'")
            })
            HtmlResult += htmlMenuLabelResponsive.replace('{LabelMenu}', tab).replace('{ItemsMenu}', HtmlVal)
        })
    HtmlResult += htmlCleanFiltersResponsive+'</div></div>'

    return HtmlResult;
}
function GenerateItemView(item) {

}