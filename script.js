// Vérifier si JavaScript est chargé
console.log('JavaScript est chargé');

// Fonction pour activer un onglet spécifique
function activateTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Gestionnaire d'événements pour les liens de navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const tabId = event.target.getAttribute('data-tab');
        activateTab(tabId);
    });
});

// Gestion des tâches
const addTaskButton = document.getElementById('add-task-btn');
const taskTitleInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');
const taskPrioritySelect = document.getElementById('task-priority');
const taskDateInput = document.getElementById('task-date');
const taskTimeInput = document.getElementById('task-time');

// Ajout d'une tâche
addTaskButton.addEventListener('click', () => {
    const title = taskTitleInput.value.trim();
    const priority = taskPrioritySelect.value;
    const date = taskDateInput.value;
    const time = taskTimeInput.value;

    if (title) {
        const listItem = document.createElement('li');
        listItem.textContent = `${title} - Priorité: ${priority} - Date: ${date} - Heure: ${time}`;
        taskList.appendChild(listItem);
        
        // Réinitialisation des champs
        taskTitleInput.value = '';
        taskDateInput.value = '';
        taskTimeInput.value = '';
    } else {
        alert('Veuillez entrer un titre pour la tâche.');
    }
});

// Gestion des retours d'expérience
const submitFeedbackButton = document.getElementById('submit-feedback');
const feedbackWeightInput = document.getElementById('feedback-weight');
const feedbackRepsInput = document.getElementById('feedback-reps');

// Soumettre le feedback
submitFeedbackButton.addEventListener('click', () => {
    const weight = feedbackWeightInput.value;
    const reps = feedbackRepsInput.value;

    if (weight && reps) {
        alert(`Feedback soumis: Poids: ${weight} kg, Répétitions: ${reps}`);
        
        // Réinitialisation des champs
        feedbackWeightInput.value = '';
        feedbackRepsInput.value = '';
    } else {
        alert('Veuillez entrer à la fois le poids et le nombre de répétitions.');
    }
});

// Affichage du popup
const popupOverlay = document.getElementById('popup-overlay');
const popupDate = document.getElementById('popup-date');
const additionalTasksList = document.getElementById('additional-tasks');
const startDayButton = document.getElementById('start-day-btn');

// Ouvrir le popup
startDayButton.addEventListener('click', () => {
    const today = new Date();
    popupDate.textContent = `Date: ${today.toLocaleDateString()}`;
    
    // Récupérer les tâches supplémentaires
    const tasks = Array.from(taskList.children).map(li => li.textContent);
    additionalTasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        additionalTasksList.appendChild(li);
    });

    popupOverlay.style.display = 'flex'; // Afficher le popup
});

// Fermer le popup en cliquant en dehors du contenu
popupOverlay.addEventListener('click', (event) => {
    if (event.target === popupOverlay) {
        popupOverlay.style.display = 'none';
    }
});

// Gestion du bouton "Terminer ma journée"
const endDayButton = document.getElementById('end-day-btn');

// Fermer le popup et réinitialiser les tâches
endDayButton.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    taskList.innerHTML = ''; // Réinitialiser la liste des tâches
    alert('Votre journée est terminée!');
});

// Initialisation de l'onglet par défaut
activateTab('entraînement');
