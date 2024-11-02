document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const startButton = document.getElementById('startButton');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskPriorityInput = document.getElementById('taskPriority');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    
    const date = new Date().toLocaleDateString();
    document.getElementById('date').innerText = `Aujourd'hui : ${date}`;

    startButton.onclick = () => {
        popup.style.display = 'none';
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

    // Afficher la pop-up au chargement
    popup.style.display = 'flex';
});
