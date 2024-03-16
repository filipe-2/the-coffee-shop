export const mediaQuery = window.matchMedia('(max-width: 50rem)');
export const hamburger = document.querySelector('.main-nav__hamburger-menu'); // Selects the hamburger menu
const hamburgerIcon = hamburger.querySelector('i'); // Selects the hamburger menu icon
const mainNavWrapper = document.querySelector('.main-nav__wrapper'); // Selects the navbar wrapper
export const mainNavList = mainNavWrapper.querySelector('.main-nav__list'); // Selects the nav list of anchors
const branding = mainNavWrapper.querySelector('.main-nav__branding'); // Selects the nav branding
const mainNavBtns = mainNavWrapper.querySelector('.main-nav__btns'); // Selects the navbar form buttons
const navbar = document.querySelector('.main-nav').parentElement; // Selects the header of the page
export const expandNavbarBtn = document.querySelector('#js-expand-navbar'); // Selects the expand navbar button
export const lockNavbarBtn = document.querySelector('#js-lock-navbar'); // Selects the lock navbar button
const main = document.querySelector('main'); // Selects the 'main' element
const controls = document.querySelector('.controls'); // Selects the 'controls' section
const footer = document.querySelector('footer'); // Selects the footer

let autoplayInterval; // Variable for the sliding interval
let lastScrollTop = 0; // Stores the last vertical scrolling position; zero by default


// Function to handle the media query change event
export function handleMediaQueryChange(mediaQuery) {
    // Creates a list item
    const btnListItem = document.createElement('li');

    if (mediaQuery.matches) {
        // If the screen size is less than 50rem, append mainNavBtns inside an <li> to mainNavList
        btnListItem.classList.add('main-nav__list-item');
        btnListItem.appendChild(mainNavBtns);
        mainNavList.appendChild(btnListItem);
        mainNavList.setAttribute('inert', '');
        mainNavList.style.transition = 'none';

    } else {
        // If the screen size is greater than or equal to 50rem, move mainNavBtns back to its original position
        mainNavWrapper.appendChild(mainNavBtns);
        mainNavList.removeChild(mainNavList.lastChild);
        mainNavList.removeAttribute('inert');
    }
}


// Function to change slide classes
function updateSlideClasses(activeSlide, activeSlideIndicator, newSlide, newSlideIndicator) {
    // Updates slide classes
    activeSlide.classList.remove('active');
    newSlide.classList.add('active');

    // Updates slide indicator classes
    activeSlideIndicator.classList.remove('checked');
    newSlideIndicator.classList.add('checked');

    // Changes aria-current attribute
    activeSlideIndicator.removeAttribute('aria-current');
    newSlideIndicator.setAttribute('aria-current', 'step');
}


// Function to switch slides
function switchSlide() {
    // Gets the active and next slides and their indicators
    const activeSlide = document.querySelector('.hero__slide.active');
    const activeSlideIndicator = document.querySelector('.hero__slide-indicator.checked');
    const nextSlide = activeSlide.nextElementSibling || document.querySelector('.hero__slide:first-child'); // If there's no next slide, loops back to the first
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || document.querySelector('.hero__slide-indicator:first-child'); // If there's no next indicator, loops back to the first

    updateSlideClasses(activeSlide, activeSlideIndicator, nextSlide, nextSlideIndicator); // Updates classes to show the next slide and its indicator; changes aria-current attribute to the next slide item
}


// Function to go to the previous slide
function prevSlide() {
    clearInterval(autoplayInterval); // Clears the autoplay interval when the user goes to previous slide

    // Gets the active and previous slides and their indicators
    const activeSlide = document.querySelector('.hero__slide.active');
    const activeSlideIndicator = document.querySelector('.hero__slide-indicator.checked');
    const prevSlide = activeSlide.previousElementSibling || document.querySelector('.hero__slide:last-child'); // If there's no previous slide, loops back to the last
    const prevSlideIndicator = activeSlideIndicator.previousElementSibling || document.querySelector('.hero__slide-indicator:last-child'); // If there's no previous indicator, loops back to the last

    updateSlideClasses(activeSlide, activeSlideIndicator, prevSlide, prevSlideIndicator); // Updates classes to show the previous slide and its indicator; changes aria-current attribute to the previous slide item

    startAutoplay(); // Restarts the autoplay after sliding manually
}


