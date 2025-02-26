### our-website
This is a sample website to my idea on a startup to build a ecommerce website and if anyone intrested commit the changes here:
BUY.HTML Code:-
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NewsX</title>
    <link rel="stylesheet" href="buy.css">
    <script defer src="buy.js"></script>
</head>
<body>

<section class="top-txt">
        <div class="head container">
            <div class="head-txt">
                <p>Get Newspaper at your doorstep with just one click.</p>
            </div>
        </div>
        <div class="sign-in-up">
            <a href="#">SIGN IN</a>
            <a href="#">SIGN UP</a>
        </div>
    </section>

<nav class="navbar">
        <div class="navbar-container">
            <input type="checkbox" id="checkbox">
            <div class="hamburger-lines">
                <span class="line line1"></span>
                <span class="line line2"></span>
                <span class="line line3"></span>
            </div>
            <ul class="menu-items">
                <li><a href="/">Home</a></li>
                <li><a href="product.html">Shop</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="cart.html"><i class="fas fa-shopping-cart"></i></a></li>
            </ul>
        </div>
    </nav>

  <header class="bg-light">
        <div class="logo">
            <img src="logo.png" alt="ShopeZ Logo">
            <h1>NewsX</h1>
        </div>
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="/">
                    <img src="logo.png" alt="ShopeZ Logo" width="120">
                </a>
                <ul>
                    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="product.html">Shop</a></li>
                    <li class="nav-item"><a class="nav-link" href="#blog">Blog</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="cart.html"><i class="fas fa-shopping-cart"></i></a></li>
                </ul>
            </nav>
        </div>
    </header>

  <section id="home">
        <div class="home_page">
            <div class="home_txt">
                <p class="collection">HINDUSTAN TIMES</p>
                <p class="collection">TIMES OF INDIA</p>
                <p class="collection">INDIAN EXPRESS</p>
                <p class="collection">THE TELEGRAPH</p>
                <p>AND MANY MORE... ALSO LOCAL NEWSPAPERS...</p>
            </div>
            <div class="home_label">
                <p>A specialist domain to order your newspaper. The right time to choose for study. Access the portal. We deliver quality content.</p>
            </div>
            <label for="search">Search</label>
            <input type="search" id="search" placeholder="Search" name="search" title="Search">
            <button class="shop-now">Shop Now <i class="fas fa-search"></i></button>
            <div class="home_social_icons">
                <a href="#"><i class="bx bxl-facebook"></i></a>
                <a href="#"><i class="bx bxl-twitter"></i></a>
                <a href="#"><i class="bx bxl-pinterest"></i></a>
                <a href="#"><i class="bx bxl-youtube"></i></a>
                <a href="#"><i class="bx bxl-instagram"></i></a>
        
  <div>
 </div>
    </section>

   <section id="seller">
            
           

   <div class="content">
                <img src="hindustan.jpg" alt="Hindustan Times">
                <p>Hindustan Times</p>
                <div class="price">₹10</div>
                <button class="buy-now">BUY NOW</button>
                <a href="#ReadNow" class="read-now-button">READ NOW</a>
            </div>

   <div class="content">
                <img src="timesofindia.jpg" alt="Times of India">
                <p>Times Of India</p>
                <div class="price">₹10</div>
                <button class="buy-now">BUY NOW</button>
                <a href="#ReadNow" class="read-now-button">READ NOW</a>
            </div>

  <div class="content">
                <img src="indianexpress.jpg" alt="Indian Express">
                <p>Indian Express</p>
                <div class="price">₹10</div>
                <button class="buy-now">BUY NOW</button>
                <a href="#ReadNow" class="read-now-button">READ NOW</a>
            </div>

  <div class="content">
                <img src="financialexpress.jpg" alt="Financial Express">
                <p>Financial Express</p>
                <div class="price">₹10</div>
                <button class="buy-now">BUY NOW</button>
                <a href="#ReadNow" class="read-now-button">READ NOW</a>
            </div>
        </div>
    </section>

  <section id="benefits">
        <h4>Benefits of Reading Newspaper</h4>
        <a href="#" target="_blank">Read More</a>
    </section>

  <section id="contact">
        <div class="form">
            <div class="form-txt">
                <h4>Information</h4>
                <h1>Contact Us</h1>
                <p>As you might expect from a company that began as a high-end interiors contractor, we pay strict attention.</p>
                <h3>INDIA</h3>
            </div>
                <label for="name">Your Name</label>
                <input type="text" id="name" placeholder="Your Name" required title="Your Name">
                <label for="email">Your Email</label>
                <input type="email" id="email" placeholder="Your Email" required title="Your Email">
                <label for="message">Your Message</label>
                <textarea id="message" placeholder="Your Message" required title="Your Message"></textarea>
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    </section>

