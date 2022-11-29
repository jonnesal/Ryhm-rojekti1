
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

        if(firstName !== null) {
            document.getElementsByName('firstName')[0].placeholder=firstName.innerText;
            document.getElementsByName('lastName')[0].placeholder=lastName.innerText;
            document.getElementsByName('userName')[0].placeholder=username.innerText;
            document.getElementsByName('password')[0].placeholder=password.innerText;
        }else{
            document.getElementsByName('username')[0].placeholder=username.innerText;
            document.getElementsByName('password')[0].placeholder=password.innerText;
        }
    }catch (e){}
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
    const response = await fetch(`../lang/${newLocale}.json`, {
        mode: "no-cors"
    });
    return await response.json();
}

// async function fetchTranslationsFor(newLocale) {
//     const fetch = (...args) =>
//         import ('node-fetch').then(({default: fetch}) => fetch(...args));

//     const url =
//     `./lang/${newLocale}.json`;

//     const options = {
//         method: 'GET',
//         headers: {
//             //Tätä ei tarvii mutta paska hajoo jos tän poistaa, muokkaan joskus
//             'Content-Type': `/lang/${newLocale}.json`
//         }
//     };

//     fetch(url, options)
//         .then(res => res.json())
//         .catch(err => console.error('error:' + err));
//     try {
//         let response = await fetch(url, options);

//         response = await response.json();

//         return response;


//     } catch (err) {
//         console.log(err);

//     }
// }



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