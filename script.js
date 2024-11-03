document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.getElementById("popup-overlay");
    const startDayButton = document.getElementById("start-day-btn");
    const endDayButton = document.getElementById("end-day-btn");
    const additionalTasksList = document.getElementById("additional-tasks");
    const popupDate = document.getElementById("popup-date");
    const taskTitleInput = document.getElementById("task-title");
    const taskPriorityInput = document.getElementById("task-priority");
    const taskDateInput = document.getElementById("task-date");
    const taskTimeInput = document.getElementById("task-time");
    const addTaskButton = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // Fonction d'affichage du popup selon l'état de fin de journée
    function showPopup() {
        const today = new Date().toISOString().slice(0, 10);
        const lastEndDate = localStorage.getItem("lastEndDate");

        if (lastEndDate !== today) {
            popupOverlay.style.display = "flex";
            popupDate.textContent = `Résumé de la journée du ${today}`;
            updatePopupTasks();
        }
    }

    // Mise à jour des tâches affichées dans le popup
    function updatePopupTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        additionalTasksList.innerHTML = ""; // Réinitialise la liste

        tasks.filter(task => !task.completed).forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.title} (Échéance: ${task.date} à ${task.time})`;
            additionalTasksList.appendChild(li);
        });
    }

    // Sauvegarder une nouvelle tâche
    function saveTask() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const task = {
            title: taskTitleInput.value,
            priority: taskPriorityInput.value,
            date: taskDateInput.value,
            time: taskTimeInput.value,
            completed: false
        };

        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTasks(); // Mets à jour l'affichage des tâches
    }

    // Mettre à jour l'affichage de la liste des tâches
    function updateTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = `${task.title} - ${task.date} ${task.time}`;
            li.classList.add(task.completed ? "completed" : "");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                updateTasks();
            });

            li.prepend(checkbox);
            taskList.appendChild(li);
        });
    }

    // Gestion de la fin de journée
    function endDay() {
        localStorage.setItem("lastEndDate", new Date().toISOString().slice(0, 10));
        popupOverlay.style.display = "flex";
        updatePopupTasks();
    }

    // Gestion des événements
    startDayButton.addEventListener("click", () => popupOverlay.style.display = "none");
    endDayButton.addEventListener("click", endDay);
    addTaskButton.addEventListener("click", saveTask);

    // Initialisation
    updateTasks();
    showPopup();
});
