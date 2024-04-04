// ------------------- Imports --------------------
import {
    // Functions
    updateCurrentClass,

    // Variables
    mainNavList,
} from './utils.js';
// ------------------------------------------------

const mediaQuery = window.matchMedia('(max-width: 50rem)');
const hamburger = document.querySelector('.main-nav__hamburger-menu'); // Selects the hamburger menu
const hamburgerIcon = hamburger.querySelector('i'); // Selects the hamburger menu icon
const mainNavWrapper = document.querySelector('.main-nav__wrapper'); // Selects the navbar wrapper
const branding = mainNavWrapper.querySelector('.main-nav__branding'); // Selects the nav branding
const mainNavBtns = mainNavWrapper.querySelector('.main-nav__btns'); // Selects the navbar form buttons
const navbar = document.querySelector('.main-nav').parentElement; // Selects the header of the page
const expandNavbarBtn = document.querySelector('#js-expand-navbar'); // Selects the expand navbar button
const lockNavbarBtn = document.querySelector('#js-lock-navbar'); // Selects the lock navbar button
const main = document.querySelector('main'); // Selects the 'main' element
const controls = document.querySelector('.controls'); // Selects the 'controls' section
const footer = document.querySelector('footer'); // Selects the footer

let lastScrollTop = 0 // Stores the last vertical scrolling position; zero by default


// ----- Function: handle media query change ------
function handleMediaQueryChange(mediaQuery) {
    // Creates a list item
    const btnListItem = document.createElement('li');

    if (mediaQuery.matches) {
        // If the viewport width is less than 50rem, append mainNavBtns inside an <li> to mainNavList
        btnListItem.classList.add('main-nav__list-item');
        btnListItem.appendChild(mainNavBtns);
        mainNavList.appendChild(btnListItem);
        mainNavList.setAttribute('inert', '');
        mainNavList.classList.add('transition-off');
    } else {
        // If the viewport width is greater than or equal to 50rem, move mainNavBtns back to its original position
        mainNavWrapper.appendChild(mainNavBtns);
        mainNavList.removeChild(mainNavList.lastChild);
        mainNavList.removeAttribute('inert');
    }
}
// ------------------------------------------------


// ----- Function: toggle nav visible on click ----
function toggleNavbarOnClick() {
    // Checks if the current state of the navbar is locked
    if (!lockNavbarBtn.classList.contains('locked')) {
        // Toggles the visibility of the navbar based on the 'expanded' class
        if (navbar.classList.contains('expanded')) {
            navbar.classList.remove('expanded');
            navbar.classList.add('collapsed');
            expandNavbarBtn.classList.remove('collapse');
            expandNavbarBtn.classList.add('expand');
        } else {
            navbar.classList.add('expanded');
            navbar.classList.remove('collapsed');
            expandNavbarBtn.classList.remove('expand');
            expandNavbarBtn.classList.add('collapse');
        }
    }
}
// ------------------------------------------------


// ---- Function: toggle nav visible on scroll ----
function toggleNavbarOnScroll() {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    // Checks if the current state of the navbar is locked
    if (!lockNavbarBtn.classList.contains('locked')) {
        // Toggles the visibility of the navbar based on the scrolling position
        if (hamburger.classList.contains('closed') && currentScrollTop > lastScrollTop && currentScrollTop > 0) {
            navbar.classList.remove('expanded');
            navbar.classList.add('collapsed');
            expandNavbarBtn.classList.remove('collapse');
            expandNavbarBtn.classList.add('expand');
        } else {
            navbar.classList.remove('collapsed');
            navbar.classList.add('expanded');
            expandNavbarBtn.classList.remove('expand');
            expandNavbarBtn.classList.add('collapse');
        }
    }

    lastScrollTop = currentScrollTop; // Sets the last scrolling position to the current one
}
// ------------------------------------------------


// ----- Function: (un)lock nav current state -----
function lockNavbar() {
    const lockNavbarBtnIcon = lockNavbarBtn.firstElementChild; // Gets the icon of the lock navbar button

    // Toggles the 'locked' class of the lock navbar button and changes its icon accordingly
    if (!lockNavbarBtn.classList.contains('locked')) {
        lockNavbarBtn.classList.add('locked');
        lockNavbarBtnIcon.classList.remove('fa-lock-open');
        lockNavbarBtnIcon.classList.add('fa-lock');
        expandNavbarBtn.classList.add('disabled');
        console.log('navbar is locked');

    } else {
        lockNavbarBtn.classList.remove('locked');
        lockNavbarBtnIcon.classList.remove('fa-lock');
        lockNavbarBtnIcon.classList.add('fa-lock-open');
        expandNavbarBtn.classList.remove('disabled');
        console.log('navbar is unlocked');
    }
}
// ------------------------------------------------


