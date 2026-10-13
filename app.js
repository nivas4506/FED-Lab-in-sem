// Predefined users (run once to setup)
function setupUsers() {
    const users = [
        { username: 'admin', password: 'admin123' },
        { username: 'user', password: 'user123' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('users', JSON.stringify(users));
}

function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    if (!user || !pass) return alert('Fill all fields');
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || sessionStorage.getItem('users') || '[]');
    const found = storedUsers.find(u => u.username === user && u.password === pass);
    
    if (!found) return alert('Invalid credentials');
    
    sessionStorage.setItem('currentUser', user);
    if (remember) localStorage.setItem('currentUser', user);
    
    showDashboard(user);
}

function logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

function showDashboard(user) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('user-name').textContent = user;
    document.getElementById('session-data').textContent = sessionStorage.getItem('currentUser') || 'none';
    document.getElementById('local-data').textContent = localStorage.getItem('currentUser') || 'none';
}

window.onload = () => {
    if (!localStorage.getItem('users')) setupUsers();
    const sessionUser = sessionStorage.getItem('currentUser');
    const localUser = localStorage.getItem('currentUser');
    if (sessionUser || localUser) showDashboard(sessionUser || localUser);
};