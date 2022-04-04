// ==UserScript==
// @name         Reddit Place - Argentina
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Usaremos sus armas contra ellos.
// @author       WalterSit0
// @match        https://hot-potato.reddit.com/embed*
// @grant        none
// ==/UserScript==

var imagen;
var opacidad = 0;

(function() {
    'use strict';
    if (window.top !== window.self) {
        window.addEventListener('load', () => {
                document.getElementsByTagName("mona-lisa-embed")[0].shadowRoot.children[0].getElementsByTagName("mona-lisa-canvas")[0].shadowRoot.children[0].appendChild(
                (function () {
                    imagen = document.createElement("img");
                    imagen.src = "https://github.com/BSG-Walter/rplace/raw/main/overlay4.png";
                    cambiarOpacidad();
                    console.log(imagen)
                    return imagen
                })())

        }, false);

        new MutationObserver(function(mutations){
            //tengo que poner esto en un observer porque los elementos aparecen y desaparecen cuando entras y salis del mapa.
            let coordenadas = document.getElementsByTagName("mona-lisa-embed")[0].shadowRoot.children[0].getElementsByTagName("mona-lisa-coordinates")[0].shadowRoot
            var searchingButton = coordenadas.getElementById("botonTransparencia")
            if (searchingButton == undefined){
                let button = coordenadas.appendChild((function () {
                    let buttonElement = document.createElement("button");
                    buttonElement.style = "height: 30px;width: 30px;background: url('https://github.com/BSG-Walter/rplace/raw/main/picture.svg') 0% 0% / 20px 20px,white;cursor: pointer;border-radius: 25px;background-repeat: no-repeat;background-position: center;"
                    buttonElement.addEventListener("click", function (e) {
                        cambiarOpacidad();
                    }, false);
                    return buttonElement;
                })())
                button.setAttribute("id","botonTransparencia");//le agrego esta id solo para encontrarlo luego por si hay que volver a crearlo
            }
    }).observe(document, {attributes: true, childList: true , subtree: true});
    }
})();

function cambiarOpacidad(){
    if (opacidad == 1) {opacidad = 0} else {opacidad+= 0.5}
    imagen.style = "position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 2000px;height: 2000px;opacity: " + opacidad + ";";
}
