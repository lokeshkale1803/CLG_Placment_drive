// js/applications.js
document.addEventListener('DOMContentLoaded', () => {
    // Protect route
    requireAuth();

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }

    // Fetch applications
    fetchApplications();
});

async function fetchApplications() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const emptyState = document.getElementById('emptyState');
    const container = document.getElementById('applicationsContainer');

    loadingState.style.display = 'block';
    errorState.style.display = 'none';
    emptyState.style.display = 'none';
    container.style.display = 'none';

    try {
        // Placeholder for FastAPI integration
        // const studentId = localStorage.getItem('student_id');
        // const response = await fetch(`${API_BASE_URL}/applications/${studentId}`);
        // const apps = await response.json();
        
        // Mock data to simulate API response
        const apps = await simulateFetchApps();

        loadingState.style.display = 'none';

        if (apps.length === 0) {
            emptyState.style.display = 'block';
        } else {
            renderApplications(apps);
            container.style.display = 'block';
        }
    } catch (error) {
        console.error("Error fetching applications:", error);
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
    }
}

function renderApplications(apps) {
    const list = document.getElementById('applicationsList');
    list.innerHTML = '';

    apps.forEach(app => {
        const item = document.createElement('li');
        item.className = 'drive-list-item';
        
        let badgeClass = '';
        switch(app.status) {
            case 'Applied': badgeClass = 'applied-badge'; break;
            case 'Shortlisted': badgeClass = 'shortlisted-badge'; break;
            case 'Selected': badgeClass = 'selected-badge'; break;
            case 'Rejected': badgeClass = 'rejected-badge'; break;
            default: badgeClass = 'applied-badge';
        }

        item.innerHTML = `
            <div class="company-logo sm" style="background: ${app.color}">${app.logoText}</div>
            <div class="drive-info">
                <h4>${app.role}</h4>
                <p>${app.company}</p>
                <p class="text-sm text-light mt-1"><i class="fa-solid fa-calendar"></i> Applied: ${app.appliedDate}</p>
            </div>
            <span class="status-badge ${badgeClass}">${app.status}</span>
        `;
        list.appendChild(item);
    });
}

// Simulated Backend Response
function simulateFetchApps() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    company: 'TCS',
                    logoText: 'TC',
                    color: '#0f172a',
                    role: 'Software Engineer',
                    appliedDate: '15 Sep 2026',
                    status: 'Shortlisted'
                },
                {
                    id: '2',
                    company: 'Wipro',
                    logoText: 'WP',
                    color: '#0284c7',
                    role: 'System Analyst',
                    appliedDate: '10 Sep 2026',
                    status: 'Applied'
                }
            ]);
        }, 600);
    });
}
