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

function openNavCategorias() {
  document.getElementById("mySideNavCategoria").style.width = "100%";
  document.getElementById("mySideNavCategoria").style.display = "flex";
}

/* Set the width of the side navigation to 0 */
function closeNavCapital() {
  document.getElementById("mySideNavCapital").style.width = "0";
  document.getElementById("mySideNavCapital").style.display = "none";
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

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}