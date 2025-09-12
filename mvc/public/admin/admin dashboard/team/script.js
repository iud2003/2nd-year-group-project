function loadComponent(elementId, componentPath) {
    fetch(`${componentPath}/index.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            // After HTML is injected, load CSS and JS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `${componentPath}/styles.css`;
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = `${componentPath}/script.js`;
            script.onload = () => {
                // Initialize header after JS loads
                if (window.initHeader) window.initHeader();
            };
            document.body.appendChild(script);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '../header'); // dynamically load header
});



// DOM Elements
const addTeamCard = document.getElementById('addTeamCard');
const addTeamModal = document.getElementById('addTeamModal');
const closeModal = document.getElementById('closeModal');
const addTeamForm = document.getElementById('addTeamForm');
const teamsGrid = document.querySelector('.teams-grid');

// Player Modal Elements
const addPlayerModal = document.getElementById('addPlayerModal');
const closePlayerModal = document.getElementById('closePlayerModal');
const addPlayerForm = document.getElementById('addPlayerForm');

// Modal functionality
function openModal() {
    addTeamModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    // Check if form has any data
    const hasData = checkFormHasData();
    
    if (hasData) {
        showCloseConfirmation();
    } else {
        closeModalDirectly();
    }
}

function closeModalDirectly() {
    addTeamModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
}

function checkFormHasData() {
    const teamName = document.getElementById('teamName').value.trim();
    const season = document.getElementById('season').value.trim();
    const hasTournaments = tournamentsList.children.length > 1; // More than default
    const hasAchievements = achievementsList.children.length > 0;
    const hasPlayers = playersList.children.length > 0;
    const hasCoaches = coachesList.children.length > 0;
    
    return teamName !== '' || season !== '2024 Season' || hasTournaments || hasAchievements || hasPlayers || hasCoaches;
}

function showCloseConfirmation() {
    const confirmationOverlay = document.createElement('div');
    confirmationOverlay.className = 'confirmation-overlay';
    confirmationOverlay.innerHTML = `
        <div class="confirmation-modal">
            <h3>Do you want to close the form</h3>
            <p>You have unsaved changes. Are you sure you want to close?</p>
            <div class="confirmation-buttons">
                <button class="confirm-yes-btn">Yes</button>
                <button class="confirm-no-btn">No</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmationOverlay);
    
    const yesBtn = confirmationOverlay.querySelector('.confirm-yes-btn');
    const noBtn = confirmationOverlay.querySelector('.confirm-no-btn');
    
    yesBtn.addEventListener('click', () => {
        document.body.removeChild(confirmationOverlay);
        closeModalDirectly();
    });
    
    noBtn.addEventListener('click', () => {
        document.body.removeChild(confirmationOverlay);
    });
    
    // Close on overlay click
    confirmationOverlay.addEventListener('click', (e) => {
        if (e.target === confirmationOverlay) {
            document.body.removeChild(confirmationOverlay);
        }
    });
    
    // Close with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(confirmationOverlay);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function resetForm() {
    addTeamForm.reset();
    document.getElementById('season').value = '2024 Season';
    
    // Clear dynamic lists
    tournamentsList.innerHTML = `
        <div class="tournament-item">
            <span>Inter - University Games 2025</span>
            <div class="tournament-actions">
                <button type="button" class="edit-tournament-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button type="button" class="delete-tournament-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    achievementsList.innerHTML = '';
    playersList.innerHTML = '';
    coachesList.innerHTML = '';
    
    // Re-attach event listeners to the default tournament item
    attachTournamentListeners();
}

// Player Modal Functions
function openPlayerModal() {
    addPlayerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePlayerModalHandler() {
    addPlayerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for modals
addTeamCard.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalHandler);
closePlayerModal.addEventListener('click', closePlayerModalHandler);

// Close modal when clicking outside
addTeamModal.addEventListener('click', (e) => {
    if (e.target === addTeamModal) {
        closeModalHandler();
    }
});

addPlayerModal.addEventListener('click', (e) => {
    if (e.target === addPlayerModal) {
        closePlayerModalHandler();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && addTeamModal.classList.contains('active')) {
        closeModalHandler();
    }
    if (e.key === 'Escape' && addPlayerModal.classList.contains('active')) {
        closePlayerModalHandler();
    }
});

// Coach tabs functionality
const coachTabs = document.querySelectorAll('.tab-btn');
coachTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        coachTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Add tournament functionality
const addTournamentBtn = document.getElementById('addTournament');
const tournamentsList = document.querySelector('.tournaments-list');

addTournamentBtn.addEventListener('click', () => {
    const tournamentName = prompt('Enter tournament name:');
    if (tournamentName && tournamentName.trim()) {
        addTournamentItem(tournamentName.trim());
    }
});

function addTournamentItem(name) {
    const tournamentItem = document.createElement('div');
    tournamentItem.className = 'tournament-item';
    tournamentItem.innerHTML = `
        <span>${name}</span>
        <div class="tournament-actions">
            <button type="button" class="edit-tournament-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button type="button" class="delete-tournament-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add event listeners for edit and delete
    const editBtn = tournamentItem.querySelector('.edit-tournament-btn');
    const deleteBtn = tournamentItem.querySelector('.delete-tournament-btn');
    
    editBtn.addEventListener('click', () => {
        const newName = prompt('Edit tournament name:', name);
        if (newName && newName.trim()) {
            tournamentItem.querySelector('span').textContent = newName.trim();
        }
    });
    
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this tournament?')) {
            tournamentItem.remove();
        }
    });
    
    tournamentsList.appendChild(tournamentItem);
}

