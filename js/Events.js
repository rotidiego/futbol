let btnTheme
let dropdown
let dropdownTheme

const STORAGE_KEY = "bulma-theme";
const SYSTEM_THEME = "system";
const DEFAULT_THEME = "light";

const state = {
    chosenTheme: SYSTEM_THEME, // light|dark|system
    appliedTheme: DEFAULT_THEME, // light|dark
    OSTheme: null, // light|dark|null
};

let $themeCycle
let $themeSwitchers
let $darkmodes
let menuNav
let navItems

const updateThemeUI = () => {
    if (state.appliedTheme === "light") {
        $themeCycle.className = "bd-cycle js-burger is-sun";
    } else {
        $themeCycle.className = "bd-cycle js-burger is-moon";
    }

    $themeSwitchers.forEach((el) => {
        const swatchTheme = el.dataset.scheme;

        if (state.chosenTheme === swatchTheme) {
            el.classList.add("is-active");
        } else {
            el.classList.remove("is-active");
        }
    });
};
function LoadEventsMenu(){
    dropdown = document.querySelector('#dropdownFilters .dropdown-trigger');
    dropdown.addEventListener('click', function () {
        this.parentNode.classList.toggle('is-active');
    });

}

function LoadEvents() {

    
    dropdownTheme = document.getElementById("js-themes");
    btnTheme = document.getElementById("themePage");
    btnTheme.addEventListener("click", function () {
        showElements(dropdownTheme);
    });
    
    navItems = document.getElementById("js-nav");
    menuNav = document.getElementById("menuNav");
    menuNav.addEventListener("click", function () {
        showElements(navItems);
    });

    $themeCycle = document.getElementById("themePage");
    $themeSwitchers = document.querySelectorAll(".js-themes button");
    $darkmodes = document.querySelectorAll(".js-darkmode");
    $themeSwitchers.forEach((el) => {
        el.addEventListener("click", () => {
            const theme = el.dataset.scheme;
            setTheme(theme);
        });
    });
}

function showElements(elementHTML) {
    if (elementHTML.classList.contains(active)) {
        elementHTML.classList.remove(active)
    } else {
        elementHTML.classList.add(active)
    }
}
const setTheme = (theme, save = true) => {
    state.chosenTheme = theme;
    state.appliedTheme = theme;

    if (theme === SYSTEM_THEME) {
        state.appliedTheme = state.OSTheme;
        document.documentElement.removeAttribute("data-theme");
        window.localStorage.removeItem(STORAGE_KEY);
    } else {
        document.documentElement.setAttribute("data-theme", theme);

        if (save) {
            window.localStorage.setItem(STORAGE_KEY, theme);
        }
    }

    updateThemeUI();
};

// Evitar que se abran nuevas ventanas
window.open = function() {
    console.log("Intento de abrir nueva ventana bloqueado.");
    return null;
};

// Evitar redirecciones usando window.location
Object.defineProperty(window, 'location', {
    configurable: false,
    enumerable: true,
    get: function() {
        return window.location;
    },
    set: function(url) {
        console.log("Intento de redirección bloqueado a: " + url);
    }
});
// Bloquear enlaces que abren en una nueva pestaña
document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
    link.removeAttribute('target');
  });
// Lista de clases e IDs comunes de anuncios
const adSelectors = [
    '.ad', '.ads', '.advertisement', '#ads', '#ad-banner', 
    '.banner', '.pop-up', '.popup', '#pop-up', '#popup'
  ];
  
  // Función para eliminar los anuncios
  function removeAds() {
    adSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(ad => ad.remove());
    });
  }
  
  // Ejecutar la eliminación de anuncios cada 2 segundos para detectar anuncios dinámicos
  setInterval(removeAds, 2000);