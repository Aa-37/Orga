document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.getElementById("popup-overlay");
    const addTaskButton = document.getElementById("add-task-btn");
    const submitFeedbackButton = document.getElementById("submit-feedback");
    const endDayButton = document.getElementById("end-day-btn");

    const taskTitleInput = document.getElementById("task-title");
    const taskDateInput = document.getElementById("task-date");
    const taskTimeInput = document.getElementById("task-time");
    const taskList = document.getElementById("task-list");
    
    const feedbackWeight = document.getElementById("feedback-weight");
    const feedbackReps = document.getElementById("feedback-reps");
    
    const progressChartCanvas = document.getElementById("progressChart");
    let progressChart;

    // 1. Afficher et masquer le popup pour la journée
    function checkPopupDisplay() {
        const today = new Date().toDateString();
        const lastEndDay = localStorage.getItem("lastEndDay");

        if (lastEndDay !== today) {
            popupOverlay.style.display = "flex";
        } else {
            popupOverlay.style.display = "none";
        }
    }

    // 2. Ajouter une tâche et actualiser l'affichage
    function addTask() {
        const title = taskTitleInput.value.trim();
        const date = taskDateInput.value;
        const time = taskTimeInput.value;

        if (title && date && time) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push({ title, date, time, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskTitleInput.value = "";
            taskDateInput.value = "";
            taskTimeInput.value = "";
            updateTaskList();
        }
    }

    // 3. Mettre à jour la liste des tâches dans le DOM
    function updateTaskList() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.title} - ${task.date} ${task.time}`;
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                task.completed = checkbox.checked;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                updateTaskList();
            });
            li.prepend(checkbox);
            taskList.appendChild(li);
        });
    }

    // 4. Soumettre un feedback et ajouter une entrée au graphique
    function submitFeedback() {
        const weight = parseFloat(feedbackWeight.value);
        const reps = parseInt(feedbackReps.value, 10);

        if (!isNaN(weight) && !isNaN(reps)) {
            const today = new Date().toDateString();
            const progressData = JSON.parse(localStorage.getItem("progressData")) || [];
            progressData.push({ date: today, progress: Math.min(weight * reps / 100, 100) });
            localStorage.setItem("progressData", JSON.stringify(progressData));
            feedbackWeight.value = "";
            feedbackReps.value = "";
            updateProgressChart(progressData);
        }
    }

    // 5. Terminer la journée et sauvegarder l'état
    function endDay() {
        const today = new Date().toDateString();
        localStorage.setItem("lastEndDay", today);
        checkPopupDisplay();
    }

    // 6. Mettre à jour le graphique de progression avec les données
    function updateProgressChart(data) {
        const ctx = progressChartCanvas.getContext('2d');
        if (progressChart) {
            progressChart.destroy();
        }
        progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => item.date),
                datasets: [{
                    label: 'Avancement',
                    data: data.map(item => item.progress),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Pourcentage d\'achèvement'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Dates'
                        }
                    }
                }
            }
        });
    }

    // Initialisation et événements
    function initialize() {
        checkPopupDisplay();
        updateTaskList();

        const progressData = JSON.parse(localStorage.getItem("progressData")) || [];
        updateProgressChart(progressData);

        addTaskButton.addEventListener("click", addTask);
        submitFeedbackButton.addEventListener("click", submitFeedback);
        endDayButton.addEventListener("click", endDay);
    }

    initialize();
});
