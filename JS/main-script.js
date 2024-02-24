import {
    startSlideshow,
    goToTop,
    goToBottom,
    toggleNavbarVisibility,
    toggleHamburgerMenu,
    hamburger,
    handleScrollButtons,
} from './utils.js';

window.addEventListener('scroll', toggleNavbarVisibility); // Toggles the navbar visibility when scrolling
hamburger.addEventListener('click', toggleHamburgerMenu); // Toggles the hamburger state when clicking

window.addEventListener('load', startSlideshow); // Starts the slideshow when the page loads

window.addEventListener('scroll', handleScrollButtons) // Handles scroll button position and visibility

// Adds click events to scroll buttons
document.querySelector('.scrollBtn[data-action="top"]').addEventListener('click', goToTop);
document.querySelector('.scrollBtn[data-action="bottom"]').addEventListener('click', goToBottom);