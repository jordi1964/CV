(function(){
    "use strict";
    document.addEventListener('DOMContentLoaded', function(){


/** MENÚ DESPLEGABLE IDIOMES **/ 

let dreta = document.querySelector('#icona-idiomes');
dreta.addEventListener("click", function( event ) {
    /* per mitjà de la classe 'idi-visible' fem visible el menú d'idiomes */
    let idiomes = document.querySelector('.idiomes');
    idiomes.classList.toggle('idi-visible');
}, false);


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
        if(target.classList.contains('link-ocult')) {
            /* reactivem efecte scrolling automàtic després de 2 segons */
            setTimeout(activar, 2000);
            target.parentElement.parentElement.classList.remove('barra-visible');
            /* desactivem efecte scrolling automàtic */
            actiu = false;
        } else if (target.classList.contains('mes-projec')) {
            setTimeout(activar, 2000);
            actiu = false;
        }
    }, false);
};

ocultBar();


/* Funció per ocultar/visualitzar la barra flotant en fer scroll */
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


/* Funció per tancar la barra flotant a voluntat, clicant sobre la creu */

let creu = document.querySelector('.tancar');
creu.addEventListener("click", function(e) {
    let barraOculta = document.querySelector('.barra-oculta');
    barraOculta.classList.remove('barra-visible');
}, false);



/** FITXES DE PROJECTE */

/* Funció que selecciona fitxa de projecte per click sobre h4.nom-projecte */

function selFitxaProj() {
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

selFitxaProj();



/** DESPLEGABLES PROJECTES **/

/* Funció per SEL·LECCIONAR LES PESTANYES DELS PROJECTES */

function selPestanya() {

    /* iniciem amb una pestanya activa, per defecte: calendaris */
    let pestCalendaris = document.querySelector('#pest-calendaris');
    pestCalendaris.classList.add('select');
    /* iniciem amb una graella activa, per defecte: cartells */
    let graeCalendaris = document.querySelector('#grae-calendaris');
    graeCalendaris.classList.remove('graella-oculta');

    document.addEventListener('click', function(e) {
        let target = e.target;
        let classe = target.classList;
        /* com que el h5 té més d'una classe associada cal fer servir la propietat classList amb l'objecte DOMTokenList que genera; per buscar-hi una classe -> mètode .contains */

        if(classe.contains('pestanya')) {
            /* desactivem primer la pestanya que hi hagués activa en aquell moment */
            let select = document.querySelector('.select');
            select.classList.remove('select');

            /* activem nova pestanya */
            target.classList.add('select');

            /* ocultem la graella que estava visible en aquell moment */
            let graella = document.querySelectorAll('.graella');
            let i;
            for ( i = 0; i < graella.length; i++) {
                /* seleccionem l'element qu no té la classe graella-oculta */
                if(!graella[i].classList.contains('graella-oculta')) {
                    graella[i].classList.add('graella-oculta');
                }
            }

            /* bucle switch per seleccionar la graella visible en cada cas, eliminant la classe graella-oculta del bloc corresponent */
            switch (target.id){
                case 'pest-calendaris':
                    let graeCalendaris = document.querySelector('#grae-calendaris');
                    graeCalendaris.classList.remove('graella-oculta');
                    break;
                case 'pest-cartells':
                    let graeCartells = document.querySelector('#grae-cartells');
                    graeCartells.classList.remove('graella-oculta');
                    break;
                case 'pest-catalegs':
                    let graeCatalegs = document.querySelector('#grae-catalegs');
                    graeCatalegs.classList.remove('graella-oculta');
                    break;
                case 'pest-plv':
                    let graePLV = document.querySelector('#grae-plv');
                    graePLV.classList.remove('graella-oculta');
                    break;
                case 'pest-flyers':
                    let graeFlyers = document.querySelector('#grae-flyers');
                    graeFlyers.classList.remove('graella-oculta');
                    break;
                case 'pest-logos':
                    let graeLogos = document.querySelector('#grae-logos');
                    graeLogos.classList.remove('graella-oculta');
                    break;
                case 'pest-pack':
                    let graePack = document.querySelector('#grae-pack');
                    graePack.classList.remove('graella-oculta');
                    break;
                case 'pest-publi':
                    let graePubli = document.querySelector('#grae-publi');
                    graePubli.classList.remove('graella-oculta');
                    break;
            }
        }
    }, false);
};

selPestanya();


}); /* DOM content loaded */
})();

