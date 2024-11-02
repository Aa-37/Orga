document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.getElementById("popup-overlay");
    const startDayButton = document.getElementById("start-day-btn");
    const endDayButton = document.getElementById("end-day-btn");
    const popupDate = document.getElementById("popup-date");
    const additionalTasksList = document.getElementById("additional-tasks");
    const tabs = document.querySelectorAll("nav a");
    const tabContents = document.querySelectorAll(".tab-content");
    const taskTitleInput = document.getElementById("task-title");
    const taskDateInput = document.getElementById("task-date");
    const taskTimeInput = document.getElementById("task-time");
    const addTaskButton = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const calendarTaskList = document.getElementById("calendar-task-list");
    const calendarDaysContainer = document.getElementById("calendar-days");
    const workoutTitle = document.getElementById("workout-title");
    const exerciseList = document.getElementById("exercise-list");
    const hydrationGoalCheckbox = document.getElementById("goal-hydration");

    // Function to update tasks from local storage
    function updateTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        calendarTaskList.innerHTML = "";
        tasks.forEach((task) => {
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
            calendarTaskList.appendChild(li.cloneNode(true));
        });
    }

    // Function to update workout plan based on the day of the week
    function updateWorkoutPlan() {
        const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        const today = new Date();
        const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // Adjust for Sunday to be the last day (index 6)

        const workouts = [
            {
                title: "Haut du Corps + Abdos",
                exercises: [
                    { name: "Élévations latérales avec haltères", sets: "4 x 15", rest: "45 sec" },
                    { name: "Pompes avec haltères", sets: "3 x 20", rest: "1 min" },
                    { name: "Row incliné", sets: "4 x 12", rest: "1 min" },
                    { name: "Curls marteau avec haltères", sets: "4 x 15", rest: "45 sec" },
                    { name: "Russian Twist", sets: "3 x 20", rest: "30 sec" },
                    { name: "Toe Touch avec un poids", sets: "3 x 15", rest: "30 sec" },
                ],
            },
            {
                title: "Bas du Corps + Cardio",
                exercises: [
                    { name: "Squats bulgares", sets: "4 x 12 par jambe", rest: "1 min" },
                    { name: "Jumping Jacks", sets: "3 x 50", rest: "30 sec" },
                    { name: "Corde à sauter", sets: "4 x 1 min", rest: "30 sec" },
                    { name: "Planche", sets: "3 x 45 sec", rest: "30 sec" },
                ],
            },
            { title: "MMA", exercises: [] },
            {
                title: "Haut du Corps + Abdos (Intensité élevée)",
                exercises: [] // Replicate Day 1 exercises
            },
            {
                title: "Bas du Corps + Cardio",
                exercises: [] // Replicate Day 2 exercises
            },
            {
                title: "Circuit Complet (tout le corps)",
                exercises: [
                    { name: "Corde à sauter", sets: "40 sec", rest: "20 sec" },
                    { name: "Pompes avec haltères", sets: "40 sec", rest: "20 sec" },
                    { name: "Row incliné", sets: "40 sec", rest: "20 sec" },
                    { name: "Squats bulgares", sets: "40 sec", rest: "20 sec" },
                    { name: "Russian Twist", sets: "40 sec", rest: "20 sec" },
                    { name: "Jumping Jacks", sets: "40 sec", rest: "20 sec" },
                    { name: "Planche", sets: "40 sec", rest: "20 sec" },
                ],
            },
            { title: "Repos complet", exercises: [] },
        ];

        const workoutToday = workouts[dayIndex];
        workoutTitle.textContent = `Programme du ${daysOfWeek[dayIndex]} : ${workoutToday.title}`;
        exerciseList.innerHTML = workoutToday.exercises.map(exercise => `
            <li>
                ${exercise.name || "Repos"} - Séries: ${exercise.sets || "N/A"} - Repos: ${exercise.rest || "N/A"}
            </li>
        `).join('');
    }

    // Function to initialize the calendar
    function initializeCalendar() {
        const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        calendarDaysContainer.innerHTML = daysOfWeek.map(day => `
            <div class="day-column">
                <h4>${day}</h4>
                <ul id="calendar-task-list">
                    <!-- Tasks for the day will go here -->
                </ul>
            </div>
        `).join('');
    }

    // Function to reset local storage at the start of each week
    function resetLocalStorageWeekly() {
        const now = new Date();
        const lastReset = localStorage.getItem("lastReset");
        if (!lastReset || new Date(lastReset).getTime() < now.setHours(0, 0, 0, 0) - (now.getDay() * 24 * 60 * 60 * 1000)) {
            localStorage.setItem("tasks", JSON.stringify([]));
            localStorage.setItem("lastReset", new Date().toISOString());
        }
    }

    // Event listeners
    startDayButton.addEventListener("click", () => {
        popupOverlay.style.display = "none";
        resetLocalStorageWeekly();
        updateTasks();
    });

    endDayButton.addEventListener("click", () => {
        const tasksCompleted = document.querySelectorAll("#task-list input[type='checkbox']:checked");
        additionalTasksList.innerHTML = "";

        tasksCompleted.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.parentElement.textContent.trim();
            additionalTasksList.appendChild(li);
        });

        popupDate.textContent = `Résumé de la journée - ${getTodayDateString()}`;
        popupOverlay.style.display = "flex"; // Affiche le popup
    });

    // Manage tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove("active"));

            // Show the corresponding tab content
            tabContents[index].classList.add("active");

            // Update active state of tabs
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });

    // Show the first tab by default
    tabContents[0].classList.add("active");
    tabs[0].classList.add("active");

    // Add task functionality
    addTaskButton.addEventListener("click", () => {
        const title = taskTitleInput.value;
        const date = taskDateInput.value;
        const time = taskTimeInput.value;

        if (title && date && time) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push({ title, date, time, completed: false });
            localStorage.setItem("tasks", JSON.stringify(tasks));

            taskTitleInput.value = "";
            taskDateInput.value = "";
            taskTimeInput.value = "";
            updateTasks();
        }
    });

    // Initialize the app
    updateWorkoutPlan();
    initializeCalendar();
    resetLocalStorageWeekly();
    updateTasks();
});

// Helper function to get today's date in string format
function getTodayDateString() {
    const today = new Date();
    return today.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
