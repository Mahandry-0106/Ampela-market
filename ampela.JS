// Gestion du carrousel de la section "Fil d’actu"
let currentIndex = 1; // L'index de la carte actuellement sélectionnée (au départ la 2ème carte)

function moveCarousel(direction) {
    const items = document.querySelectorAll('.news-item');
    const totalItems = items.length;

    // Enlève la classe 'large' de toutes les cartes
    items.forEach(item => item.classList.remove('large'));

    // Met à jour l'index en fonction de la direction
    if (direction === 'left') {
        currentIndex = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    } else if (direction === 'right') {
        currentIndex = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
    }

    // Ajoute la classe 'large' à la carte sélectionnée
    items[currentIndex].classList.add('large');

    // Défilement des cartes
    document.querySelector('.news-carousel').style.transform = `translateX(-${currentIndex * 30}%)`;
}

// Gestion du modal de connexion/inscription et du menu hamburger
document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments du DOM
    const loginLink = document.getElementById('login-link');
    const modal = document.getElementById('auth-modal');
    const closeModal = document.getElementById('close-modal');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const successMessage = document.getElementById('success-message');
    const closeSuccess = document.getElementById('close-success');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Afficher le modal au clic sur "Se connecter | S'inscrire"
    loginLink.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        modal.style.display = 'flex'; // Affiche le modal
    });

    // Fermer le modal au clic sur la croix
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none'; // Cache le modal
        resetForms(); // Réinitialise les formulaires
    });

    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'; // Cache le modal
            resetForms(); // Réinitialise les formulaires
        }
    });

    // Basculer entre les onglets "Se connecter" et "S'inscrire"
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        successMessage.style.display = 'none';
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        successMessage.style.display = 'none';
    });

    // Gestion de la soumission des formulaires
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        showSuccessMessage(); // Affiche le message de succès
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        showSuccessMessage(); // Affiche le message de succès
    });

    // Fermer le message de succès et le modal
    closeSuccess.addEventListener('click', () => {
        modal.style.display = 'none'; // Cache le modal
        resetForms(); // Réinitialise les formulaires
    });

    // Fonction pour afficher le message de succès
    function showSuccessMessage() {
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        successMessage.style.display = 'block';
    }

    // Fonction pour réinitialiser les formulaires
    function resetForms() {
        loginForm.reset(); // Réinitialise le formulaire de connexion
        signupForm.reset(); // Réinitialise le formulaire d'inscription
        loginForm.style.display = 'block'; // Affiche le formulaire de connexion par défaut
        signupForm.style.display = 'none';
        successMessage.style.display = 'none';
        loginTab.classList.add('active'); // Onglet "Se connecter" actif par défaut
        signupTab.classList.remove('active');
    }

    // Gestion du menu hamburger
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Gestion des sous-menus sur mobile (au clic)
    navLinkItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) { // Seulement sur mobile
                e.preventDefault();
                const isActive = item.classList.contains('active');
                // Ferme tous les autres sous-menus
                navLinkItems.forEach(link => link.classList.remove('active'));
                // Ouvre ou ferme le sous-menu cliqué
                if (!isActive) {
                    item.classList.add('active');
                }
            }
        });
    });

    // Ferme le menu hamburger quand on clique à l'extérieur
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            navLinkItems.forEach(link => link.classList.remove('active'));
        }
    });
});