document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("popup-overlay");
  const startDayButton = document.getElementById("start-day-btn");
  const popupDate = document.getElementById("popup-date");

  // Fonction pour afficher la date d'aujourd'hui dans le format requis
  function getTodayDateString() {
    const today = new Date();
    return today.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  }

  // Fonction pour vérifier si le pop-up doit être affiché
  function shouldShowPopup() {
    const lastShownDate = localStorage.getItem("lastPopupDate");
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    // Affiche le pop-up si aucune date n'est enregistrée ou si la date est différente et il est après 7h
    if (!lastShownDate || (new Date(lastShownDate).toDateString() !== currentDate.toDateString() && currentHour >= 7)) {
      return true;
    }
    return false;
  }

  // Afficher le pop-up si les conditions sont remplies
  if (shouldShowPopup()) {
    popupDate.textContent = getTodayDateString();
    popupOverlay.style.display = "flex";
  }

  // Bouton pour fermer le pop-up
  startDayButton.addEventListener("click", () => {
    popupOverlay.style.display = "none";
    // Enregistre la date du jour pour éviter que le pop-up réapparaisse
    localStorage.setItem("lastPopupDate", new Date().toDateString());
  });
});
