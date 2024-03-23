// Imports
import {
    // Functions
    handleMediaQueryChange,
    startSlideshow,
    goToTop,
    goToBottom,
    handleScrollButtons,
    hideMenuOnResize,
    updateCurrentSection,
    updateCurrentSectionOnScroll,
    toggleNavbarOnClick,
    toggleNavbarOnScroll,
    lockNavbar,
    toggleHamburgerMenu,
    closeHamburgerClickOutside,
    closeHamburgerPressEsc,

    // Variables
    hamburger,
    mediaQuery,
    expandNavbarBtn,
    lockNavbarBtn,
} from './utils.js';

handleMediaQueryChange(mediaQuery); // Fires the handleMediaQueryChange function from the start

// Scroll events
window.addEventListener('scroll', toggleNavbarOnScroll); // Toggles the navbar visibility when scrolling
window.addEventListener('scroll', updateCurrentSectionOnScroll); // Updates the current section when scrolling manually
window.addEventListener('scroll', handleScrollButtons) // Handles position and visibility of scroll buttons

// Click events
hamburger.addEventListener('click', toggleHamburgerMenu); // Toggles the hamburger state on click
document.body.addEventListener('click', closeHamburgerClickOutside); // Closes the menu when clicking outside
expandNavbarBtn.addEventListener('click', toggleNavbarOnClick); // 
lockNavbarBtn.addEventListener('click', lockNavbar); // Locks the navbar current state on click
document.querySelectorAll('.main-nav__list-item').forEach(listItem => listItem.addEventListener('click', updateCurrentSection)); // Updates the current section when navigating through nav or buttons
document.querySelector('.controls__scroll-btn[data-action="top"]').addEventListener('click', goToTop); // Goes to the top of the page on click
document.querySelector('.controls__scroll-btn[data-action="bottom"]').addEventListener('click', goToBottom); // Goes to the bottom of the page on click

// Other events
window.addEventListener('resize', hideMenuOnResize); // Fires the hideMenuOnResize function
document.body.addEventListener('keydown', closeHamburgerPressEsc); // Closes the menu when pressing ESCAPE
mediaQuery.addEventListener('change', handleMediaQueryChange); // Listens for changes in screen size
window.addEventListener('load', startSlideshow); // Starts the slideshow when the page loads