// Function to attach event listeners to tournament items
function attachTournamentListeners() {
    const tournamentItems = tournamentsList.querySelectorAll('.tournament-item');
    tournamentItems.forEach(item => {
        const editBtn = item.querySelector('.edit-tournament-btn');
        const deleteBtn = item.querySelector('.delete-tournament-btn');
        const nameSpan = item.querySelector('span');
        
        if (editBtn && deleteBtn && nameSpan) {
            // Remove existing listeners to prevent duplicates
            editBtn.replaceWith(editBtn.cloneNode(true));
            deleteBtn.replaceWith(deleteBtn.cloneNode(true));
            
            // Get the new elements after cloning
            const newEditBtn = item.querySelector('.edit-tournament-btn');
            const newDeleteBtn = item.querySelector('.delete-tournament-btn');
            
            newEditBtn.addEventListener('click', () => {
                const currentName = nameSpan.textContent;
                const newName = prompt('Edit tournament name:', currentName);
                if (newName && newName.trim()) {
                    nameSpan.textContent = newName.trim();
                }
            });
            
            newDeleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this tournament?')) {
                    item.remove();
                }
            });
        }
    });
}

// Add achievement functionality
const addAchievementBtn = document.getElementById('addAchievement');
const achievementsList = document.getElementById('achievementsList');

addAchievementBtn.addEventListener('click', () => {
    const achievementName = prompt('Enter achievement:');
    if (achievementName && achievementName.trim()) {
        addAchievementItem(achievementName.trim());
    }
});

