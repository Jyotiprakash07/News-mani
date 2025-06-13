document.addEventListener('DOMContentLoaded', function() {    // Add event listener to the "Shop Now" button    document.querySelector('.shop-now').addEventListener('click', function() {        alert('Redirecting to shop...');        window.location.href = 'product.html';    });    // Add event listeners to the "BUY NOW" buttons    document.querySelectorAll('.buy-now').forEach(function(button) {        button.addEventListener('click', function() {            alert('Item added to cart!');        });    });    // Add event listener to the contact form submission    document.querySelector('form').addEventListener('submit', function(event) {        event.preventDefault();        alert('Thank you for your message!');    });
    // Buy Now button functionality
    const buyButtons = document.querySelectorAll('.buy-now');

    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.content');
            if (product) {
                const productName = product.querySelector('p')?.textContent.trim();
                const productPrice = product.querySelector('.price')?.textContent.trim();

                if (productName && productPrice) {
                    alert(`You have selected: ${productName} - Price: ${productPrice}`);
                } else {
                    console.error("Product details missing.");
                }
            }
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search');
    const products = document.querySelectorAll('.content');

    if (searchInput && products.length > 0) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();

            products.forEach(product => {
                const productName = product.querySelector('p')?.textContent.toLowerCase();
                product.style.display = productName.includes(query) ? "block" : "none";
            });
        });
    }

    // Form validation
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Your message has been sent successfully!');
            form.reset();
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    // Add this inside your DOMContentLoaded function in script.js

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.content');
        if (product) {
            const productName = product.querySelector('p')?.textContent.trim();
            const productPrice = product.querySelector('.price')?.textContent.trim();

            if (productName && productPrice) {
                // Add product to cart
                cart.push({ name: productName, price: productPrice });
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${productName} has been added to your cart!`);
            } else {
                console.error("Product details missing.");
            }
        }
    });
});

    // Mobile menu toggle (hamburger menu)
    const checkbox = document.getElementById('checkbox');
    const menuItems = document.querySelector('.menu-items');

    if (checkbox && menuItems) {
        checkbox.addEventListener('change', () => {
            menuItems.style.display = checkbox.checked ? 'block' : 'none';
        });
    }
});
