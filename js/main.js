(function(){
    "use strict";
    document.addEventListener('DOMContentLoaded', function(){


/** BARRA FLOTANT OCULTA **/

// Controlo la barra flotant per mitjà de la classe css "barra-visible" i les variables booleanes:
// - actiu -> evita l'efecte scrolling quan desapareix la barra flotant en fer click en un dels links
// - visible -> oculta la barra quan estem sobre del header

let actiu = true;
let visible = true;

/* Funció auxiliar per evitar efecte scrolling quan desapareix la barra flotant */

function activar() {
    actiu = true;
}

/* Funció que controla la distància respecte a l'inici de la pàgina. Prenc com a referència l'alçada del header, amb la propietat offsetHeight  */

function distancia() {    
    let header = document.querySelector('#header');
    let scroll = window.pageYOffset;
    if(scroll > header.offsetHeight) {
        visible = true;
    } else {
        visible = false;;
    }
    return visible;    
}


/* Funció per ocultar la barra flotant si es fa click en un dels seus enllaços */

function ocultBar() {
    document.addEventListener('click', function(e) {
        let target = e.target;
        if(target.className === 'link-ocult') {
            /* reactivem efecte scrolling automàtic després de 2 segons */
            setTimeout(activar, 2000);
            target.parentElement.parentElement.classList.remove('barra-visible');
            /* desactivem efecte scrolling automàtic */
            actiu = false;
        }
    }, false);
};

ocultBar();


/* Funció per ocultar/visualitzar la barra flotant */
function scrolling() {
    window.onscroll = function(e) {
        let barra = document.querySelector('.barra-oculta');

        distancia();

        /* funciona si scroll amunt, actiu i visible estan actius */
        if((this.oldScroll >= this.scrollY) && actiu && visible) { 
            barra.classList.add('barra-visible');
        }
        /* si falla alguna de les condicions -> la barra s'oculta */
        if((this.oldScroll < this.scrollY) || !actiu || !visible) {
            barra.classList.remove('barra-visible');
        }
        this.oldScroll = this.scrollY;
    }
}

scrolling();


/** FITXES DE PROJECTE */

/* Funció que selecciona fitxa de projecte per click sobre h4.nom-projecte */

function selFitxaProd() {
    document.addEventListener('click', function(e) {
        let target = e.target;
        let pare = target.parentElement.parentElement;
    
        if(target.className === 'nom-projecte') {
    
            /* si algun element té ja la classe fons-blanc activada -> desactivar-la */
            let blanc = document.querySelector('.fons-blanc');
            if(blanc !== null && blanc !== pare) {
                blanc.classList.remove('fons-blanc');
                blanc.children[1].classList.add('ocult');
            }
    
            pare.classList.toggle('fons-blanc'); /* assigna fons-blanc a li */
            pare.children[1].classList.toggle('ocult'); /* elimina classe ocult -> mostra text */
    
            setTimeout(reassignaClasses, 10000);

        }   
            
        /* Funció que retorna a l'estat inicial passat un temps */
        function reassignaClasses() {
            pare.classList.remove('fons-blanc');
            pare.children[1].classList.add('ocult');
        }
    }, false);
}

selFitxaProd();


}); /* DOM content loaded */
})();

