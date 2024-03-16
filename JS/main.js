// Imports
import {
    // Functions
    handleMediaQueryChange,
    startSlideshow,
    goToTop,
    goToBottom,
    toggleHamburgerMenu,
    handleScrollButtons,
    hideMenuOnResize,
    updateCurrentSection,
    updateCurrentSectionOnScroll,
    toggleNavbarOnClick,
    toggleNavbarOnScroll,

    // Variables
    hamburger,
    mediaQuery,
    expandNavbarBtn,
} from './utils.js';

handleMediaQueryChange(mediaQuery); // Fires the handleMediaQueryChange function from the start

// Scroll events
window.addEventListener('scroll', toggleNavbarOnScroll); // Toggles the navbar visibility when scrolling
window.addEventListener('scroll', updateCurrentSectionOnScroll); // Updates the current section when scrolling manually
window.addEventListener('scroll', handleScrollButtons) // Handles position and visibility of scroll buttons

// Click events
hamburger.addEventListener('click', toggleHamburgerMenu); // Toggles the hamburger state when clicking
expandNavbarBtn.addEventListener('click', toggleNavbarOnClick); // 
document.querySelectorAll('.main-nav__list-item').forEach(listItem => listItem.addEventListener('click', updateCurrentSection)); // Updates the current section when navigating through nav or buttons
document.querySelector('.controls__scroll-btn[data-action="top"]').addEventListener('click', goToTop); // Goes to the top of the page when clicking
document.querySelector('.controls__scroll-btn[data-action="bottom"]').addEventListener('click', goToBottom); // Goes to the bottom of the page when clicking

// Other events
window.addEventListener('resize', hideMenuOnResize); // Fires the hideMenuOnResize function
mediaQuery.addEventListener('change', handleMediaQueryChange); // Listens for changes in screen size
window.addEventListener('load', startSlideshow); // Starts the slideshow when the page loads