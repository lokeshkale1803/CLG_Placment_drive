// js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // Protect this route
    requireAuth();

    // Set welcome message
    const userName = localStorage.getItem('user_name') || 'Student';
    const welcomeEl = document.getElementById('welcomeMessage');
    if (welcomeEl) {
        welcomeEl.textContent = `Welcome, ${userName}`;
    }

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }

    // Initialize API calls for dashboard data here
    // e.g., fetchDashboardStats()
});
