
let defaultLocale = "en";
let locale;
let translations = {};
let value;

document.addEventListener("DOMContentLoaded", () => {
    // Käännetään sivu defaultLocale kieleen

    if (localStorage.getItem("lang") === null) {
        localStorage.setItem("lang" ,  "en");
        selectElement('language-picker-select', "en");
        setLocale(defaultLocale);
    }else{
        let chosenLang = localStorage.getItem("lang");
        selectElement('language-picker-select', chosenLang);
        setLocale(chosenLang);
    }

});

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

//Switch select koodi
function  changeLang(selectedValue){
    if(selectedValue === undefined) {
        value = "en";
        setLocale(value);
    }else{
        value = selectedValue.value;
        localStorage.clear();
        localStorage.setItem("lang" ,  value);
        setLocale(value);
    }

}
//Ottaa hidden label elementit, kääntää ne ja lähettää niitten arvot
//Uusiksi placeholdereiksi
function changePlaceHolders() {
    try{

        let firstName = document.getElementById('firstName');
        let lastName = document.getElementById('lastName');
        let username = document.getElementById('placeholderName');
        let password = document.getElementById('PlaceholderPass');
        let search = document.getElementById('search');

        if(firstName !== null) {
            document.getElementsByName('firstName')[0].placeholder=firstName.innerText;
            document.getElementsByName('lastName')[0].placeholder=lastName.innerText;
            document.getElementsByName('userName')[0].placeholder=username.innerText;
            document.getElementsByName('password')[0].placeholder=password.innerText;
        }else if (username !== null){
            document.getElementsByName('username')[0].placeholder=username.innerText;
            document.getElementsByName('password')[0].placeholder=password.innerText;
        }else{
            document.getElementsByName('entertainmentName')[0].placeholder=search.innerText;
        }
    }catch (e){}
}

// Lataa locale kielen ja laittaa sivun tähän kieleen.

async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    console.log(translations)
    translatePage();
}

// Haetaan käännökset json tiedostosta

async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`../lang/${newLocale}.json`, {
        mode: "no-cors"
    });
    return await response.json();
}

// Käännetään kaikki kohdat missä tämä Key on

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}
// Vaihdetaan html elementin kieli aktiiviseen locale arvoon
//Tämä function kutsutaan vikana

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;

        changePlaceHolders();
}

module.exports = {fetchTranslationsFor, changeLang, translatePage, translateElement};