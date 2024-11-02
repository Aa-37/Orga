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
    });

    endDayButton.addEventListener("click", () => {
        alert("Bien joué ! N'oubliez pas de vous reposer et de vous hydrater.");
    });

    const exerciseList = document.getElementById("exercise-list");
    const workoutTitle = document.getElementById("workout-title");
    
    // Define workout plan
    const workoutPlan = {
        "lundi": {
            title: "Haut du Corps + Abdos",
            exercises: [
                { name: "Élévations latérales avec haltères", series: "4 x 15 répétitions", rest: "Repos : 45 sec" },
                { name: "Pompes avec haltères", series: "3 x 20 répétitions", rest: "Repos : 1 min" },
                { name: "Row incliné (tirage incliné)", series: "4 x 12 répétitions", rest: "Repos : 1 min" },
                { name: "Curls marteau avec haltères", series: "4 x 15 répétitions", rest: "Repos : 45 sec" },
                { name: "Russian Twist", series: "3 x 20 répétitions", rest: "Repos : 30 sec" },
                { name: "Toe Touch avec un poids", series: "3 x 15 répétitions", rest: "Repos : 30 sec" }
            ]
        },
        "mardi": {
            title: "Bas du Corps + Cardio",
            exercises: [
                { name: "Squats bulgares (un pied surélevé)", series: "4 x 12 répétitions par jambe", rest: "Repos : 1 min" },
                { name: "Jumping Jacks", series: "3 x 50 répétitions", rest: "Repos : 30 sec" },
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
                { name: "Élévations latérales avec haltères", series: "4 x 15 répétitions", rest: "Repos : 45 sec" },
                { name: "Pompes avec haltères", series: "3 x 20 répétitions", rest: "Repos : 1 min" },
                { name: "Row incliné (tirage incliné)", series: "4 x 12 répétitions", rest: "Repos : 1 min" },
                { name: "Curls marteau avec haltères", series: "4 x 15 répétitions", rest: "Repos : 45 sec" },
                { name: "Russian Twist", series: "3 x 20 répétitions", rest: "Repos : 30 sec" },
                { name: "Toe Touch avec un poids", series: "3 x 15 répétitions", rest: "Repos : 30 sec" }
            ]
        },
        "vendredi": {
            title: "Bas du Corps + Cardio",
            exercises: [
                { name: "Squats bulgares (un pied surélevé)", series: "4 x 12 répétitions par jambe", rest: "Repos : 1 min" },
                { name: "Jumping Jacks", series: "3 x 50 répétitions", rest: "Repos : 30 sec" },
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
                { name: "Squats bulgares", series: "40 secondes", rest: "Repos : 20 sec" },
                { name: "Russian Twist", series: "40 secondes", rest: "Repos : 20 sec" },
                { name: "Jumping Jacks", series: "40 secondes", rest: "Repos : 20 sec" },
                { name: "Planche", series: "40 secondes", rest: "Repos : 20 sec" },
            ]
        },
        "dimanche": {
            title: "Repos complet",
            exercises: []
        }
    };

    function displayWorkout() {
        const today = new Date();
        const options = { weekday: 'long' };
        const dayName = today.toLocaleDateString('fr-FR', options);
        
        workoutTitle.textContent = workoutPlan[dayName].title;
        exerciseList.innerHTML = "";

        workoutPlan[dayName].exercises.forEach(exercise => {
            const li = document.createElement("li");
            li.innerHTML = `${exercise.name} - ${exercise.series} (${exercise.rest})`;
            exerciseList.appendChild(li);
        });
    }

    displayWorkout();

    // Tâches et devoirs
    const taskList = document.getElementById("task-list");
    const addTaskButton = document.getElementById("add-task-btn");
    const taskTitleInput = document.getElementById("task-title");
    const taskDateInput = document.getElementById("task-date");
    const taskTimeInput = document.getElementById("task-time");
    const calendarTaskList = document.getElementById("calendar-task-list");

    function addTask() {
        const title = taskTitleInput.value.trim();
        const dueDate = taskDateInput.value;
        const dueTime = taskTimeInput.value;

        if (title && dueDate && dueTime) {
            const taskDateTime = new Date(`${dueDate}T${dueTime}`);
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" aria-label="Marquer la tâche ${title} comme terminée"> <span>${title}</span>`;
            li.querySelector("input").addEventListener("change", () => {
                li.querySelector("span").classList.toggle("completed");
            });
            taskList.appendChild(li);
            updateLocalStorageTasks();

            // Add task to the calendar
            const calendarLi = document.createElement("li");
            calendarLi.innerHTML = `<span>${title} - Échéance : ${taskDateTime.toLocaleString("fr-FR")}</span>`;
            calendarTaskList.appendChild(calendarLi);

            // Clear input fields
            taskTitleInput.value = "";
            taskDateInput.value = "";
            taskTimeInput.value = "";
            alert(`Tâche "${title}" ajoutée avec succès !`);
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    }

    function updateLocalStorageTasks() {
        const tasks = Array.from(taskList.children).map((li) => li.innerHTML);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskButton.addEventListener("click", addTask);

    // Charge les tâches depuis localStorage à l'ouverture de la page
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskHTML => {
            const li = document.createElement("li");
            li.innerHTML = taskHTML;
            taskList.appendChild(li);
        });
    }

    loadTasks();

    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            tabs.forEach(t => document.querySelector(`#${t.getAttribute("data-tab")}`).classList.remove("active"));
            document.querySelector(`#${e.target.getAttribute("data-tab")}`).classList.add("active");
        });
    });

    // Objectifs d'hydratation
    const hydrationCheckbox = document.getElementById("goal-hydration");
    hydrationCheckbox.addEventListener("change", () => {
        alert("Bien joué ! Continuez à bien vous hydrater.");
    });
});
