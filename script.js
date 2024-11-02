document.addEventListener('DOMContentLoaded', () => {
    // Gestion des onglets
    const tabs = document.querySelectorAll('nav a');
    const tabContent = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabContent.forEach(content => content.classList.remove('active'));
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Affichage du popup de démarrage
    const popup = document.getElementById('popup');
    const startButton = document.getElementById('startButton');

    // Fonction pour masquer le pop-up quand le bouton est cliqué
    if (startButton) {
        startButton.addEventListener('click', () => {
            popup.style.display = 'none'; // Cache le pop-up
        });
    }

    // IndexedDB pour stocker les données des tâches
    let db;
    const request = indexedDB.open("WellnessDB", 1);
    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const taskStore = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
        taskStore.createIndex("by_date", "date", { unique: false });
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        loadTasks();
    };

    // Ajout de tâche
    const addTaskButton = document.getElementById('addTaskButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value;
        if (taskText) {
            const transaction = db.transaction("tasks", "readwrite");
            const taskStore = transaction.objectStore("tasks");
            taskStore.add({ text: taskText, date: new Date().toISOString() });
            taskInput.value = '';
            loadTasks();
        }
    });

    // Chargement des tâches
    function loadTasks() {
        taskList.innerHTML = '';
        const transaction = db.transaction("tasks", "readonly");
        const taskStore = transaction.objectStore("tasks");
        const request = taskStore.openCursor();
        request.onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                const li = document.createElement('li');
                li.textContent = cursor.value.text;
                taskList.appendChild(li);
                cursor.continue();
            }
        };
    }

    // Graphique avec Chart.js
    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
            datasets: [
                {
                    label: 'Hydratation (L)',
                    data: [2.5, 3, 2, 3, 2.5, 3, 2],
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                    borderColor: '#007bff',
                    fill: true,
                },
                {
                    label: 'Sommeil (heures)',
                    data: [8, 7.5, 6, 8, 7, 7.5, 8],
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    borderColor: '#28a745',
                    fill: true,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
            }
        }
    });
});



    // Afficher la pop-up au chargement
    popup.style.display = 'flex';
});