</body>
</html>
BUY.CSS:-
/* Dark Theme Styles */
:root {
    --primary-color: #1e1e1e;
    --secondary-color: #252525;
    --text-color: #ffffff;
    --accent-color: #ff9900;
    --border-color: #333;
}

body {
    background-color: var(--primary-color);
    color: var(--text-color);
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

/* Header & Navigation */
.top-txt {
    background: var(--accent-color);
    text-align: center;
    padding: 10px;
    font-weight: bold;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: var(--secondary-color);
    border-bottom: 2px solid var(--border-color);
}

.navbar ul {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
}

.navbar a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: bold;
    transition: 0.3s;
}

.navbar a:hover {
    color: var(--accent-color);
}

/* Home Section */
#home {
    text-align: center;
    padding: 50px;
}

.home_page p {
    font-size: 1.2rem;
    font-weight: bold;
}

input[type="search"] {
    padding: 10px;
    width: 60%;
    max-width: 400px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background: var(--secondary-color);
    color: var(--text-color);
}

button.shop-now {
    background: var(--accent-color);
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    color: var(--primary-color);
    cursor: pointer;
    transition: 0.3s;
}

button.shop-now:hover {
    background: #cc7a00;
}

/* Product Section */
.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
}

.content div {
    background: var(rgb(106, 11, 214)11, 103, 194)34, 120, 206;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    transition: 0.3s;
    width: 250px;
}

.content div:hover {
    transform: scale(1.05);
}

.content img {
    width: 100%;
    border-radius: 5px;
}

.price {
    color: var(--accent-color);
    font-size: 1.2rem;
    font-weight: bold;
    margin: 10px 0;
}

button.buy-now {
    background: var(--accent-color);
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    color: var(--primary-color);
    cursor: pointer;
    transition: 0.3s;
}

button.buy-now:hover {
    background:linear-gradient(180deg, #4b91f7 0%,#367af6 100%);
}

/* Contact Section */
#contact {
    text-align: center;
    padding: 50px;
    background: var(--secondary-color);
}

form input, form textarea {
    width: 60%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    background: var(--primary-color);
    color: var(--text-color);
}

button[type="submit"] {
    background: var(--accent-color);
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;
}

button[type="submit"]:hover {
    background: #cc7a00;
}   
    .read-now-button{
    display:flex;
    flex-direction: column;
    align-items: center;
    padding:6px 14px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: var(--accent-color);
    border-radius: 6px;
    color: #ff9900;
    background: linear-gradient(180deg, #4b91f7 0%,#367af6 100%);
    background-origin: border-box;
    box-shadow: 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s;

}
BUY.JS:-
document.addEventListener("DOMContentLoaded", function () {
    // Mobile Menu Toggle
    const checkbox = document.getElementById("checkbox");
    const navbar = document.querySelector(".navbar-container");
    
   checkbox.addEventListener("change", function () {
        if (this.checked) {
            navbar.classList.add("active");
        } else {
            navbar.classList.remove("active");
        }
    });

  // Search Functionality
    const searchInput = document.querySelector("input[type='searchs']");
    const shopNowButton = document.querySelector("button[type='submit']");
    
  shopNowButton.addEventListener("click", function (event) {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (query !== "") {
            alert("Searching for: " + query);
        } else {
            alert("Please enter a search term.");
        }
    });

  // Buy Now Button Click Events
    const buyButtons = document.querySelectorAll("button[type='submit']");
    buyButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Item added to cart!");
        });
    });

  // Contact Form Submission (if needed in the future)
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you for contacting us!");
        });
    }
});
IN CONCLUSION THIS IS THE CODE I HAVE WRITTEN FOR MY WEBSITE IT NEEDS TOO MANY CHANGES SO PLEASE HELP ME WITH IT.



