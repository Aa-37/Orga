document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.getElementById("popup-overlay");
    const startDayButton = document.getElementById("start-day-btn");
    const endDayButton = document.getElementById("end-day-btn");
    const popupDate = document.getElementById("popup-date");
    const additionalTasksList = document.getElementById("additional-tasks");
    const tabs = document.querySelectorAll("nav a");

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
        resetDailyData();
    });

    const exerciseList = document.getElementById("exercise-list");
    const taskList = document.getElementById("task-list");
    const addExerciseButton = document.getElementById("add-exercise-btn");
    const addTaskButton = document.getElementById("add-task-btn");
    const taskTitleInput = document.getElementById("task-title");
    const taskPrioritySelect = document.getElementById("task-priority");
    const taskDateInput = document.getElementById("task-date");

    function resetDailyData() {
        // Reset daily data in local storage or update necessary data
        localStorage.setItem("tasks", JSON.stringify([]));
        localStorage.setItem("exercises", JSON.stringify([]));
    }

    function addExercise() {
        const exerciseName = prompt("Entrez le nom de l'exercice :");
        if (exerciseName) {
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" aria-label="Marquer ${exerciseName} comme terminé"> ${exerciseName}`;
            exerciseList.appendChild(li);
            updateLocalStorageExercises();
            alert(`Exercice "${exerciseName}" ajouté avec succès !`);
        }
    }

    function addTask() {
        const title = taskTitleInput.value.trim();
        const priority = taskPrioritySelect.value;
        const dueDate = taskDateInput.value;

        if (title && dueDate) {
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" aria-label="Marquer la tâche ${title} comme terminée"> ${title} (Priorité: ${priority}) - Échéance: ${dueDate}`;
            taskList.appendChild(li);
            updateLocalStorageTasks();
            taskTitleInput.value = "";
            taskDateInput.value = "";
            alert(`Tâche "${title}" ajoutée avec succès !`);
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    }

    function updateLocalStorageTasks() {
        const tasks = Array.from(taskList.children).map((li) => li.innerHTML);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateLocalStorageExercises() {
        const exercises = Array.from(exerciseList.children).map((li) => li.innerHTML);
        localStorage.setItem("exercises", JSON.stringify(exercises));
    }

    addExerciseButton.addEventListener("click", addExercise);
    addTaskButton.addEventListener("click", addTask);

    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            tabs.forEach(t => document.querySelector(`#${t.getAttribute("data-tab")}`).classList.remove("active"));
            document.querySelector(`#${e.target.getAttribute("data-tab")}`).classList.add("active");
        });
    });

    // Load exercises and tasks from localStorage on page load
    function loadExercises() {
        const exercises = JSON.parse(localStorage.getItem("exercises")) || [];
        exercises.forEach(exerciseHTML => {
            const li = document.createElement("li");
            li.innerHTML = exerciseHTML;
            exerciseList.appendChild(li);
        });
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskHTML => {
            const li = document.createElement("li");
            li.innerHTML = taskHTML;
            taskList.appendChild(li);
        });
    }

    loadExercises();
    loadTasks();
});
