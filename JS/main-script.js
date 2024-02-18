// HEADER //

let lastScrollTop = 0; // Stores the last vertical scrolling position. Zero by default

const header = document.querySelector('header'); // Selects the header

window.addEventListener('scroll', function () {
    let currentScrollTop = window.scrollY || document.documentElement.scrollTop; // Stores the current scrolling position

    // Toggles the visibility of the navbar based on the scrolling position
    if (currentScrollTop > lastScrollTop) {
        header.style.top = '-100px';
    } else {
        header.style.top = '100px';
    }

    lastScrollTop = currentScrollTop; // Sets the last scrolling position to the current one
});

// Selects hamburger menu and it's icon
const hamburger = document.querySelector('.hamburger-menu');
const hamburgerIcon = document.querySelector('.hamburger-menu i');
const mainNavList = document.querySelector('.main-nav-list')

// Function to toggle scroll lock based on window width and hamburger menu state
function toggleScrollLock() {
    if (window.innerWidth < 800 && hamburger.classList.contains('open')) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'auto';
    }
}

// Handles clicks on the hamburger menu
hamburger.addEventListener('click', function () {
    // Toggles the 'open' and 'closed' classes of the hamburger
    hamburger.classList.toggle('open');
    hamburger.classList.toggle('closed');

    // Toggles the hamburger icons
    hamburgerIcon.classList.toggle('fa-bars-staggered');
    hamburgerIcon.classList.toggle('fa-bars');

    // Toggles the visibility of the nav list
    mainNavList.classList.toggle('visible');

    // Toggles the scroll lock
    toggleScrollLock();
});

// Listens for window resize events to update scroll lock
window.addEventListener('resize', toggleScrollLock);


// SHOWCASE //

let autoplayInterval;

// Function to switch slides
function switchSlide() {
    // Gets the active and next slides and their indicators
    const activeSlide = document.querySelector('.slide.active');
    const nextSlide = activeSlide.nextElementSibling || document.querySelector('.slide:first-child'); // If there's no next slide, loops back to the first
    const activeSlideIndicator = document.querySelector('.slide-indicator.checked');
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || document.querySelector('.slide-indicator:first-child'); // If there's no next indicator, loops back to the first

    // Updates classes to show the next slide and its indicator
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
    clearInterval(autoplayInterval); // Clears the autoplay interval when the user goes to previous slide

    // Gets the active and previous slides and their indicators
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
    clearInterval(autoplayInterval); // Clears the autoplay interval when the user goes to next slide

    // Gets the active next slides and their indicators
    const activeSlide = document.querySelector('.slide.active');
    const nextSlide = activeSlide.nextElementSibling || document.querySelector('.slide:first-child'); // If there's no next slide, loops back to the first
    const activeSlideIndicator = document.querySelector('.slide-indicator.checked');
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || document.querySelector('.slide-indicator:first-child'); // If there's no next indicator, loops back to the first

    // Updates classes to show the next slide and its indicator
    activeSlide.classList.remove('active');
    activeSlideIndicator.classList.remove('checked');
    nextSlide.classList.add('active');
    nextSlideIndicator.classList.add('checked');

    // Changes aria-current attribute to the next slide item
    activeSlideIndicator.removeAttribute('aria-current');
    nextSlideIndicator.setAttribute('aria-current', 'step');

    startAutoplay(); // Restarts the autoplay after sliding manually
}

function slideThroughIndicators(event) {
    // Gets the target indicator and it's index
    const indicator = event.currentTarget;
    const index = Array.from(indicator.parentElement.children).indexOf(indicator);

    clearInterval(autoplayInterval); // Clears the autoplay interval when the user clicks an indicator

    if (!indicator.classList.contains('checked')) {
        document.querySelector('.slide-indicator.checked').classList.remove('checked'); // Unchecks the currently checked indicator
        indicator.classList.add('checked'); // Checks the clicked indicator
        document.querySelector('.slide.active').classList.remove('active'); // Deactivates the currently active slide
        document.querySelectorAll('.slide')[index].classList.add('active'); // Activates the slide corresponding to the clicked indicator
    }

    startAutoplay(); // Restarts the autoplay after sliding manually
}

// Function to start the autoplay slideshow
function startAutoplay() {
    // Sets up an interval to switch slides automatically
    autoplayInterval = setInterval(() => {
        switchSlide();
    }, 5000); // Switches slides every 5 seconds
}

// Function to start the slideshow
function startSlideshow() {
    startAutoplay(); // Starts autoplay

    // Binds manual sliding functions to slider buttons
    document.querySelector('.slider-button.prev').addEventListener('click', prevSlide);
    document.querySelector('.slider-button.next').addEventListener('click', nextSlide);

    const slideIndicators = document.querySelectorAll('.slide-indicator');

    // Binds manual sliding functions to slider indicators
    slideIndicators.forEach(function (indicator, index) {
        indicator.addEventListener('click', slideThroughIndicators);
    })
}

// Starts the slideshow when the page loads
window.addEventListener('load', startSlideshow);


// CONTROLS //

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