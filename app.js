/* ------------------ TRADUCTIONS ------------------ */

const translations = {
  fr: {
    title: "Sens Converter Pro",
    fromGame: "Jeu d'origine",
    sensitivity: "Sensibilité",
    dpi: "DPI",
    convertTo: "Convertir vers",
    convertBtn: "Convertir",
    copyBtn: "Copier la sensi",
    proLabel: "Pro",
    result: "Sens équivalente : "
  },
  en: {
    title: "Sensitivity Converter Pro",
    fromGame: "Original game",
    sensitivity: "Sensitivity",
    dpi: "DPI",
    convertTo: "Convert to",
    convertBtn: "Convert",
    copyBtn: "Copy sens",
    proLabel: "Pro Player",
    result: "Equivalent sens : "
  }
};

let currentLang = "fr";

function setLanguage(lang) {
  currentLang = lang;

  document.querySelector("h1").innerText = translations[lang].title;

  document.querySelector("label[for='fromGame']").innerText = translations[lang].fromGame;
  document.querySelector("label[for='fromSens']").innerText = translations[lang].sensitivity;
  document.querySelector("label[for='dpi']").innerText = translations[lang].dpi;
  document.querySelector("label[for='toGame']").innerText = translations[lang].convertTo;

  document.querySelector(".btn-main").innerText = translations[lang].convertBtn;
  document.querySelector(".btn-secondary").innerText = translations[lang].copyBtn;

  document.querySelector(".pro-settings label").innerText = translations[lang].proLabel;

  if (document.getElementById("result").innerText.includes(":")) {
    const value = document.getElementById("result").innerText.split(": ")[1];
    document.getElementById("result").innerText = translations[lang].result + value;
  }
}

/* ------------------ RATIOS ------------------ */

const ratios = {
  valorant: 1,
  cs2: 3.18,
  fortnite: 0.571,
  overwatch2: 12.2,
  apex: 3.1818,
  r6: 12,
  pubg: 0.0025
};

/* ------------------ PRO SETTINGS ------------------ */

const proSettings = {
  tenz: { game: "Valorant", sens: 0.408, dpi: 1600, fov: "103" },
  scream: { game: "Valorant", sens: 0.785, dpi: 400, fov: "103" },
  zywoo: { game: "CS2", sens: 1.9, dpi: 400, fov: "68" },
  s1mple: { game: "CS2", sens: 3.09, dpi: 400, fov: "68" },
  aceu: { game: "Apex", sens: 1.8, dpi: 800, fov: "110" },
  mendo: { game: "Apex", sens: 1.2, dpi: 800, fov: "110" },
  super: { game: "OW2", sens: 4.0, dpi: 800, fov: "103" },
  pengu: { game: "R6", sens: 12, dpi: 400, fov: "60" },
  ibiza: { game: "PUBG", sens: 45, dpi: 800, fov: "103" },
  mongraal: { game: "Fortnite", sens: 12, dpi: 800, fov: "80" },
benjyfishy: { game: "Fortnite", sens: 10, dpi: 800, fov: "80" },
mrsavage: { game: "Fortnite", sens: 11, dpi: 1450, fov: "80" },
clix: { game: "Fortnite", sens: 8, dpi: 800, fov: "80" },
bugha: { game: "Fortnite", sens: 9, dpi: 800, fov: "80" },
tfue: { game: "Fortnite", sens: 70, dpi: 400, fov: "80" }
};

/* ------------------ FONCTIONS ------------------ */

function convert() {
  const fromGame = document.getElementById("fromGame").value;
  const toGame = document.getElementById("toGame").value;
  const sens = parseFloat(document.getElementById("fromSens").value);

  if (!sens) {
    document.getElementById("result").innerText = "Entre une sens valide.";
    return;
  }

  const valorantEquivalent = sens / ratios[fromGame];
  const finalSens = valorantEquivalent * ratios[toGame];

  document.getElementById("result").innerText =
    translations[currentLang].result + finalSens.toFixed(3);
}

function loadProSettings() {
  const player = document.getElementById("proPlayer").value;

  if (!player) {
    document.getElementById("proInfo").innerHTML = "";
    return;
  }

  const p = proSettings[player];

  document.getElementById("proInfo").innerHTML =
    `Jeu : ${p.game}<br>
     Sens : ${p.sens}<br>
     DPI : ${p.dpi}<br>
     FOV : ${p.fov}`;
}

function applyProSens() {
  const player = document.getElementById("proPlayer").value;
  if (!player) return;
  document.getElementById("fromSens").value = proSettings[player].sens;
}

function applyProDpi() {
  const player = document.getElementById("proPlayer").value;
  if (!player) return;
  document.getElementById("dpi").value = proSettings[player].dpi;
}

function copySens() {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text);
  alert("Sensi copiée !");
}
function loadProSettings() {
  const player = document.getElementById("proPlayer").value;

  if (!player) {
    document.getElementById("proInfo").innerHTML = "";
    return;
  }

  const p = proSettings[player];

  // Affichage spécial pour Fortnite (en %)
  let sensDisplay = p.sens;
  if (p.game === "Fortnite") {
    sensDisplay = p.sens + "%";
  }

  document.getElementById("proInfo").innerHTML =
    `Jeu : ${p.game}<br>
     Sens : ${sensDisplay}<br>
     DPI : ${p.dpi}<br>
     FOV : ${p.fov}`;
}
