var width = window.innerWidth * 0.75;
var height = window.innerHeight * 0.90;

/* Set the width of the side navigation to 250px */
function openNavInterior() {
  document.getElementById("mySideNavInterior").style.width = "210px";
  document.getElementById("mySideNavInterior").style.display = "flex";

}

function openNavCapital() {
  document.getElementById("mySideNavCapital").style.width = "250px";
  document.getElementById("mySideNavCapital").style.display = "flex";

}

function openNavGdeSP() {
  document.getElementById("mySideNavGdeSP").style.width = "250px";
  document.getElementById("mySideNavGdeSP").style.display = "flex";
  document.getElementById("mySideNavGdeSP").style.visibility = "visible";  

}


function openNavCategorias() {
  document.getElementById("mySideNavCategoria").style.width = "100%";
  document.getElementById("mySideNavCategoria").style.display = "flex";
}

function openNavServicos() {
  document.getElementById("mySideNavServicos").style.width = "100%";
  document.getElementById("mySideNavServicos").style.display = "flex";
}


function openNavComoVer() {
  document.getElementById("ComoVer").style.display = "flex";
}

function openNavComoVerBusca() {
  document.getElementById("ComoVerBusca").style.display = "flex";
}

/* Set the width of the side navigation to 0 */
function closeNavCapital() {
  document.getElementById("mySideNavCapital").style.width = "0";
  document.getElementById("mySideNavCapital").style.display = "none";
}

function closeNavGdeSP() {
  document.getElementById("mySideNavGdeSP").style.width = "0";
  document.getElementById("mySideNavGdeSP").style.display = "none";
  document.getElementById("mySideNavGdeSP").style.visibility = "hidden";
}

function closeNavInterior() {
  document.getElementById("mySideNavInterior").style.width = "0";
  document.getElementById("mySideNavInterior").style.display = "none";

}

/* Set the width of the side navigation to 0 */
function closeNavCategorias() {
  document.getElementById("mySideNavCategoria").style.width = "0";
  document.getElementById("mySideNavCategoria").style.display = "none";
}

function closeNavServicos() {
  document.getElementById("mySideNavServicos").style.width = "0";
  document.getElementById("mySideNavServicos").style.display = "none";
}

function closeNavComoVer() {
  document.getElementById("ComoVer").style.display = "none";
}

function closeNavComoVerBusca() {
  document.getElementById("ComoVerBusca").style.display = "none";
}

function on() {
  // document.getElementById("overlay").style.width = "100%";
  // document.getElementById("overlay").style.display = "flex";
  // document.getElementById("overlay").style.visibility = "visible";
  document.getElementById("legenda").style.display = "flex";
}

function off() {
  // document.getElementById("overlay").style.width = "0";
  // document.getElementById("overlay").style.display = "none";
  // document.getElementById("overlay").style.visibility = "hidden";
  document.getElementById("legenda").style.display = "none";

}

function closeLista() {
  document.getElementById("tableLista").style.width = "0";
  document.getElementById("tableLista").style.display = "none";
  document.getElementById("tableLista").style.visibility = "hidden";
}

function openLista() {
  document.getElementById("tableLista").style.width = "50%";
  document.getElementById("tableLista").style.display = "flex";
  document.getElementById("tableLista").style.visibility = "visible";
  document.getElementById("tableLista").style.opacity = 0.9;
}


function openbuttonVerAgenda() {
  document.getElementById("verAgenda2").display = "flex";
  document.getElementById("verAgenda2").style.visibility = "visible";
}

function openbuttonVerUOC() {
  document.getElementById("verUO-C2").display = "flex";
  document.getElementById("verUO-C2").style.visibility = "visible";
}

function openbuttonVerUOI() {
  document.getElementById("verUO-I2").display = "flex";
  document.getElementById("verUO-I2").style.visibility = "visible";
}

function closebuttonVerAgenda() {
  document.getElementById("verAgenda2").display = "none";
  document.getElementById("verAgenda2").style.visibility = "hidden";
  
}

function closebuttonVerUOC() {
  document.getElementById("verUO-C2").display = "none";
  document.getElementById("verUO-C2").style.visibility = "hidden";
}

function closebuttonVerUOI() {
  document.getElementById("verUO-I2").display = "none";
  document.getElementById("verUO-I2").style.visibility = "hidden";
}
