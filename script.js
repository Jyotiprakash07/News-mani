(() => {
  const CART_KEY = 'newsManiCart';
  const LEGACY_CART_KEY = 'cart';
  const USER_KEY = 'newsManiUser';

  const safeParse = (value, fallback) => {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (_error) {
      return fallback;
    }
  };

  const getCart = () => {
    const cart = safeParse(localStorage.getItem(CART_KEY), null);
    if (Array.isArray(cart)) return cart;

    const legacyCart = safeParse(localStorage.getItem(LEGACY_CART_KEY), []);
    return Array.isArray(legacyCart) ? legacyCart : [];
  };

  const setCart = (cart) => {
    const cleanCart = Array.isArray(cart) ? cart : [];
    localStorage.setItem(CART_KEY, JSON.stringify(cleanCart));
    localStorage.setItem(LEGACY_CART_KEY, JSON.stringify(cleanCart));
    localStorage.setItem('cartCount', String(cleanCart.length));
    updateCartCount();
  };

  const updateCartCount = () => {
    const count = getCart().length;
    document.querySelectorAll('#cartCount, [data-cart-count]').forEach((badge) => {
      badge.textContent = String(count);
    });
  };

  const getProductFromButton = (button) => {
    const card = button.closest('.content, .shop-item');
    if (!card) return null;

    const title = card.querySelector('[data-product-name]')?.dataset.productName
      || card.querySelector('h3')?.textContent
      || card.querySelector('p')?.textContent
      || 'News-mani item';

    const price = card.querySelector('.price')?.textContent || '₹0';
    const image = card.querySelector('img')?.getAttribute('src') || '';

    return {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: title.trim(),
      price: price.trim(),
      image,
      quantity: 1
    };
  };

  const showFeedback = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `message ${type}`;
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.textContent = message;
    Object.assign(toast.style, {
      position: 'fixed',
      right: '1rem',
      bottom: '1rem',
      zIndex: '9999',
      maxWidth: 'min(360px, calc(100vw - 2rem))',
      boxShadow: '0 14px 34px rgba(65, 57, 38, 0.18)'
    });
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 2600);
  };

  const addProductToCart = (product, message) => {
    if (!product) return;
    const cart = getCart();
    cart.push(product);
    setCart(cart);
    showFeedback(message || `${product.name} added to your cart.`);
  };

  const renderCart = () => {
    const cartList = document.getElementById('cartList');
    if (!cartList) return;

    const cart = getCart();
    const cartTotal = document.getElementById('cartTotal');
    const emptyCartMsg = document.getElementById('emptyCartMsg');
    const clearCartBtn = document.getElementById('clearCartBtn');

    cartList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      if (cartTotal) cartTotal.textContent = '';
      if (emptyCartMsg) emptyCartMsg.style.display = 'block';
      if (clearCartBtn) clearCartBtn.disabled = true;
      return;
    }

    if (emptyCartMsg) emptyCartMsg.style.display = 'none';
    if (clearCartBtn) clearCartBtn.disabled = false;

    cart.forEach((item, index) => {
      total += Number(String(item.price).replace(/[^\d.]/g, '')) || 0;

      const li = document.createElement('li');
      const title = document.createElement('span');
      const price = document.createElement('span');
      const removeButton = document.createElement('button');

      title.className = 'cart-item-title';
      title.textContent = item.name || 'News-mani item';

      price.className = 'cart-item-price';
      price.textContent = item.price || '₹0';

      removeButton.className = 'remove-btn';
      removeButton.type = 'button';
      removeButton.dataset.index = String(index);
      removeButton.textContent = 'Remove';

      li.append(title, price, removeButton);
      cartList.appendChild(li);
    });

    if (cartTotal) cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
  };

  const setupCartPage = () => {
    const cartList = document.getElementById('cartList');
    if (!cartList) return;

    cartList.addEventListener('click', (event) => {
      const removeButton = event.target.closest('.remove-btn');
      if (!removeButton) return;

      const cart = getCart();
      cart.splice(Number(removeButton.dataset.index), 1);
      setCart(cart);
      renderCart();
    });

    document.getElementById('clearCartBtn')?.addEventListener('click', () => {
      setCart([]);
      renderCart();
      showFeedback('Your cart is now empty.');
    });

    renderCart();
  };

  const setupProductButtons = () => {
    document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
      button.addEventListener('click', () => addProductToCart(getProductFromButton(button)));
    });

    document.querySelectorAll('.buy-now').forEach((button) => {
      button.addEventListener('click', () => {
        const product = getProductFromButton(button);
        addProductToCart(product, `${product?.name || 'Item'} is ready for checkout.`);
      });
    });
  };

  const setupSearch = () => {
    const searchInput = document.getElementById('search');
    const products = Array.from(document.querySelectorAll('#seller .content'));
    if (!searchInput || products.length === 0) return;

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      products.forEach((product) => {
        const productName = product.querySelector('p')?.textContent.toLowerCase() || '';
        product.classList.toggle('is-hidden', query !== '' && !productName.includes(query));
      });
    });
  };

  const setupContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      const formMessage = document.getElementById('formMessage');

      const setMessage = (text, type) => {
        if (!formMessage) return;
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
      };

      if (!name || !email || !message) {
        setMessage('Please fill out all fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMessage('Please enter a valid email address.', 'error');
        return;
      }

      setMessage('Thank you. Your message has been received.', 'success');
      form.reset();
    });
  };

  const setupSignup = () => {
    const form = document.getElementById('signupForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const password = document.getElementById('password')?.value || '';
      const confirmPassword = document.getElementById('confirmPassword')?.value || '';
      const messageDiv = document.getElementById('signupMessage');

      const setMessage = (text, type) => {
        if (!messageDiv) return;
        messageDiv.textContent = text;
        messageDiv.className = `signup-message ${type}`;
      };

      if (!name || !email || !password || !confirmPassword) {
        setMessage('Please fill out all fields.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMessage('Please enter a valid email address.', 'error');
        return;
      }

      if (password.length < 6) {
        setMessage('Password must be at least 6 characters.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        setMessage('Passwords do not match.', 'error');
        return;
      }

      const user = { name, email, password };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem('user', JSON.stringify(user));
      setMessage('Signup successful. You can now sign in.', 'success');
      form.reset();
    });
  };

  const setupSignin = () => {
    const form = document.getElementById('signinForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('signin-email')?.value.trim();
      const password = document.getElementById('signin-password')?.value || '';
      const messageDiv = document.getElementById('signinMessage');
      const user = safeParse(localStorage.getItem(USER_KEY), safeParse(localStorage.getItem('user'), null));

      const setMessage = (text, type) => {
        if (!messageDiv) {
          showFeedback(text, type);
          return;
        }
        messageDiv.textContent = text;
        messageDiv.className = `signin-message ${type}`;
      };

      if (user && user.email === email && user.password === password) {
        setMessage('Sign in successful. Redirecting to home...', 'success');
        window.setTimeout(() => {
          window.location.href = 'index.html';
        }, 800);
      } else {
        setMessage('Invalid email or password.', 'error');
      }
    });
  };

  const setupNavEffects = () => {
    document.querySelectorAll('.nav-link').forEach((button) => {
      button.addEventListener('click', (event) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
        button.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 600);
      });
    });
  };

  const setupDateSearch = () => {
    const form = document.getElementById('dateSearchForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const date = document.getElementById('search_date')?.value;
      const result = document.getElementById('dateSearchResult');
      if (!result) return;

      result.textContent = date
        ? `No live archive is connected yet. You searched for newspapers published on ${date}.`
        : 'Please select a date first.';
      result.className = `message ${date ? 'success' : 'error'}`;
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-current-year]').forEach((node) => {
      node.textContent = String(new Date().getFullYear());
    });

    updateCartCount();
    setupNavEffects();
    setupProductButtons();
    setupSearch();
    setupContactForm();
    setupCartPage();
    setupSignup();
    setupSignin();
    setupDateSearch();
  });
})();
