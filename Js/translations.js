
let defaultLocale = "en";
let locale;
let translations = {};
let value;
//Switch select koodi
//Vaihtaa valittuun kieleen
function  changeLang(selectedValue){

    if(selectedValue === undefined) {
        value = "en";
    }else{
        value = selectedValue.value;
        localStorage.clear();
        localStorage.setItem("lang" ,  value);
        let test = localStorage.getItem("lang");

        setLocale(value);
    }

}

document.addEventListener("DOMContentLoaded", () => {
    // Käännetään sivu defaultLocale kieleen
        let chosenLang = localStorage.getItem("lang");

        selectElement('language-picker-select', chosenLang);

        if(chosenLang === undefined) {
            setLocale(defaultLocale);
        }else{

            setLocale(chosenLang);
        }

});

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
// Lataa locale kielen ja laittaa sivun tähän kieleen.

async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}

// Haetaan käännökset json tiedostosta

async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`/lang/${newLocale}.json`);
    return await response.json();
}

// Käännetään kaikki kohdat missä tämä Key on

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// Vaihdetaan html elementin kieli aktiiviseen locale arvoon

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;
}