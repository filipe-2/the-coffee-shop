// ------------------- Imports --------------------
import {
    // Functions
    updateCurrentClass,

    // Variables
    mainNavList,
} from './utils.js';
// ------------------------------------------------


// - Function: set scroll btn visible & position --
function handleScrollButtons() {
    const scrollButtons = document.querySelectorAll('.controls__scroll-btn'); // Selects the scroll buttons
    const isOnBottom = (window.innerHeight + window.scrollY + 50) >= document.documentElement.offsetHeight; // Stores true or false depending on whether the user is at the bottom or not

    [...scrollButtons].forEach(button => {
        const action = button.getAttribute('data-action');
        const isTop = action === 'top'; // Stores true or false depending on whether the button is for scrolling to the top or not

        button.classList.toggle('active', (isTop && window.scrollY > 0) || (!isTop && !isOnBottom)); // Toggles the 'active' class of the button based on the scroll position by checking if it's a top button and the page is scrolled down, or if it's a bottom button and not at the bottom

        // Sets the margin-bottom property of the button based on the scroll position; if it's at the top or bottom, and it's a top button, it adds a negative margin to hide it
        button.style.marginBottom = (window.scrollY <= 0 || isOnBottom) && isTop ? '-3.5rem' : '0';
    });
}
// ------------------------------------------------


// ------- Function: go back to top of page -------
function goToTop() {
    const homeAnchor = mainNavList.querySelector('a[href="#hero"]');

    // Scrolls to the top with a smooth effect
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Updates the current class of list items and anchors
    updateCurrentClass(homeAnchor);
}
// ------------------------------------------------


// ----- Function: go back to bottom of page ------
function goToBottom() {
    const lastAnchor = mainNavList.querySelector('a[href="#plans-section"]');

    // Scrolls to the bottom with a smooth effect
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

    // Updates the current class of list items and anchors
    updateCurrentClass(lastAnchor);
}
// ------------------------------------------------


// ------------------- Exports --------------------
export {
    // Functions
    handleScrollButtons,
    goToTop,
    goToBottom,

    // Variables
};
// ------------------------------------------------