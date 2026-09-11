// js/auth.js
// Authentication logic using Supabase placeholders

/**
 * Checks if the user is currently authenticated.
 * @returns {boolean} True if logged in, false otherwise.
 */
function checkAuth() {
    // Placeholder for Supabase check
    // e.g., const { data: { session } } = await supabase.auth.getSession()
    // For now, checking a dummy localStorage flag
    return localStorage.getItem('auth_token') !== null;
}

/**
 * Logs in the user.
 * @param {string} email 
 * @param {string} password 
 */
async function loginUser(email, password) {
    // Placeholder for Supabase login
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log(`Logging in user: ${email}`);
    
    // Simulate successful login
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('auth_token', 'dummy_token');
            localStorage.setItem('user_name', 'John Doe');
            resolve({ success: true });
        }, 1000);
    });
}

/**
 * Signs up a new user.
 * @param {Object} userData 
 */
async function signupUser(userData) {
    // Placeholder for Supabase signup
    // const { data, error } = await supabase.auth.signUp({ email: userData.email, password: userData.password })
    console.log(`Signing up user: ${userData.email}`);
    
    // Simulate successful signup
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('auth_token', 'dummy_token');
            localStorage.setItem('user_name', userData.fullName);
            resolve({ success: true });
        }, 1500);
    });
}

/**
 * Logs out the user.
 */
async function logoutUser() {
    // Placeholder for Supabase logout
    // const { error } = await supabase.auth.signOut()
    console.log('Logging out user...');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    window.location.href = 'index.html';
}

/**
 * Enforces protected routes. Redirects to login if not authenticated.
 */
function requireAuth() {
    if (!checkAuth()) {
        window.location.href = 'login.html';
    }
}
