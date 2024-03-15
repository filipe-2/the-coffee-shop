import {
    // Functions
    handleMediaQueryChange,
    startSlideshow,
    goToTop,
    goToBottom,
    toggleNavbarVisibility,
    toggleHamburgerMenu,
    handleScrollButtons,
    hideMenuOnResize,
    updateCurrentSection,

    // Variables
    hamburger,
    mediaQuery,
} from './utils.js';

handleMediaQueryChange(mediaQuery);

window.addEventListener('resize', hideMenuOnResize); // Fires the hideMenuOnResize function

mediaQuery.addEventListener('change', handleMediaQueryChange); // Adds an event listener to listen for changes in screen size

window.addEventListener('scroll', toggleNavbarVisibility); // Toggles the navbar visibility when scrolling
hamburger.addEventListener('click', toggleHamburgerMenu); // Toggles the hamburger state when clicking

document.querySelectorAll('.main-nav__list-item').forEach(listItem => listItem.addEventListener('click', updateCurrentSection)); // Fires the updateCurrentSection function when the user clicks a nav item

window.addEventListener('load', startSlideshow); // Starts the slideshow when the page loads

window.addEventListener('scroll', handleScrollButtons) // Handles position and visibility of scroll buttons
document.querySelector('.controls__scroll-btn[data-action="top"]').addEventListener('click', goToTop); // Goes to the top of the page when clicking
document.querySelector('.controls__scroll-btn[data-action="bottom"]').addEventListener('click', goToBottom); // Goes to the bottom of the page when clicking