// Function to go to the next slide
function nextSlide() {
    clearInterval(autoplayInterval); // Clears the autoplay interval when the user goes to next slide

    // Gets the active next slides and their indicators
    const activeSlide = document.querySelector('.hero__slide.active');
    const activeSlideIndicator = document.querySelector('.hero__slide-indicator.checked');
    const nextSlide = activeSlide.nextElementSibling || document.querySelector('.hero__slide:first-child'); // If there's no next slide, loops back to the first
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || document.querySelector('.hero__slide-indicator:first-child'); // If there's no next indicator, loops back to the first

    updateSlideClasses(activeSlide, activeSlideIndicator, nextSlide, nextSlideIndicator); // Updates classes to show the next slide and its indicator; changes aria-current attribute to the next slide item

    startAutoplay(); // Restarts the autoplay after sliding manually
}


// Function to slide using indicators
function slideThroughIndicators(event) {
    // Gets the target indicator and it's index
    const indicator = event.currentTarget;
    const index = Array.from(indicator.parentElement.children).indexOf(indicator); // Converts the HTML collection into an array and stores the index of the target indicator

    clearInterval(autoplayInterval); // Clears the autoplay interval when the user clicks an indicator

    if (!indicator.classList.contains('checked')) {
        document.querySelector('.hero__slide-indicator.checked').classList.remove('checked'); // Unchecks the currently checked indicator
        indicator.classList.add('checked'); // Checks the clicked indicator
        document.querySelector('.hero__slide.active').classList.remove('active'); // Deactivates the currently active slide
        document.querySelectorAll('.hero__slide')[index].classList.add('active'); // Activates the slide corresponding to the clicked indicator
    }

    startAutoplay(); // Restarts the autoplay after sliding manually
}


// Function to start the autoplay slideshow; sets up an interval to switch slides automatically; switches slides every 5 seconds
const startAutoplay = () => autoplayInterval = setInterval(() => switchSlide(), 5000);


// Function to start the slideshow
export function startSlideshow() {
    startAutoplay(); // Starts autoplay

    // Binds manual sliding functions to slider buttons
    document.querySelector('.hero .action-button.prev').addEventListener('click', prevSlide);
    document.querySelector('.hero .action-button.next').addEventListener('click', nextSlide);

    const slideIndicators = document.querySelectorAll('.hero__slide-indicator');

    // Binds manual sliding functions to slider indicators
    slideIndicators.forEach(indicator => indicator.addEventListener('click', slideThroughIndicators));
}


// Function to toggle navbar visibility when clicking
export function toggleNavbarOnClick() {

    // Checks if the current state of the navbar is locked
    if (!lockNavbarBtn.classList.contains('locked')) {
        // Toggles the visibility of the navbar based on the 'expanded' class
        if (navbar.classList.contains('expanded')) {
            navbar.style.transform = 'translateY(-5.5rem)';
            navbar.style.boxShadow = 'none';
            navbar.classList.remove('expanded');
            expandNavbarBtn.classList.remove('collapse');
            expandNavbarBtn.classList.add('expand');
        } else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 0 50px 30px var(--bg-dark-2)';
            navbar.classList.add('expanded');
            expandNavbarBtn.classList.remove('expand');
            expandNavbarBtn.classList.add('collapse');
        }
    }
}


// Function to toggle navbar visibility when scrolling
export function toggleNavbarOnScroll() {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    // Checks if the current state of the navbar is locked
    if (!lockNavbarBtn.classList.contains('locked')) {
        // Toggles the visibility of the navbar based on the scrolling position
        if (hamburger.classList.contains('closed') && currentScrollTop > lastScrollTop && currentScrollTop > 0) {
            navbar.style.transform = 'translateY(-5.5rem)';
            navbar.style.boxShadow = 'none';
            navbar.classList.remove('expanded');
            expandNavbarBtn.classList.remove('collapse');
            expandNavbarBtn.classList.add('expand');
        } else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.boxShadow = '0 0 50px 30px var(--bg-dark-2)';
            navbar.classList.add('expanded');
            expandNavbarBtn.classList.remove('expand');
            expandNavbarBtn.classList.add('collapse');
        }
    }

    lastScrollTop = currentScrollTop; // Sets the last scrolling position to the current one
}


