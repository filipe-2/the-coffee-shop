import {
    startSlideshow,
    goToTop,
    goToBottom,
} from './utils.js';


// HEADER //

let lastScrollTop = 0; // Stores the last vertical scrolling position; zero by default

const navbar = document.querySelector('.main-nav').parentElement; // Selects the header of the page

window.addEventListener('scroll', function () {
    let currentScrollTop = window.scrollY || document.documentElement.scrollTop; // Stores the current scrolling position

    // Toggles the visibility of the navbar based on the scrolling position
    if (hamburger.classList.contains('closed') && currentScrollTop > lastScrollTop && currentScrollTop >= 100) {
        navbar.style.transform = 'translateY(-6.25rem)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScrollTop; // Sets the last scrolling position to the current one
});

// Selects hamburger menu and it's icon
const hamburger = document.querySelector('.hamburger-menu');
const hamburgerIcon = document.querySelector('.hamburger-menu i');
const mainNavList = document.querySelector('.main-nav-list');

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
});


// SHOWCASE //

window.addEventListener('load', startSlideshow); // Starts the slideshow when the page loads


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
        scrollTop.style.marginBottom = '-3.5rem';
    } else {
        scrollTop.style.marginBottom = '0';
    }
})

// Add event listeners to the buttons
document.querySelector('.scrollBtn[data-action="top"]').addEventListener('click', goToTop);
document.querySelector('.scrollBtn[data-action="bottom"]').addEventListener('click', goToBottom);