// --------- Function: scroll to section ----------
function updateCurrentSection(event) {
    // Gets the target anchor, target id, and target section
    const targetAnchor = this.querySelector('.main-nav__link');
    const targetId = targetAnchor.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Prevents the default behavior of the anchor elements
    event.preventDefault();

    // Scrolls to the clicked section
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // Updates the current class of list items and anchors
    updateCurrentClass(targetAnchor);

    // Closes the hamburger menu
    if (mediaQuery.matches) toggleHamburgerMenu(event);
}
// ------------------------------------------------


// ------ Function: update section on scroll ------
function updateCurrentSectionOnScroll() {
    // Gets all sections in the document except controls;
    const sections = [...document.querySelectorAll('section')];

    // Iterates over each section to find the one currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        // Checks if the section is in the viewport
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Gets the corresponding nav item and updates its class
            const navItem = document.querySelector(`.main-nav__list-item a[href="#${section.id}"]`);

            // Updates current class of the nav item
            if (navItem) updateCurrentClass(navItem);
        }
    });
}
// ------------------------------------------------


// -------- Function: toggle menu classes ---------
function toggleMenuClasses() {
    // Toggles the 'open' and 'closed' classes of the hamburger
    hamburger.classList.toggle('open');
    hamburger.classList.toggle('closed');

    // Toggles the hamburger icons
    hamburgerIcon.classList.toggle('fa-bars-staggered');
    hamburgerIcon.classList.toggle('fa-bars');

    // Toggles the visibility of the nav list and nav buttons
    mainNavList.classList.toggle('visible');
    mainNavBtns.classList.toggle('visible');
}
// ------------------------------------------------


// ------ Function: handle click on hamburger -----
function toggleHamburgerMenu(event) {
    event.stopPropagation(); // Prevents event propagation
    toggleMenuClasses(); // Toggles menu classes

    mainNavList.classList.remove('transition-off'); // Removes style attribute to transition from open to close state and vice-versa

    // Locks the scrollbar of the body when the menu is open
    if (hamburger.classList.contains('open') && mediaQuery.matches) {
        document.body.classList.add('scroll-locked');
        mainNavList.removeAttribute('inert');
        branding.setAttribute('inert', '');
        main.setAttribute('inert', '');
        controls.setAttribute('inert', '');
        footer.setAttribute('inert', '');
    } else {
        document.body.classList.remove('scroll-locked');
        mainNavList.setAttribute('inert', '');
        branding.removeAttribute('inert',);
        main.removeAttribute('inert');
        controls.removeAttribute('inert');
        footer.removeAttribute('inert');
    }
}
// ------------------------------------------------


// --- Function: close hamburger click outside ----
const closeHamburgerClickOutside = e => hamburger.classList.contains('open') && !mainNavList.contains(e.target) && toggleHamburgerMenu(e);
// ------------------------------------------------


// ----- Function: close hamburger press ESC ------
const closeHamburgerPressEsc = e => hamburger.classList.contains('open') && e.key === 'Escape' && toggleHamburgerMenu(e);
// ------------------------------------------------


// ---- Function: hide hamburger if vw > 50rem ----
const hideMenuOnResize = e => !mediaQuery.matches && hamburger.classList.contains('open') && toggleHamburgerMenu(e);
// ------------------------------------------------


// ------------------- Exports --------------------
export {
    // Functions
    handleMediaQueryChange,
    toggleNavbarOnClick,
    toggleNavbarOnScroll,
    lockNavbar,
    updateCurrentSection,
    updateCurrentSectionOnScroll,
    toggleHamburgerMenu,
    closeHamburgerClickOutside,
    closeHamburgerPressEsc,
    hideMenuOnResize,

    // Variables
    mediaQuery,
    hamburger,
    expandNavbarBtn,
    lockNavbarBtn,
}
// ------------------------------------------------