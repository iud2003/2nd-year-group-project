class HeaderController {
    constructor() {
        this.notificationCount = 3;
        this.isNotificationOpen = false;
        this.isUserDropdownOpen = false;
        this.isMobileMenuOpen = false;

        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.nav = document.querySelector('.nav');

        this.notificationBtn = document.getElementById('notificationBtn');
        this.notificationDropdown = document.getElementById('notificationDropdown');
        this.notificationBadge = document.getElementById('notificationBadge');
        this.markAllReadBtn = document.getElementById('markAllRead');

        this.userProfile = document.getElementById('userProfile');
        this.userDropdown = document.getElementById('userDropdown');

        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.mobileOverlay = document.getElementById('mobileOverlay');
        this.logo = document.querySelector('.logo');
    }

    bindEvents() {
        // Navigation
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Notifications
        this.notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleNotifications();
        });
        this.markAllReadBtn?.addEventListener('click', () => this.markAllNotificationsRead());

        // User dropdown
        this.userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleUserDropdown();
        });

        // Mobile
        this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());

        // Click outside & escape
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('resize', () => this.handleResize());
    }

    // ----- Notification Methods -----
    toggleNotifications() {
        this.isNotificationOpen = !this.isNotificationOpen;
        this.notificationDropdown.classList.toggle('show', this.isNotificationOpen);
    }

    markAllNotificationsRead() {
        document.querySelectorAll('.notification-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        this.notificationCount = 0;
        this.updateBadge();
    }

    updateBadge() {
        if (this.notificationCount > 0) {
            this.notificationBadge.textContent = this.notificationCount;
            this.notificationBadge.style.display = 'inline-flex';
        } else {
            this.notificationBadge.style.display = 'none';
        }
    }

    // ----- User Methods -----
    toggleUserDropdown() {
        this.isUserDropdownOpen = !this.isUserDropdownOpen;
        this.userDropdown.classList.toggle('show', this.isUserDropdownOpen);
    }

    // ----- Mobile -----
    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        this.nav.classList.toggle('show', this.isMobileMenuOpen);
        this.mobileOverlay.style.display = this.isMobileMenuOpen ? 'block' : 'none';
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        this.nav.classList.remove('show');
        this.mobileOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    // ----- Navigation -----
    handleNavigation(e) {
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        if (this.isMobileMenuOpen) this.closeMobileMenu();
    }

    // ----- Global Events -----
    handleOutsideClick(e) {
        if (!this.notificationDropdown.contains(e.target) && !this.notificationBtn.contains(e.target)) {
            this.notificationDropdown.classList.remove('show');
            this.isNotificationOpen = false;
        }
        if (!this.userDropdown.contains(e.target) && !this.userProfile.contains(e.target)) {
            this.userDropdown.classList.remove('show');
            this.isUserDropdownOpen = false;
        }
    }

    handleKeyDown(e) {
        if (e.key === 'Escape') {
            if (this.isNotificationOpen) this.toggleNotifications();
            if (this.isUserDropdownOpen) this.toggleUserDropdown();
            if (this.isMobileMenuOpen) this.closeMobileMenu();
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.isMobileMenuOpen) this.closeMobileMenu();
    }
}

// Export init function to main.js
function initHeader() {
    window.headerController = new HeaderController();
}
