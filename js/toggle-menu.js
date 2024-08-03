const menu = document.getElementById("menu"),
  hamburger = document.getElementById("hamburger");

function applyWSOffset() {
  wsOffset = hamburger.offsetHeight + 30;
  wsOffsetPx = wsOffset.toString() + "px";
  menu.style.paddingTop = wsOffsetPx;
  menu.style.height = "calc(100vh - " + wsOffsetPx + ")";
}

function clearOffset() {
  menu.style.paddingTop = 0;
  menu.style.height = "auto"
}

function toggleMenu() {
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    hamburger.innerHTML = "&#x2715;";
    hamburger.style.color = "#555"
    applyWSOffset();
  } else {
    menu.classList.add("hidden");
    hamburger.innerHTML = "&#9776;"
    hamburger.style.color = "#583d1f"
    clearOffset();
  }
}
