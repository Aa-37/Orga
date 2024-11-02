<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Suivi d'Entraînement et de Tâches</title>
</head>
<body>
    <div id="popup-overlay" class="popup-overlay">
        <div class="popup">
            <h2 id="popup-date"></h2>
            <button id="start-day-btn" aria-label="Commencer la journée">Commencer la journée</button>
            <button id="end-day-btn" aria-label="Finir la journée">Finir la journée</button>
        </div>
    </div>

    <div class="tabs">
        <button data-tab="workout" aria-label="Afficher l'onglet Entraînement">Entraînement</button>
        <button data-tab="tasks" aria-label="Afficher l'onglet Devoirs et Tâches">Devoirs et Tâches</button>
        <button data-tab="calendar" aria-label="Afficher l'onglet Calendrier">Calendrier</button>
        <button data-tab="dashboard" aria-label="Afficher l'onglet Tableau de Bord">Tableau de Bord</button>
    </div>

    <div id="workout" class="tab-content">
        <h1 id="workout-title"></h1>
        <ul id="exercise-list"></ul>
    </div>

    <div id="tasks" class="tab-content">
        <h1>Devoirs et Tâches</h1>
        <input type="text" id="task-title" placeholder="Titre de la tâche" aria-label="Titre de la tâche">
        <input type="date" id="task-date" aria-label="Date d'échéance">
        <input type="time" id="task-time" aria-label="Heure d'échéance">
        <button id="add-task-btn" aria-label="Ajouter une tâche">Ajouter Tâche</button>
        <ul id="task-list"></ul>
    </div>

    <div id="calendar" class="tab-content">
        <h1>Calendrier</h1>
        <ul id="calendar-task-list"></ul>
    </div>

    <div id="dashboard" class="tab-content">
        <h1>Tableau de Bord</h1>
        <label>
            <input type="checkbox" id="goal-hydration" aria-label="Objectif d'hydratation atteint">
            Hydratation atteinte aujourd'hui
        </label>
        <h2>Progrès des Exercices</h2>
        <div id="progress-tracker"></div>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const popupOverlay = document.getElementById("popup-overlay");
            const popupDate = document.getElementById("popup-date");
            const startDayButton = document.getElementById("start-day-btn");
            const endDayButton = document.getElementById("end-day-btn");
            const exerciseList = document.getElementById("exercise-list");
            const workoutTitle = document.getElementById("workout-title");
            const taskTitleInput = document.getElementById("task-title");
            const taskDateInput = document.getElementById("task-date");
            const taskTimeInput = document.getElementById("task-time");
            const addTaskButton = document.getElementById("add-task-btn");
            const taskList = document.getElementById("task-list");
            const calendarTaskList = document.getElementById("calendar-task-list");
            const progressTracker = document.getElementById("progress-tracker");
            const tabs = document.querySelectorAll(".tabs button");

            // Define workout plan
            const workoutPlan = {
                "lundi": {
                    title: "Haut du Corps + Abdos",
                    exercises: [
                        { name: "Élévations latérales avec haltères", series: "4 x 15 répétitions (2 sec montée, 3 sec descente)", rest: "Repos : 45 sec" },
                        { name: "Pompes avec haltères", series: "3 x 20 répétitions (3 sec descente, 1 sec montée)", rest: "Repos : 1 min" },
                        { name: "Row incliné (tirage incliné)", series: "4 x 12 répétitions (2 sec tirer, 2 sec relâcher)", rest: "Repos : 1 min" },
                        { name: "Curls marteau avec haltères", series: "4 x 15 répétitions (2 sec lever, 2 sec descendre)", rest: "Repos : 45 sec" },
                        { name: "Russian Twist", series: "3 x 20 répétitions (10 par côté)", rest: "Repos : 30 sec" },
                        { name: "Toe Touch avec un poids", series: "3 x 15 répétitions (1 sec toucher, 2 sec descendre)", rest: "Repos : 30 sec" }
                    ]
                },
                "mardi": {
                    title: "Bas du Corps + Cardio",
                    exercises: [
                        { name: "Squats bulgares (un pied surélevé)", series: "4 x 12 répétitions par jambe (3 sec descente, 1 sec montée)", rest: "Repos : 1 min" },
                        { name: "Jumping Jacks", series: "3 x 50 répétitions (rythme rapide)", rest: "Repos : 30 sec" },
                        { name: "Corde à sauter", series: "4 x 1 min", rest: "Repos : 30 sec" },
                        { name: "Planche", series: "3 x 45 sec", rest: "Repos : 30 sec" }
                    ]
                },
                "mercredi": {
                    title: "MMA",
                    exercises: []
                },
                "jeudi": {
                    title: "Haut du Corps + Abdos",
                    exercises: [
                        { name: "Élévations latérales avec haltères", series: "4 x 15 répétitions (2 sec montée, 3 sec descente)", rest: "Repos : 45 sec" },
                        { name: "Pompes avec haltères", series: "3 x 20 répétitions (3 sec descente, 1 sec montée)", rest: "Repos : 1 min" },
                        { name: "Row incliné (tirage incliné)", series: "4 x 12 répétitions (2 sec tirer, 2 sec relâcher)", rest: "Repos : 1 min" },
                        { name: "Curls marteau avec haltères", series: "4 x 15 répétitions (2 sec lever, 2 sec descendre)", rest: "Repos : 45 sec" },
                        { name: "Russian Twist", series: "3 x 20 répétitions (10 par côté)", rest: "Repos : 30 sec" },
                        { name: "Toe Touch avec un poids", series: "3 x 15 répétitions (1 sec toucher, 2 sec descendre)", rest: "Repos : 30 sec" }
                    ]
                },
                "vendredi": {
                    title: "Bas du Corps + Cardio",
                    exercises: [
                        { name: "Squats bulgares (un pied surélevé)", series: "4 x 12 répétitions par jambe (3 sec descente, 1 sec montée)", rest: "Repos : 1 min" },
                        { name: "Jumping Jacks", series: "3 x 50 répétitions (rythme rapide)", rest: "Repos : 30 sec" },
                        { name: "Corde à sauter", series: "4 x 1 min", rest: "Repos : 30 sec" },
                        { name: "Planche", series: "3 x 45 sec", rest: "Repos : 30 sec" }
                    ]
                },
                "samedi": {
                    title: "Circuit Complet (tout le corps)",
                    exercises: [
                        { name: "Corde à sauter", series: "40 secondes", rest: "Repos : 20 sec" },
                        { name: "Pompes avec haltères", series: "40 secondes", rest: "Repos : 20 sec" },
                        { name: "Row incliné", series: "40 secondes", rest: "Repos : 20 sec" },
                        { name: "Squats", series: "40 secondes", rest: "Repos : 20 sec" },
                        { name: "Planche", series: "40 secondes", rest: "Repos : 20 sec" }
                    ]
                },
                "dimanche": {
                    title: "Repos",
                    exercises: []
                }
            };

            // Get today's date string
            function getTodayDateString() {
                const today = new Date();
                return today.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                });
            }

            // Show popup if today is the first time visiting
            function shouldShowPopup() {
                const lastShownDate = localStorage.getItem("lastPopupDate");
                const currentDate = new Date();
                const currentHour = currentDate.getHours();

                if (!lastShownDate || (new Date(lastShownDate).toDateString() !== currentDate.toDateString() && currentHour < 12)) {
                    localStorage.setItem("lastPopupDate", currentDate);
                    return true;
                }
                return false;
            }

            if (shouldShowPopup()) {
                popupDate.textContent = `Aujourd'hui, ${getTodayDateString()}`;
                popupOverlay.style.display = "flex";
            }

            startDayButton.addEventListener("click", () => {
                alert("Commencez votre journée avec énergie !");
                popupOverlay.style.display = "none";
                const today = new Date().toLocaleDateString("fr", { weekday: 'long' }).toLowerCase();
                displayWorkout(today);
            });

            endDayButton.addEventListener("click", () => {
                alert("Bien joué ! N'oubliez pas de vous reposer et de vous hydrater.");
                popupOverlay.style.display = "none";
            });

            function displayWorkout(day) {
                const workout = workoutPlan[day];
                if (workout) {
                    workoutTitle.textContent = workout.title;
                    exerciseList.innerHTML = "";
                    workout.exercises.forEach(exercise => {
                        const li = document.createElement("li");
                        li.textContent = `${exercise.name} - ${exercise.series} (${exercise.rest})`;
                        exerciseList.appendChild(li);
                    });
                } else {
                    workoutTitle.textContent = "Pas d'entraînement prévu pour aujourd'hui.";
                    exerciseList.innerHTML = "";
                }
            }

            // Task management
            addTaskButton.addEventListener("click", () => {
                const title = taskTitleInput.value.trim();
                const date = taskDateInput.value;
                const time = taskTimeInput.value;

                if (title && date) {
                    const li = document.createElement("li");
                    li.textContent = `${title} - ${date} ${time ? `à ${time}` : ''}`;
                    taskList.appendChild(li);

                    // Reset inputs
                    taskTitleInput.value = '';
                    taskDateInput.value = '';
                    taskTimeInput.value = '';
                }
            });

            // Change tabs
            tabs.forEach(tab => {
                tab.addEventListener("click", () => {
                    const activeTab = document.querySelector(".tab-content.active");
                    if (activeTab) {
                        activeTab.classList.remove("active");
                    }
                    const newTab = document.getElementById(tab.getAttribute("data-tab"));
                    if (newTab) {
                        newTab.classList.add("active");
                    }
                });
            });
        });
    </script>
</body>
</html>
