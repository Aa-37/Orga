// Vérifier si le script est chargé
console.log("Le script JavaScript est chargé.");

// Obtenir les éléments du DOM
const startDayButton = document.getElementById('start-day-btn');
const endDayButton = document.getElementById('end-day-btn');
const popupOverlay = document.getElementById('popup-overlay');
const popupDate = document.getElementById('popup-date');
const additionalTasksList = document.getElementById('additional-tasks');
const submitFeedbackButton = document.getElementById('submit-feedback');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Fonction pour ajouter une tâche
function addTask() {
    const taskTitle = document.getElementById('task-title').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const taskPriority = document.getElementById('task-priority').value;

    if (taskTitle) {
        const taskItem = document.createElement('li');
        taskItem.textContent = `${taskTitle} - ${taskDate} ${taskTime} (${taskPriority})`;
        taskList.appendChild(taskItem);
        document.getElementById('task-title').value = ''; // Réinitialiser le champ de saisie
        document.getElementById('task-date').value = '';
        document.getElementById('task-time').value = '';
    }
}

// Événements pour les boutons
addTaskButton.addEventListener('click', addTask);

// Afficher le popup et ajouter un écouteur pour le bouton "Terminer ma journée"
endDayButton.addEventListener('click', function () {
    const today = new Date();
    popupDate.textContent = today.toLocaleDateString();
    additionalTasksList.innerHTML = ''; // Réinitialiser la liste des tâches additionnelles

    // Afficher le popup
    popupOverlay.style.display = 'flex';
});

// Événement pour le bouton "Commencer ma journée"
startDayButton.addEventListener('click', function () {
    popupOverlay.style.display = 'none'; // Cacher le popup
});

// Soumettre le feedback
submitFeedbackButton.addEventListener('click', function () {
    const weight = document.getElementById('feedback-weight').value;
    const reps = document.getElementById('feedback-reps').value;
    // Logique de soumission de feedback à définir ici
    console.log(`Feedback soumis: ${weight}kg, ${reps} répétitions`);
});

