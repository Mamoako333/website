document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.navbar-collapse');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                }
            }
        });
    });
    
    // Quantity buttons functionality
    document.querySelectorAll('.input-group').forEach(group => {
        const increment = group.querySelector('.btn:last-child');
        const decrement = group.querySelector('.btn:first-child');
        const input = group.querySelector('input[type="text"]');
        
        if (increment && decrement && input) {
            increment.addEventListener('click', function() {
                input.value = parseInt(input.value) + 1;
            });
            
            decrement.addEventListener('click', function() {
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                }
            });
        }
    });
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card, .card-body');
            const name = card.querySelector('h2, h4, h5').textContent.trim();
            const priceText = card.querySelector('.price, h4')?.textContent.replace(/[^0-9.]/g, '') || '0';
            const price = parseFloat(priceText);
            const restaurant = card.querySelector('.restaurant-name, .lead')?.textContent.replace('From ', '').trim() || 'Unknown Restaurant';
            
            // Create cart item
            const item = {
                id: Date.now(),
                name: name,
                price: price,
                restaurant: restaurant,
                image: card.querySelector('img')?.src || 'images/default-food.jpg',
                quantity: parseInt(card.querySelector('input[type="text"]')?.value || '1')
            };
            
            // Add to cart
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(i => i.name === item.name && i.restaurant === item.restaurant);
            
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.push(item);
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            updateCartCount(totalItems);
            
            // Animation effect
            this.classList.add('added');
            setTimeout(() => {
                this.classList.remove('added');
            }, 1000);
            
            // Notification
            showNotification('Added to cart!');
        });
    });
    
    // Initialize game if on homepage
    if (document.getElementById('game-board')) {
        // Game initialization will be handled by the compiled game.js
    }
    
    // Update cart count on all pages
    function updateCartCount(count) {
        const cartCount = count || JSON.parse(localStorage.getItem('cart'))?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = cartCount;
        });
        localStorage.setItem('cartCount', cartCount.toString());
    }
    
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
    
    // Initialize cart count on page load
    updateCartCount();
    
    // Check login status
    if (localStorage.getItem('loggedIn')) {
        document.querySelectorAll('.login-btn').forEach(btn => {
            btn.textContent = 'My Account';
            btn.href = 'account.html';
        });
    }
});