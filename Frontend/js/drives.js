// js/drives.js

document.addEventListener('DOMContentLoaded', () => {

    // Setup navbar depending on login status
    setupNavbar();

    // Load placement drives
    fetchDrives();
});


// ======================================================
// NAVBAR SETUP
// ======================================================

function setupNavbar() {

    const isAuth = checkAuth();

    const navMenu = document.getElementById('dynamicNav');
    const navAuth = document.getElementById('dynamicAuth');

    if (isAuth) {

        navMenu.innerHTML = `
            <li>
                <a href="dashboard.html" class="nav-links">
                    Dashboard
                </a>
            </li>

            <li>
                <a href="drives.html" class="nav-links active">
                    Drives
                </a>
            </li>

            <li>
                <a href="applications.html" class="nav-links">
                    My Applications
                </a>
            </li>

            <li>
                <a href="profile.html" class="nav-links">
                    Profile
                </a>
            </li>
        `;

        navAuth.innerHTML = `
            <button id="logoutBtn" class="btn btn-outline">
                Logout
            </button>
        `;

        document
            .getElementById('logoutBtn')
            .addEventListener('click', logoutUser);

    } else {

        navMenu.innerHTML = `
            <li>
                <a href="index.html" class="nav-links">
                    Home
                </a>
            </li>

            <li>
                <a href="drives.html" class="nav-links active">
                    Ongoing Drives
                </a>
            </li>
        `;

        navAuth.innerHTML = `
            <a href="login.html" class="btn btn-outline">
                Log In
            </a>

            <a href="signup.html" class="btn btn-primary">
                Sign Up
            </a>
        `;
    }
}


// ======================================================
// FETCH PLACEMENT DRIVES FROM FASTAPI
// ======================================================

async function fetchDrives() {

    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const emptyState = document.getElementById('emptyState');
    const drivesContainer = document.getElementById('drivesContainer');


    // Initial states
    loadingState.style.display = 'block';
    errorState.style.display = 'none';
    emptyState.style.display = 'none';
    drivesContainer.style.display = 'none';


    try {

        // Call Railway FastAPI backend
        const response = await fetch(`${API_BASE_URL}/drives`);


        // Check API response
        if (!response.ok) {
            throw new Error(
                `Failed to fetch drives. Status: ${response.status}`
            );
        }


        // Convert response to JSON
        const data = await response.json();


        // Convert backend field names
        // into frontend field names
        const drives = data.map(drive => ({

            id: drive.id,

            company: drive.company_name,

            role: drive.job_role,

            package:
                drive.package !== null
                    ? `${drive.package} LPA`
                    : "Not specified",

            location:
                drive.location || "Not specified",

            minCgpa:
                drive.minimum_cgpa ?? "Not specified",

            deadline:
                formatDate(drive.drive_date),

            status:
                "Actively Hiring",

            logoText:
                drive.company_name
                    ? drive.company_name
                        .substring(0, 2)
                        .toUpperCase()
                    : "CO",

            color:
                "linear-gradient(135deg, #1e3a8a, #3b82f6)"
        }));


        // Hide loading
        loadingState.style.display = 'none';


        // If database is empty
        if (drives.length === 0) {

            emptyState.style.display = 'block';

        } else {

            renderDrives(drives);

            drivesContainer.style.display = 'grid';
        }


    } catch (error) {

        console.error(
            "Error fetching placement drives:",
            error
        );

        loadingState.style.display = 'none';
        errorState.style.display = 'block';
    }
}


// ======================================================
// RENDER PLACEMENT DRIVE CARDS
// ======================================================

function renderDrives(drives) {

    const container =
        document.getElementById('drivesContainer');

    container.innerHTML = '';

    const isAuth = checkAuth();


    drives.forEach(drive => {

        const card = document.createElement('div');

        card.className = 'drive-card';


        // Apply button depending on login status
        const applyAction = isAuth

            ? `
                <button
                    class="btn btn-primary btn-sm apply-btn"
                    onclick="applyForDrive('${drive.id}')"
                >
                    Apply Now
                </button>
            `

            : `
                <a
                    href="login.html"
                    class="btn btn-primary btn-sm"
                >
                    Log in to Apply
                </a>
            `;


        card.innerHTML = `

            <div class="card-header">

                <div
                    class="company-logo"
                    style="background: ${drive.color}"
                >
                    ${drive.logoText}
                </div>


                <div class="status-badge active-badge">
                    ${drive.status}
                </div>

            </div>


            <div class="card-body">

                <h3>
                    ${drive.role}
                </h3>


                <p class="company-name">
                    ${drive.company}
                </p>


                <div class="job-details">

                    <span class="detail-item">

                        <i class="fa-solid fa-indian-rupee-sign"></i>

                        ${drive.package}

                    </span>


                    <span class="detail-item">

                        <i class="fa-solid fa-location-dot"></i>

                        ${drive.location}

                    </span>


                    <span class="detail-item">

                        <i class="fa-solid fa-graduation-cap"></i>

                        Min CGPA:
                        ${drive.minCgpa}

                    </span>

                </div>

            </div>


            <div class="card-footer">

                <div class="deadline">

                    <span>
                        Drive Date:
                    </span>

                    <strong>
                        ${drive.deadline}
                    </strong>

                </div>


                ${applyAction}

            </div>
        `;


        container.appendChild(card);
    });
}


// ======================================================
// FORMAT DATE
// ======================================================

function formatDate(dateString) {

    if (!dateString) {
        return "Not specified";
    }

    const date = new Date(dateString);

    return date.toLocaleDateString(
        'en-IN',
        {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
    );
}


// ======================================================
// APPLY FOR DRIVE
// ======================================================

async function applyForDrive(driveId) {

    console.log(
        `Applying for placement drive: ${driveId}`
    );


    // Currently temporary
    // Later this will POST data
    // into applications table

    alert(
        "Application submitted successfully!"
    );


    // Later:
    // window.location.href = "applications.html";
}