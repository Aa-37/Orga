document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById("popup-overlay");
  const startDayButton = document.getElementById("start-day-btn");
  const endDayButton = document.getElementById("end-day-btn");
  const popupDate = document.getElementById("popup-date");

  function getTodayDateString() {
    const today = new Date();
    return today.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
  }

  function shouldShowPopup() {
    const lastShownDate = localStorage.getItem("lastPopupDate");
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (!lastShownDate || (new Date(lastShownDate).toDateString() !== currentDate.toDateString() && currentHour >= 7)) {
      return true;
    }
    return false;
  }

  if (shouldShowPopup()) {
    popupDate.textContent = getTodayDateString();
    popupOverlay.style.display = "flex";
  }

  startDayButton.addEventListener("click", () => {
    popupOverlay.style.display = "none";
    localStorage.setItem("lastPopupDate", new Date().toDateString());
  });

  endDayButton.addEventListener("click", () => {
    localStorage.removeItem("lastPopupDate");
    alert("Résumé de la journée terminé ! Le pop-up se réinitialisera pour demain.");
  });

  const tabs = document.querySelectorAll("nav a");
  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
});
