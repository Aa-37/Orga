document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const startButton = document.getElementById('startButton');
    
    // Afficher la date du jour
    const date = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('date').innerText = `Aujourd'hui : ${date}`;

    // Fonction pour commencer la journée
    startButton.onclick = () => {
        popup.style.display = 'none';
    };

    // Vous pouvez ajouter d'autres fonctionnalités ici, comme des interactions pour les sections.
});

