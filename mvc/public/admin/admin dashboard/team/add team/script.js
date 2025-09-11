// DOM Elements
const addTeamCard = document.querySelector('.add-team-card');
const addTeamModal = document.getElementById('addTeamModal');
const closeModal = document.getElementById('closeModal');
const addTeamForm = document.getElementById('addTeamForm');
const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const addTournamentBtn = document.getElementById('addTournament');
const addAchievementBtn = document.getElementById('addAchievement');
const addPlayerBtn = document.getElementById('addPlayer');
const addCoachBtn = document.getElementById('addCoach');

// Modal functionality
function openModal() {
    addTeamModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalHandler() {
    addTeamModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners
addTeamCard.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalHandler);

// Close modal when clicking outside
addTeamModal.addEventListener('click', (e) => {
    if (e.target === addTeamModal) {
        closeModalHandler();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && addTeamModal.classList.contains('active')) {
        closeModalHandler();
    }
});

// Tab switching functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all tabs
        tabButtons.forEach(tab => tab.classList.remove('active'));
        // Add active class to clicked tab
        button.classList.add('active');
        
        // You can add logic here to show/hide different content based on the selected tab
        const tabType = button.getAttribute('data-tab');
        console.log(`Switched to ${tabType} tab`);
    });
});

// Add functionality for add buttons
addTournamentBtn.addEventListener('click', () => {
    const tournamentName = prompt('Enter tournament name:');
    if (tournamentName && tournamentName.trim()) {
        addTournamentToList(tournamentName.trim());
    }
});

addAchievementBtn.addEventListener('click', () => {
    const achievement = prompt('Enter achievement:');
    if (achievement && achievement.trim()) {
        console.log('Adding achievement:', achievement);
        // You can implement the logic to add achievements here
        alert('Achievement functionality would be implemented here');
    }
});

addPlayerBtn.addEventListener('click', () => {
    const playerName = prompt('Enter player name:');
    if (playerName && playerName.trim()) {
        console.log('Adding player:', playerName);
        // You can implement the logic to add players here
        alert('Player functionality would be implemented here');
    }
});

addCoachBtn.addEventListener('click', () => {
    const coachName = prompt('Enter coach name:');
    if (coachName && coachName.trim()) {
        console.log('Adding coach:', coachName);
        // You can implement the logic to add coaches here
        alert('Coach functionality would be implemented here');
    }
});

// Function to add tournament to the list
function addTournamentToList(tournamentName) {
    const tournamentsList = document.querySelector('.tournaments-list');
    const tournamentItem = document.createElement('div');
    tournamentItem.className = 'tournament-item';
    
    tournamentItem.innerHTML = `
        <span>${tournamentName}</span>
        <div class="tournament-actions">
            <button type="button" class="edit-tournament-btn" onclick="editTournament(this)">✏️</button>
            <button type="button" class="delete-tournament-btn" onclick="deleteTournament(this)">🗑️</button>
        </div>
    `;
    
    tournamentsList.appendChild(tournamentItem);
}

// Tournament management functions
function editTournament(button) {
    const tournamentItem = button.closest('.tournament-item');
    const tournamentNameSpan = tournamentItem.querySelector('span');
    const currentName = tournamentNameSpan.textContent;
    
    const newName = prompt('Edit tournament name:', currentName);
    if (newName && newName.trim() && newName !== currentName) {
        tournamentNameSpan.textContent = newName.trim();
    }
}

function deleteTournament(button) {
    const tournamentItem = button.closest('.tournament-item');
    const tournamentName = tournamentItem.querySelector('span').textContent;
    
    if (confirm(`Are you sure you want to delete "${tournamentName}"?`)) {
        tournamentItem.remove();
    }
}

// Form submission
addTeamForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(addTeamForm);
    const teamData = {
        name: formData.get('teamName'),
        season: formData.get('season'),
        tournaments: Array.from(document.querySelectorAll('.tournament-item span')).map(span => span.textContent),
        // Add other form data as needed
    };
    
    console.log('Team data:', teamData);
    
    // Simulate adding the team
    addNewTeamCard(teamData);
    
    // Reset form and close modal
    addTeamForm.reset();
    closeModalHandler();
    
    // Clear tournaments list (reset to initial state)
    const tournamentsList = document.querySelector('.tournaments-list');
    tournamentsList.innerHTML = `
        <div class="tournament-item">
            <span>Inter - University Games 2025</span>
            <div class="tournament-actions">
                <button type="button" class="edit-tournament-btn" onclick="editTournament(this)">✏️</button>
                <button type="button" class="delete-tournament-btn" onclick="deleteTournament(this)">🗑️</button>
            </div>
        </div>
    `;
});

// Function to add a new team card to the grid
function addNewTeamCard(teamData) {
    const teamsGrid = document.querySelector('.teams-grid');
    const newTeamCard = document.createElement('div');
    newTeamCard.className = 'team-card existing-team-card';
    
    // Generate a random emoji for the team logo
    const teamEmojis = ['⚽', '🏆', '🎯', '⭐', '🔥', '💪', '🚀', '⚡'];
    const randomEmoji = teamEmojis[Math.floor(Math.random() * teamEmojis.length)];
    
    newTeamCard.innerHTML = `
        <div class="team-header">
            <div class="team-logo">${randomEmoji}</div>
            <div class="team-actions">
                <button class="action-btn edit-btn" onclick="editTeam(this)">✏️</button>
                <button class="action-btn delete-btn" onclick="deleteTeam(this)">🗑️</button>
            </div>
        </div>
        <h3 class="team-name">${teamData.name}</h3>
        <div class="team-details">
            <div class="detail-item">
                <span class="detail-icon">📅</span>
                <span class="detail-text">${teamData.season}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">🏆</span>
                <span class="detail-text">${teamData.tournaments[0] || 'No tournaments'}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">👨‍💼</span>
                <span class="detail-text">Coach: TBD</span>
            </div>
        </div>
        <div class="team-footer">
            <div class="player-count">
                <span class="player-icon">👥</span>
                <span>0 Players</span>
            </div>
            <button class="view-details-btn" onclick="viewTeamDetails(this)">View Details</button>
        </div>
    `;
    
    // Insert before the last card (which should be the add team card)
    teamsGrid.insertBefore(newTeamCard, teamsGrid.lastElementChild);
    
    // Add animation
    newTeamCard.style.opacity = '0';
    newTeamCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newTeamCard.style.transition = 'all 0.3s ease';
        newTeamCard.style.opacity = '1';
        newTeamCard.style.transform = 'translateY(0)';
    }, 100);
}

// Team management functions
function editTeam(button) {
    const teamCard = button.closest('.team-card');
    const teamName = teamCard.querySelector('.team-name').textContent;
    alert(`Edit functionality for "${teamName}" would be implemented here`);
}

function deleteTeam(button) {
    const teamCard = button.closest('.team-card');
    const teamName = team