function addAchievementItem(name) {
    const achievementItem = document.createElement('div');
    achievementItem.className = 'tournament-item';
    achievementItem.innerHTML = `
        <span>${name}</span>
        <div class="tournament-actions">
            <button type="button" class="edit-tournament-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button type="button" class="delete-tournament-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add event listeners for edit and delete
    const editBtn = achievementItem.querySelector('.edit-tournament-btn');
    const deleteBtn = achievementItem.querySelector('.delete-tournament-btn');
    
    editBtn.addEventListener('click', () => {
        const newName = prompt('Edit achievement:', name);
        if (newName && newName.trim()) {
            achievementItem.querySelector('span').textContent = newName.trim();
        }
    });
    
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this achievement?')) {
            achievementItem.remove();
        }
    });
    
    achievementsList.appendChild(achievementItem);
}

// Enhanced Add player functionality
const addPlayerBtn = document.getElementById('addPlayer');
const playersList = document.getElementById('playersList');

addPlayerBtn.addEventListener('click', openPlayerModal);

// Player form submission
addPlayerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(addPlayerForm);
    const playerData = {
        fullName: formData.get('playerFullName'),
        initials: formData.get('playerInitials'),
        faculty: formData.get('playerFaculty'),
        position: formData.get('playerPosition'),
        jerseyNumber: formData.get('jerseyNumber'),
        nic: formData.get('playerNIC'),
        regNumber: formData.get('uniRegNumber'),
        mobile: formData.get('playerMobile'),
        height: formData.get('playerHeight'),
        weight: formData.get('playerWeight')
    };
    
    // Validate jersey number uniqueness
    const existingNumbers = Array.from(playersList.querySelectorAll('.player-jersey'))
        .map(jersey => jersey.textContent);
    
    if (existingNumbers.includes(playerData.jerseyNumber)) {
        alert('Jersey number already exists! Please choose a different number.');
        return;
    }
    
    addPlayerToList(playerData);
    addPlayerForm.reset();
    closePlayerModalHandler();
});

function addPlayerToList(playerData) {
    const playerItem = document.createElement('div');
    playerItem.className = 'player-item';
    playerItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="player-jersey">${playerData.jerseyNumber}</div>
            <div class="player-info">
                <div class="player-name">${playerData.fullName}</div>
                <div class="player-details">${playerData.position} • ${playerData.faculty} • ${playerData.mobile}</div>
            </div>
        </div>
        <div class="tournament-actions">
            <button type="button" class="edit-tournament-btn" title="Edit Player">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button type="button" class="delete-tournament-btn" title="Delete Player">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add event listeners for edit and delete
    const editBtn = playerItem.querySelector('.edit-tournament-btn');
    const deleteBtn = playerItem.querySelector('.delete-tournament-btn');
    
    editBtn.addEventListener('click', () => {
        editPlayer(playerItem, playerData);
    });
    
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this player?')) {
            playerItem.remove();
        }
    });
    
    playersList.appendChild(playerItem);
}

function editPlayer(playerItem, currentData) {
    // Pre-populate the form with current data
    document.getElementById('playerFullName').value = currentData.fullName;
    document.getElementById('playerInitials').value = currentData.initials;
    document.getElementById('playerFaculty').value = currentData.faculty;
    document.getElementById('playerPosition').value = currentData.position;
    document.getElementById('jerseyNumber').value = currentData.jerseyNumber;
    document.getElementById('playerNIC').value = currentData.nic;
    document.getElementById('uniRegNumber').value = currentData.regNumber;
    document.getElementById('playerMobile').value = currentData.mobile;
    document.getElementById('playerHeight').value = currentData.height || '';
    document.getElementById('playerWeight').value = currentData.weight || '';
    
    // Change form submit behavior temporarily for editing
    const originalHandler = addPlayerForm.onsubmit;
    addPlayerForm.onsubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(addPlayerForm);
        const updatedPlayerData = {
            fullName: formData.get('playerFullName'),
            initials: formData.get('playerInitials'),
            faculty: formData.get('playerFaculty'),
            position: formData.get('playerPosition'),
            jerseyNumber: formData.get('jerseyNumber'),
            nic: formData.get('playerNIC'),
            regNumber: formData.get('uniRegNumber'),
            mobile: formData.get('playerMobile'),
            height: formData.get('playerHeight'),
            weight: formData.get('playerWeight')
        };
        
        // Check jersey number uniqueness (excluding current player)
        const existingNumbers = Array.from(playersList.querySelectorAll('.player-jersey'))
            .map(jersey => jersey.textContent)
            .filter(num => num !== currentData.jerseyNumber);
        
        if (existingNumbers.includes(updatedPlayerData.jerseyNumber)) {
            alert('Jersey number already exists! Please choose a different number.');
            return;
        }
        
        // Update the player item
        playerItem.querySelector('.player-jersey').textContent = updatedPlayerData.jerseyNumber;
        playerItem.querySelector('.player-name').textContent = updatedPlayerData.fullName;
        playerItem.querySelector('.player-details').textContent = 
            `${updatedPlayerData.position} • ${updatedPlayerData.faculty} • ${updatedPlayerData.mobile}`;
        
        // Update the edit button to use new data
        const editBtn = playerItem.querySelector('.edit-tournament-btn');
        editBtn.onclick = () => editPlayer(playerItem, updatedPlayerData);
        
        // Restore original form handler
        addPlayerForm.onsubmit = originalHandler;
        
        addPlayerForm.reset();
        closePlayerModalHandler();
    };
    
    openPlayerModal();
}

// Add coach functionality
const addCoachBtn = document.getElementById('addCoach');
const coachesList = document.getElementById('coachesList');

addCoachBtn.addEventListener('click', () => {
    const coachName = prompt('Enter coach name:');
    if (coachName && coachName.trim()) {
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        addCoachItem(coachName.trim(), activeTab);
    }
});

function addCoachItem(name, category) {
    const coachItem = document.createElement('div');
    coachItem.className = 'tournament-item';
    coachItem.dataset.category = category;
    coachItem.innerHTML = `
        <span>${name} (${category})</span>
        <div class="tournament-actions">
            <button type="button" class="edit-tournament-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button type="button" class="delete-tournament-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add event listeners for edit and delete
    const editBtn = coachItem.querySelector('.edit-tournament-btn');
    const deleteBtn = coachItem.querySelector('.delete-tournament-btn');
    
    editBtn.addEventListener('click', () => {
        const newName = prompt('Edit coach name:', name);
        if (newName && newName.trim()) {
            coachItem.querySelector('span').textContent = `${newName.trim()} (${category})`;
        }
    });
    
    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this coach?')) {
            coachItem.remove();
        }
    });
    
    coachesList.appendChild(coachItem);
}

