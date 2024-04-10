// ------------------- Imports --------------------
// Slides Carousels module
import {
    // Functions
    startSlideshow,

    // Variables
    heroCarousel,
    specialCarousel,
} from './modules/slidesCarousel.js';


// Controls module
import {
    // Functions
    handleScrollButtons,
    goToTop,
    goToBottom,

    // Variables
} from './modules/controls.js'


// Card Carousel module
import {
    // Functions
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    moveCarouselCards,
    loopCarousel,

    // Variables
    menuCarousels,
    menuCarouselBtns,
    totalCardWidth,
} from './modules/cardCarousel.js'


// Navbar module
import {
    // Functions
    handleMediaQueryChange,
    hideMenuOnResize,
    toggleNavbarOnClick,
    toggleNavbarOnScroll,
    lockNavbar,
    toggleHamburgerMenu,
    closeHamburgerClickOutside,
    closeHamburgerPressEsc,
    updateCurrentSection,
    updateCurrentSectionOnScroll,
    expandNavbarBtn,
    lockNavbarBtn,

    // Variables
    mediaQuery,
    hamburger,
} from './modules/navbar.js';
// ------------------------------------------------


handleMediaQueryChange(mediaQuery); // Fires the handleMediaQueryChange function from the start

// ---------------- Scroll Events -----------------
window.addEventListener('scroll', toggleNavbarOnScroll); // Toggles the navbar visibility when scrolling
window.addEventListener('scroll', updateCurrentSectionOnScroll); // Updates the current section when scrolling manually
window.addEventListener('scroll', handleScrollButtons) // Handles position and visibility of scroll buttons
// ------------------------------------------------

// ----------------- Click Events -----------------
hamburger.addEventListener('click', toggleHamburgerMenu); // Toggles the hamburger state on click
document.body.addEventListener('click', closeHamburgerClickOutside); // Closes the menu when clicking outside
expandNavbarBtn.addEventListener('click', toggleNavbarOnClick); // 
lockNavbarBtn.addEventListener('click', lockNavbar); // Locks the navbar current state on click
document.querySelectorAll('.main-nav__list-item button').forEach(listItem => listItem.addEventListener('click', updateCurrentSection)); // Updates the current section when navigating through nav or buttons
document.querySelector('.controls__scroll-btn[data-action="top"]').addEventListener('click', goToTop); // Goes to the top of the page on click
document.querySelector('.controls__scroll-btn[data-action="bottom"]').addEventListener('click', goToBottom); // Goes to the bottom of the page on click
// ------------------------------------------------

// ---------------- Other Events ------------------
window.addEventListener('resize', hideMenuOnResize); // Fires the hideMenuOnResize function
document.body.addEventListener('keydown', closeHamburgerPressEsc); // Closes the menu when pressing ESCAPE
mediaQuery.addEventListener('change', handleMediaQueryChange); // Listens for changes in screen size
startSlideshow(heroCarousel); // Starts the slideshow when the page loads
startSlideshow(specialCarousel); // Starts the slideshow when the page loads

menuCarousels.forEach(carousel => { // Adds event listeners for mouse events on each menu carousel
    carousel.addEventListener('mousedown', (event) => handleMouseDown(event, carousel));
    carousel.addEventListener('mousemove', event => handleMouseMove(event, carousel));
    carousel.addEventListener('mouseup', () => handleMouseUp(carousel));
    carousel.addEventListener('mouseleave', () => handleMouseUp(carousel));
})

window.onload = () => menuCarousels.forEach(carousel => carousel.scrollTo({ left: 3 * totalCardWidth, top: 0, behavior: 'instant', }));

menuCarouselBtns.forEach(btn => {
    // Listens for clicks on each button to change carousel cards
    btn.addEventListener('click', () => moveCarouselCards(btn));
    btn.addEventListener('click', () => loopCarousel(btn));
})
// ------------------------------------------------