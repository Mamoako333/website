document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.getElementById('cart-count');
    
    // Update cart count
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        localStorage.setItem('cartCount', totalItems);
    }
    
    // Render cart items
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                    <a href="index.html" class="btn btn-success">Browse Restaurants</a>
                </div>
            `;
            checkoutBtn.disabled = true;
            return;
        }
        
        checkoutBtn.disabled = false;
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item row mb-3 align-items-center" data-id="${item.id}">
                <div class="col-3 col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-5 col-md-6">
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">${item.restaurant}</small>
                </div>
                <div class="col-4 col-md-4">
                    <div class="d-flex align-items-center justify-content-end">
                        <div class="input-group input-group-sm" style="width: 120px;">
                            <button class="btn btn-outline-secondary decrement">-</button>
                            <input type="text" class="form-control text-center quantity" value="${item.quantity}">
                            <button class="btn btn-outline-secondary increment">+</button>
                        </div>
                        <span class="ms-3 price">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="btn btn-link text-danger remove-item ms-2">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.increment').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                const item = cart.find(i => i.id == itemId);
                item.quantity++;
                saveCart();
            });
        });
        
        document.querySelectorAll('.decrement').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                const item = cart.find(i => i.id == itemId);
                if (item.quantity > 1) {
                    item.quantity--;
                    saveCart();
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                const itemIndex = cart.findIndex(i => i.id == itemId);
                cart.splice(itemIndex, 1);
                saveCart();
            });
        });
        
        updateTotals();
    }
    
    // Update order totals
    function updateTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08;
        const deliveryFee = subtotal > 25 ? 0 : 3.99;
        const total = subtotal + tax + deliveryFee;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        taxElement.textContent = `$${tax.toFixed(2)}`;
        document.getElementById('delivery-fee').textContent = `$${deliveryFee.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
    }
    
    // Tip buttons
    document.querySelectorAll('.tip-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Initialize
    updateCartCount();
    renderCartItems();
    
    // Load cart count on other pages
    if (localStorage.getItem('cartCount')) {
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = localStorage.getItem('cartCount');
        });
    }
});