// Team form submission
addTeamForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(addTeamForm);
    const teamData = {
        name: formData.get('teamName'),
        season: formData.get('season'),
        tournaments: Array.from(tournamentsList.querySelectorAll('.tournament-item span')).map(span => span.textContent),
        achievements: Array.from(achievementsList.querySelectorAll('.tournament-item span')).map(span => span.textContent),
        players: Array.from(playersList.querySelectorAll('.player-item')).map(item => ({
            name: item.querySelector('.player-name').textContent,
            jersey: item.querySelector('.player-jersey').textContent,
            details: item.querySelector('.player-details').textContent
        })),
        coaches: Array.from(coachesList.querySelectorAll('.tournament-item')).map(item => ({
            name: item.querySelector('span').textContent,
            category: item.dataset.category
        }))
    };
    
    // Create new team card and add to grid
    createTeamCard(teamData);
    
    // Reset form and close modal
    resetForm();
    closeModalDirectly();
});

function createTeamCard(teamData) {
    const teamCard = document.createElement('div');
    teamCard.className = 'team-card existing-team-card';
    
    const primaryTournament = teamData.tournaments.length > 0 ? teamData.tournaments[0] : 'No Tournament';
    const primaryCoach = teamData.coaches.find(coach => coach.category === 'present') || 
                       teamData.coaches[0] || 
                       { name: 'No Coach (present)' };
    
    teamCard.innerHTML = `
        <div class="team-header">
            <div class="team-logo purple">🛡️</div>
            <div class="team-actions">
                <button class="action-btn edit-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="action-btn delete-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
        <h3 class="team-name">${teamData.name}</h3>
        <div class="team-details">
            <div class="detail-item">
                <div class="detail-icon calendar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
                <span class="detail-text">${teamData.season}</span>
            </div>
            <div class="detail-item">
                <div class="detail-icon trophy">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18 20v-6h-2.5a2.5 2.5 0 0 1 0-5H18V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v5h2.5a2.5 2.5 0 0 1 0 5H6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="6" y1="20" x2="18" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </div>
                <span class="detail-text">${primaryTournament}</span>
            </div>
            <div class="detail-item">
                <div class="detail-icon coach">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
                <span class="detail-text">Coach: ${primaryCoach.name.replace(/ \(.*\)/, '')}</span>
            </div>
        </div>
        <div class="team-footer">
            <div class="player-count">
                <div class="player-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <span>${teamData.players.length} Players</span>
            </div>
            <button class="view-details-btn">View Details</button>
        </div>
    `;
    
    // Add event listeners for the new team card
    const editBtn = teamCard.querySelector('.edit-btn');
    const deleteBtn = teamCard.querySelector('.delete-btn');
    const viewDetailsBtn = teamCard.querySelector('.view-details-btn');
    
    editBtn.addEventListener('click', () => {
        // TODO: Implement edit team functionality
        alert('Edit team functionality coming soon!');
    });
    
    deleteBtn.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete the team "${teamData.name}"?`)) {
            teamCard.remove();
        }
    });
    
    viewDetailsBtn.addEventListener('click', () => {
        // TODO: Implement view team details functionality
        alert('View team details functionality coming soon!');
    });
    
    // Insert before the add team card
    teamsGrid.insertBefore(teamCard, addTeamCard);
}

// Back button functionality
const backBtn = document.querySelector('.back-btn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        // TODO: Implement navigation back functionality
        console.log('Back button clicked');
        // You can add navigation logic here, such as:
        // window.history.back();
        // or navigate to a specific page
    });
}

// Notification button functionality
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        // TODO: Implement notification functionality
        alert('Notifications feature coming soon!');
    });
}

// Profile avatar functionality
const profileAvatar = document.querySelector('.profile-avatar');
if (profileAvatar) {
    profileAvatar.addEventListener('click', () => {
        // TODO: Implement profile menu functionality
        alert('Profile menu coming soon!');
    });
}

// Initialize tournament listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    attachTournamentListeners();
});