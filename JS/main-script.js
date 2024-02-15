let autoplayInterval;

// Function to move the first slide to the end
function moveFirstSlideToEnd() {
    const slides = document.querySelector('.slides');
    const firstSlide = slides.firstElementChild;

    slides.appendChild(firstSlide); // Moves the first slide to the end
}

// Function to switch slides
function switchSlide() {
    const activeSlide = document.querySelector('.slide.active');
    const nextSlide = activeSlide.nextElementSibling || document.querySelector('.slide:first-child'); // If there's no next slide, loops back to the first
    const activeSlideIndicator = document.querySelector('.slide-indicator.checked');
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || document.querySelector('.slide-indicator:first-child'); // If there's no next indicator, loops back to the first

    activeSlide.classList.remove('active');
    activeSlideIndicator.classList.remove('checked');
    nextSlide.classList.add('active');
    nextSlideIndicator.classList.add('checked');

    // Changes aria-current attribute to the current slide item
    activeSlideIndicator.removeAttribute('aria-current');
    nextSlideIndicator.setAttribute('aria-current', 'step');
}

// Function to go to the previous slide
function prevSlide() {
    clearInterval(autoplayInterval); // Clears the autoplay interval when the user slides manually

    // Gets the previous slide and its indicator
    const activeSlide = document.querySelector('.slide.active');
    const prevSlide = activeSlide.previousElementSibling || document.querySelector('.slide:last-child'); // If there's no previous slide, loops back to the last
    const activeSlideIndicator = document.querySelector('.slide-indicator.checked');
    const prevSlideIndicator = activeSlideIndicator.previousElementSibling || document.querySelector('.slide-indicator:last-child'); // If there's no previous indicator, loops back to the last

    // Updates classes to show the previous slide and its indicator
    activeSlide.classList.remove('active');
    activeSlideIndicator.classList.remove('checked');
    prevSlide.classList.add('active');
    prevSlideIndicator.classList.add('checked');

    // Changes aria-current attribute to the current slide item
    activeSlideIndicator.removeAttribute('aria-current');
    prevSlideIndicator.setAttribute('aria-current', 'step');

    startAutoplay(); // Restarts the autoplay after sliding manually
}

// Function to go to the next slide
function nextSlide() {
    clearInterval(autoplayInterval); // Clears the autoplay interval when the user slides manually

    // Gets the next slide and its indicator
    const activeSlide = document.querySelector('.slide.active');
    const nextSlide = activeSlide.nextElementSibling || document.querySelector('.slide:first-child'); // If there's no next slide, loops back to the first
    const activeSlideIndicator = document.querySelector('.slide-indicator.checked');
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || document.querySelector('.slide-indicator:first-child'); // If there's no next indicator, loops back to the first

    // Updates classes to show the previous slide and its indicator
    activeSlide.classList.remove('active');
    activeSlideIndicator.classList.remove('checked');
    nextSlide.classList.add('active');
    nextSlideIndicator.classList.add('checked');

    // Changes aria-current attribute to the current slide item
    activeSlideIndicator.removeAttribute('aria-current');
    nextSlideIndicator.setAttribute('aria-current', 'step');

    startAutoplay(); // Restarts the autoplay after sliding manually
}

// Function to start the autoplay slideshow
function startAutoplay() {
    // Sets up an interval to switch slides automatically
    autoplayInterval = setInterval(() => {
        moveFirstSlideToEnd();
        switchSlide();
    }, 5000); // Switches slides every 5 seconds
}

// Function to start the slideshow
function startSlideshow() {
    startAutoplay(); // Starts autoplay
    // Binds manual navigation functions to slider buttons
    document.querySelector('.slider-button.prev').addEventListener('click', prevSlide);
    document.querySelector('.slider-button.next').addEventListener('click', nextSlide);
}

// Starts the slideshow when the page loads
window.addEventListener('load', startSlideshow);




// Handles scroll buttons and their visibility
window.addEventListener('scroll', function () {
    let scroll = document.querySelectorAll('.scrollBtn');
    let isOnBottom = (window.innerHeight + window.scrollY + 50) >= document.documentElement.offsetHeight;
    let scrollTop = scroll[0];
    let scrollBottom = scroll[1];

    // Toggles active class based on scroll position
    scrollTop.classList.toggle('active', window.scrollY > 0);
    scrollBottom.classList.toggle('active', !isOnBottom);

    // Positions the scrolling buttons based on the window
    if (this.window.scrollY <= 0 || isOnBottom) {
        scrollTop.style.marginBottom = '-50px';
    } else {
        scrollTop.style.marginBottom = '0'
    }
})

// Function to go back to the top of the page
function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// Function to go back to the bottom of the page
function goToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
    })
}