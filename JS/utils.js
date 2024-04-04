const hamburger = document.querySelector('.main-nav__hamburger-menu'); // Selects the hamburger menu
const mainNavWrapper = document.querySelector('.main-nav__wrapper'); // Selects the navbar wrapper
const mainNavList = mainNavWrapper.querySelector('.main-nav__list'); // Selects the nav list of anchors
const expandNavbarBtn = document.querySelector('#js-expand-navbar'); // Selects the expand navbar button
const lockNavbarBtn = document.querySelector('#js-lock-navbar'); // Selects the lock navbar button


// ------- Function: update 'current' class -------
function updateCurrentClass(anchor) {
    const currentListItem = mainNavList.querySelector('.current');
    const currentAnchor = currentListItem.querySelector('.current');

    currentListItem.classList.remove('current');
    currentAnchor.classList.remove('current');
    anchor.classList.add('current');
    anchor.parentElement.parentElement.classList.add('current');
}
// ------------------------------------------------


// ------------------- Exports --------------------
export {
    // Functions
    updateCurrentClass,

    // Variables
    hamburger,
    mainNavList,
    expandNavbarBtn,
    lockNavbarBtn,
};
// ------------------------------------------------