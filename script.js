// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Get the target section id
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Align the scroll to the top of the target section
            });
        }
    });
});

// Carousel Auto-Slide
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showNextSlide() {
    carouselItems[currentIndex].style.opacity = 0;
    carouselItems[currentIndex].style.transform = 'translateY(20px)';
    
    currentIndex = (currentIndex + 1) % carouselItems.length;
    
    carouselItems[currentIndex].style.opacity = 1;
    carouselItems[currentIndex].style.transform = 'translateY(0)';
}

function showPrevSlide() {
    carouselItems[currentIndex].style.opacity = 0;
    carouselItems[currentIndex].style.transform = 'translateY(20px)';
    
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    
    carouselItems[currentIndex].style.opacity = 1;
    carouselItems[currentIndex].style.transform = 'translateY(0)';
}

setInterval(showNextSlide, 3000); // Change slide every 3 seconds

// Carousel Manual Controls
document.querySelector('.carousel-control.next').addEventListener('click', () => {
    showNextSlide();
});

document.querySelector('.carousel-control.prev').addEventListener('click', () => {
    showPrevSlide();
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
    alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
    this.reset(); // Clears the form fields
});

// Update the active link based on scroll position
window.addEventListener('scroll', () => {
    let current = "";
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 60)) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add class 'visible' to sections when they enter the viewport
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
});

// Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sendMessageButton = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    function addMessage(message, fromUser) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.classList.add(fromUser ? 'user-message' : 'bot-message');
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    sendMessageButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true); // User message
            chatInput.value = '';
            // Simulate bot response
            setTimeout(function() {
                addMessage('Gracias por tu mensaje. Te responderemos pronto.', false);
            }, 1000);
        }
    });

    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessageButton.click();
        }
    });
});

// Google Maps Initialization
function initMap() {
    const location = { lat: -34.397, lng: 150.644 };
    const map = new google.maps.Map(document.getElementById('map-container'), {
        center: location,
        zoom: 8
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

window.onload = function() {
    initMap();
};

// Notification Feature
document.getElementById('requestPermission').addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        alert('Ya tienes permiso para recibir notificaciones.');
    } else if (Notification.permission === 'denied') {
        alert('No se puede solicitar permiso para notificaciones porque ya fue denegado.');
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                alert('Permiso para notificaciones concedido.');
            } else {
                alert('Permiso para notificaciones denegado.');
            }
        });
    }
});

document.getElementById('sendNotification').addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        const notification = new Notification('¡Hola!', {
            body: 'Tienes un nuevo mensaje en tu página web.',
            icon: 'imagenes_index/noti.png' // Asegúrate de que esta ruta es correcta y accesible
        });

        notification.onclick = () => {
            window.open('http://localhost/javas');
        };
    } else if (Notification.permission === 'denied') {
        alert('No se puede solicitar permiso para notificaciones porque ya fue denegado.');
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                const notification = new Notification('¡Hola!', {
                    body: 'Tienes un nuevo mensaje en tu página web.',
                    icon: 'imagenes_index/noti.png' // Asegúrate de que esta ruta es correcta y accesible
                });

                notification.onclick = () => {
                    window.open('http://localhost/javas');
                };
            } else {
                alert('Permiso para notificaciones denegado.');
            }
        });
    }
});







