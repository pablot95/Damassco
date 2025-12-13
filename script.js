// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    const searchTerm = prompt('¿Qué estás buscando?');
    if (searchTerm) {
        console.log('Buscando:', searchTerm);
        // Aquí se implementaría la lógica de búsqueda real
        alert(`Buscando "${searchTerm}"... (Función en desarrollo)`);
    }
});

// Shopping Cart
let cart = [];
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.querySelector('.cart-count');

// Quick View functionality
const quickViewBtns = document.querySelectorAll('.quick-view');
quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        showQuickView(productName, productPrice);
    });
});

function showQuickView(name, price) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${name}</h2>
            <p class="modal-price">${price}</p>
            <div class="modal-actions">
                <button class="btn btn-primary add-to-cart-btn">Agregar al Carrito</button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            padding: 60px 40px;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 30px;
            color: #666;
            background: none;
            border: none;
            cursor: pointer;
            line-height: 1;
            transition: color 0.3s;
        }
        
        .modal-close:hover {
            color: #000;
        }
        
        .modal-content h2 {
            font-size: 2rem;
            margin-bottom: 15px;
        }
        
        .modal-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 30px;
        }
        
        .modal-actions {
            margin-top: 30px;
        }
    `;
    
    if (!document.querySelector('#modal-styles')) {
        style.id = 'modal-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    
    // Close modal
    const closeModal = () => {
        modal.remove();
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Add to cart
    modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        addToCart(name, price);
        closeModal();
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartCount();
    showNotification(`${name} agregado al carrito`);
}

function updateCartCount() {
    cartCount.textContent = cart.length;
    
    // Animate cart icon
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--secondary-color);
            color: white;
            padding: 18px 28px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: notificationSlide 0.3s ease;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        @keyframes notificationSlide {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Cart button click
cartBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
    } else {
        let cartContent = 'Tu carrito:\\n\\n';
        cart.forEach((item, index) => {
            cartContent += `${index + 1}. ${item.name} - ${item.price}\\n`;
        });
        alert(cartContent + '\\n(Sistema de carrito completo en desarrollo)');
    }
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    if (email) {
        showNotification('¡Gracias por suscribirte!');
        newsletterForm.reset();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Removed animations for better UX - all content now visible immediately

// Sticky header effect
let lastScroll = 0;
const header = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Product color selector
document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from siblings
        const siblings = this.parentElement.querySelectorAll('.color-dot');
        siblings.forEach(s => s.style.borderWidth = '2px');
        
        // Add active state to clicked dot
        this.style.borderWidth = '3px';
        this.style.borderColor = 'var(--primary-color)';
        
        showNotification('Color seleccionado');
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Damassco. Todos los derechos reservados.`;
}

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    // Additional scroll handlers can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Console welcome message
console.log('%c¡Bienvenido a Damassco! 🛍️', 'font-size: 20px; font-weight: bold; color: #8B4513;');
console.log('%cArtesanía en cuero genuino desde 1985', 'font-size: 14px; color: #666;');