// Function to lock/unlock the current state of the navbar
export function lockNavbar() {
    const lockNavbarBtnIcon = lockNavbarBtn.firstElementChild;

    // Toggles the 'locked' class of the lock navbar button and changes its icon accordingly
    if (!lockNavbarBtn.classList.contains('locked')) {
        lockNavbarBtn.classList.add('locked');
        lockNavbarBtnIcon.classList.remove('fa-unlock');
        lockNavbarBtnIcon.classList.add('fa-lock');
    } else {
        lockNavbarBtn.classList.remove('locked');
        lockNavbarBtnIcon.classList.remove('fa-lock');
        lockNavbarBtnIcon.classList.add('fa-unlock');
    }
}


// Function to update the current class of the main navigation items and anchors
function updateCurrentClass(anchor) {
    const currentListItem = mainNavList.querySelector('.current');
    const currentAnchor = currentListItem.querySelector('.current');

    currentListItem.classList.remove('current');
    currentAnchor.classList.remove('current');
    anchor.classList.add('current');
    anchor.parentElement.classList.add('current');
}


// Function to scroll to a specific section
export function updateCurrentSection(event) {
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
    if (mediaQuery.matches) toggleHamburgerMenu();
}


// Function to update the current section when scrolling manually
export function updateCurrentSectionOnScroll() {
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


// Function to handle clicks on hamburger menu
export function toggleHamburgerMenu() {
    // Toggles the 'open' and 'closed' classes of the hamburger
    hamburger.classList.toggle('open');
    hamburger.classList.toggle('closed');

    // Removes style attribute to transition from open to close state and vice-versa
    mainNavList.removeAttribute('style');

    // Locks the scrollbar of the body when the menu is open
    if (hamburger.classList.contains('open') && mediaQuery.matches) {
        document.body.style.overflowY = "hidden";
        mainNavList.removeAttribute('inert');
        branding.setAttribute('inert', '');
        main.setAttribute('inert', '');
        controls.setAttribute('inert', '');
        footer.setAttribute('inert', '');
    } else {
        document.body.style.overflowY = "visible";
        mainNavList.setAttribute('inert', '');
        branding.removeAttribute('inert',);
        main.removeAttribute('inert');
        controls.removeAttribute('inert');
        footer.removeAttribute('inert');
    }

    // Toggles the hamburger icons
    hamburgerIcon.classList.toggle('fa-bars-staggered');
    hamburgerIcon.classList.toggle('fa-bars');

    // Toggles the visibility of the nav list and nav buttons
    mainNavList.classList.toggle('visible');
    mainNavBtns.classList.toggle('visible');
}


// Hides the hamburger menu when the viewport width doesn't match the 50rem media query
export const hideMenuOnResize = () => (!mediaQuery.matches && hamburger.classList.contains('open')) && toggleHamburgerMenu();


// Function to handle scroll button visibility and position
export function handleScrollButtons() {
    const scrollButtons = document.querySelectorAll('.controls__scroll-btn'); // Selects the scroll buttons
    const isOnBottom = (window.innerHeight + window.scrollY + 50) >= document.documentElement.offsetHeight; // Stores true or false depending on whether the user is at the bottom or not

    [...scrollButtons].forEach(function (button) {
        const action = button.getAttribute('data-action');
        const isTop = action === 'top'; // Stores true or false depending on whether the button is for scrolling to the top or not

        button.classList.toggle('active', (isTop && window.scrollY > 0) || (!isTop && !isOnBottom)); // Toggles the 'active' class of the button based on the scroll position by checking if it's a top button and the page is scrolled down, or if it's a bottom button and not at the bottom

        // Sets the margin-bottom property of the button based on the scroll position; if it's at the top or bottom, and it's a top button, it adds a negative margin to hide it
        button.style.marginBottom = (window.scrollY <= 0 || isOnBottom) && isTop ? '-3.5rem' : '0';
    });
}


// Function to go back to the top of the page
export function goToTop() {
    // Scrolls to the top with a smooth effect
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const homeAnchor = mainNavList.querySelector('a[href="#home"]');

    // Updates the current class of list items and anchors
    updateCurrentClass(homeAnchor);
}

// Function to go back to the bottom of the page
export function goToBottom() {
    // Scrolls to the bottom with a smooth effect
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    const lastAnchor = mainNavList.querySelector('a[href="#plans-section"]');

    // Updates the current class of list items and anchors
    updateCurrentClass(lastAnchor);
}