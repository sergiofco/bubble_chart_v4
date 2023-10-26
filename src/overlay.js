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

function on() {
  document.getElementById("overlay").style.width = "100%";
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("overlay").style.visibility = "visible";
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

function off() {
  document.getElementById("overlay").style.width = "0";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("overlay").style.visibility = "hidden";
}

function closeLista() {
  document.getElementById("lista").style.width = "0";
  document.getElementById("lista").style.display = "none";
  document.getElementById("lista").style.visibility = "hidden";
}