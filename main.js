'use strict';

const d = document;

const inputEl = d.querySelector("#content");
const formEl = d.forms[0];

d.addEventListener("DOMContentLoaded", function () {
    if (inputEl) {
        // En la entrada de datos, quitamos espacios de izquierda y derecha del string
        inputEl.oninput = function (e) { return this.value.trim(); }
    }
    if (formEl) {
        formEl.onsubmit = function (e) { return init(this, e); }
    }
    if (formEl) {
        formEl.onreset = function (e) {
            d.querySelector('#output').src = '';
            d.querySelector('#output').alt = '';
            inputEl.focus();
        }
    }
});

function escape(el) {
    return entitiesHtml(el.value.trim());
}

function entitiesHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function init(el, event) {

    event.preventDefault();
    let error = null;
    let text = null;

    if (inputEl) {
        text = escape(inputEl);
    }

    if (!text.length) {
        error = 'Completa el campo contenido.'; // carácter
    }
    // else if (!/^[a-zA-Z0-9]{1,5}$/.test(text)) {
    //     error = 'Solo cinco caracteres alfanuméricos son permitidos.';
    // }

    if (!error) {

        const URL = "https://chart.googleapis.com/chart?cht=qr&chs=200x200&chld=L|1&chl=";

        d.querySelector("#output").src = URL + encodeURIComponent(text);

        d.querySelector("#output").alt = "Código QR";

    } else {
        alert(error);
    }
}

