document.addEventListener('DOMContentLoaded', function() {
    // Load cart count from localStorage
    if (localStorage.getItem('cartCount')) {
        document.getElementById('cart-count').textContent = localStorage.getItem('cartCount');
    }

    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                // In a real app, you would send this to a server
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                alert('Please fill in all fields');
            }
        });
    }
});