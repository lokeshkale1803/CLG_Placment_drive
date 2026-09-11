// js/profile.js
document.addEventListener('DOMContentLoaded', () => {
    // Protect route
    requireAuth();

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }

    // Fetch and populate profile
    fetchProfile();

    // Handle profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', updateProfile);
    }
});

async function fetchProfile() {
    try {
        // Placeholder for FastAPI integration
        // const studentId = localStorage.getItem('student_id');
        // const response = await fetch(`${API_BASE_URL}/students/${studentId}`);
        // const profile = await response.json();
        
        // Mock data
        const profile = await simulateFetchProfile();
        
        // Populate display elements
        document.getElementById('profileNameDisplay').textContent = profile.fullName;
        document.getElementById('profileBranchDisplay').textContent = `${profile.branch} • Class of ${profile.gradYear}`;
        
        // Populate form fields
        document.getElementById('fullName').value = profile.fullName;
        document.getElementById('email').value = profile.email;
        document.getElementById('phone').value = profile.phone;
        document.getElementById('branch').value = profile.branch;
        document.getElementById('gradYear').value = profile.gradYear;
        document.getElementById('cgpa').value = profile.cgpa;
        document.getElementById('backlogs').value = profile.backlogs;
        document.getElementById('skills').value = profile.skills;
        
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}

async function updateProfile(e) {
    e.preventDefault();
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;

    try {
        // Get updated values
        const updatedData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            branch: document.getElementById('branch').value,
            gradYear: document.getElementById('gradYear').value,
            cgpa: document.getElementById('cgpa').value,
            backlogs: document.getElementById('backlogs').value,
            skills: document.getElementById('skills').value
        };

        // Placeholder for FastAPI integration
        // const studentId = localStorage.getItem('student_id');
        // await fetch(`${API_BASE_URL}/students/${studentId}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedData)
        // });

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Update display
        document.getElementById('profileNameDisplay').textContent = updatedData.fullName;
        document.getElementById('profileBranchDisplay').textContent = `${updatedData.branch} • Class of ${updatedData.gradYear}`;
        localStorage.setItem('user_name', updatedData.fullName);

        saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved';
        setTimeout(() => {
            saveBtn.innerHTML = 'Save Changes';
            saveBtn.disabled = false;
        }, 2000);

    } catch (error) {
        console.error("Error updating profile:", error);
        saveBtn.innerHTML = 'Error Saving';
        saveBtn.disabled = false;
    }
}

function simulateFetchProfile() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                fullName: localStorage.getItem('user_name') || 'John Doe',
                email: 'john.doe@college.edu',
                phone: '+91 9876543210',
                branch: 'CSE',
                gradYear: '2026',
                cgpa: '8.5',
                backlogs: '0',
                skills: 'Python, React, Tailwind CSS'
            });
        }, 500);
    });
}
