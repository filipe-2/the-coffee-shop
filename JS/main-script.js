import {
    // Functions
    startSlideshow,
    goToTop,
    goToBottom,
    toggleNavbarVisibility,
    toggleHamburgerMenu,
    handleScrollButtons,
    openModal,
    closeModal,

    // Variables
    hamburger,
} from './utils.js';

const expandSlideBtns = document.querySelectorAll('.showcase .expand-slide-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');

window.addEventListener('scroll', toggleNavbarVisibility); // Toggles the navbar visibility when scrolling
hamburger.addEventListener('click', toggleHamburgerMenu); // Toggles the hamburger state when clicking

window.addEventListener('load', startSlideshow); // Starts the slideshow when the page loads

window.addEventListener('scroll', handleScrollButtons) // Handles position and visibility of scroll buttons
document.querySelector('.scroll-btn[data-action="top"]').addEventListener('click', goToTop); // Goes to the top of the page when clicking
document.querySelector('.scroll-btn[data-action="bottom"]').addEventListener('click', goToBottom); // Goes to the bottom of the page when clicking

[...expandSlideBtns].forEach(function (btn) {
    btn.addEventListener('click', openModal);
});

closeModalBtn.addEventListener('click', closeModal)