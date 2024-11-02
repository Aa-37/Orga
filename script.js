document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const startButton = document.getElementById('startButton');
    const finishDayButton = document.getElementById('finishDay');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskPriorityInput = document.getElementById('taskPriority');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Affiche la date
    const date = new Date().toLocaleDateString();
    document.getElementById('date').innerText = `Aujourd'hui : ${date}`;

    // Exemple de tâches programmées
    const tasksToday = ["Faire du sport", "Manger équilibré", "Lire un livre"];
    const tasksListElem = document.getElementById('tasksToday');
    tasksToday.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        tasksListElem.appendChild(li);
    });

    startButton.onclick = () => {
        popup.style.display = 'none'; // Ferme la pop-up
        openTab('entrainement'); // Ouvre l'onglet Entraînement
    };

    finishDayButton.onclick = () => {
        alert("Données de la journée enregistrées !");
        popup.style.display = 'flex'; // Réactive la pop-up
    };

    addTaskButton.onclick = () => {
        const taskTitle = taskTitleInput.value;
        const taskPriority = taskPriorityInput.value;
        if (taskTitle) {
            const li = document.createElement('li');
            li.textContent = `${taskTitle} (Priorité: ${taskPriority})`;
            taskList.appendChild(li);
            taskTitleInput.value = ''; // Réinitialise le champ de saisie
        }
    };

    // Onglets
    const tabs = document.querySelectorAll('.tab-content');
    function openTab(tabName) {
        tabs.forEach(tab => {
            tab.style.display = 'none'; // Cache tous les onglets
        });
        document.getElementById(tabName).style.display = 'block'; // Affiche l'onglet sélectionné
    }

    // Afficher la pop-up au chargement
    popup.style.display = 'flex';
});
