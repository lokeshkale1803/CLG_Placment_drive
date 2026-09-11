// js/drives.js
document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Navbar based on Auth state
    setupNavbar();

    // Fetch drives
    fetchDrives();
});

function setupNavbar() {
    const isAuth = checkAuth();
    const navMenu = document.getElementById('dynamicNav');
    const navAuth = document.getElementById('dynamicAuth');
    
    if (isAuth) {
        navMenu.innerHTML = `
            <li><a href="dashboard.html" class="nav-links">Dashboard</a></li>
            <li><a href="drives.html" class="nav-links active">Drives</a></li>
            <li><a href="applications.html" class="nav-links">My Applications</a></li>
            <li><a href="profile.html" class="nav-links">Profile</a></li>
        `;
        navAuth.innerHTML = `<button id="logoutBtn" class="btn btn-outline">Logout</button>`;
        document.getElementById('logoutBtn').addEventListener('click', logoutUser);
    } else {
        navMenu.innerHTML = `
            <li><a href="index.html" class="nav-links">Home</a></li>
            <li><a href="drives.html" class="nav-links active">Ongoing Drives</a></li>
        `;
        navAuth.innerHTML = `
            <a href="login.html" class="btn btn-outline">Log In</a>
            <a href="signup.html" class="btn btn-primary">Sign Up</a>
        `;
    }
}

async function fetchDrives() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const emptyState = document.getElementById('emptyState');
    const drivesContainer = document.getElementById('drivesContainer');

    loadingState.style.display = 'block';
    errorState.style.display = 'none';
    emptyState.style.display = 'none';
    drivesContainer.style.display = 'none';

    try {
        // Placeholder for FastAPI integration
        // const response = await fetch(`${API_BASE_URL}/drives`);
        // const drives = await response.json();
        
        // Mock data to simulate API response
        const drives = await simulateFetchDrives();

        loadingState.style.display = 'none';

        if (drives.length === 0) {
            emptyState.style.display = 'block';
        } else {
            renderDrives(drives);
            drivesContainer.style.display = 'grid';
        }
    } catch (error) {
        console.error("Error fetching drives:", error);
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
    }
}

function renderDrives(drives) {
    const container = document.getElementById('drivesContainer');
    container.innerHTML = '';
    const isAuth = checkAuth();

    drives.forEach(drive => {
        // Build card HTML
        const card = document.createElement('div');
        card.className = 'drive-card';
        
        let applyAction = isAuth 
            ? `<button class="btn btn-primary btn-sm apply-btn" onclick="applyForDrive('${drive.id}')">Apply Now</button>`
            : `<a href="login.html" class="btn btn-primary btn-sm">Log in to Apply</a>`;

        card.innerHTML = `
            <div class="card-header">
                <div class="company-logo" style="background: ${drive.color}">${drive.logoText}</div>
                <div class="status-badge active-badge">${drive.status}</div>
            </div>
            <div class="card-body">
                <h3>${drive.role}</h3>
                <p class="company-name">${drive.company}</p>
                <div class="job-details">
                    <span class="detail-item"><i class="fa-solid fa-indian-rupee-sign"></i> ${drive.package}</span>
                    <span class="detail-item"><i class="fa-solid fa-location-dot"></i> ${drive.location}</span>
                    <span class="detail-item"><i class="fa-solid fa-graduation-cap"></i> Min CGPA: ${drive.minCgpa}</span>
                </div>
            </div>
            <div class="card-footer">
                <div class="deadline">
                    <span>Deadline:</span>
                    <strong>${drive.deadline}</strong>
                </div>
                ${applyAction}
            </div>
        `;
        container.appendChild(card);
    });
}

async function applyForDrive(driveId) {
    // Example Application API call
    console.log(`Applying for drive: ${driveId}`);
    alert("Application submitted successfully!");
    // window.location.href = 'applications.html';
}

// Simulated Backend Response
function simulateFetchDrives() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    company: 'TechCorp Innovations',
                    logoText: 'TC',
                    color: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                    role: 'Software Development Engineer',
                    package: '12-15 LPA',
                    location: 'Bangalore / Remote',
                    minCgpa: '7.5',
                    deadline: 'Oct 15, 2026',
                    status: 'Actively Hiring'
                },
                {
                    id: '2',
                    company: 'Global Finance Ltd.',
                    logoText: 'GF',
                    color: 'linear-gradient(135deg, #064e3b, #10b981)',
                    role: 'Data Analyst',
                    package: '8-10 LPA',
                    location: 'Mumbai',
                    minCgpa: '6.5',
                    deadline: 'Sep 15, 2026',
                    status: 'Closing Soon'
                }
            ]);
        }, 800);
    });
}
