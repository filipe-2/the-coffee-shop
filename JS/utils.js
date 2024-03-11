let autoplayInterval; // Variable for the sliding interval

export const mediaQuery = window.matchMedia('(max-width: 50rem)');
export const hamburger = document.querySelector('.main-nav__hamburger-menu');
const hamburgerIcon = document.querySelector('.main-nav__hamburger-menu i');
const mainNavWrapper = document.querySelector('.main-nav__wrapper');
const mainNavList = mainNavWrapper.querySelector('.main-nav__list');
const mainNavBtns = mainNavWrapper.querySelector('.main-nav__btns');
const navbar = document.querySelector('.main-nav').parentElement; // Selects the header of the page
export const modal = document.getElementById('drinkModal'); // Selects the modal

let lastScrollTop = 0; // Stores the last vertical scrolling position; zero by default


// Function to handle the media query change event
export function handleMediaQueryChange(mediaQuery) {
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
    const activeSlide = document.querySelector('.slide.active');
    const activeSlideIndicator = document.querySelector('.slide-indicator.checked');
    const nextSlide = activeSlide.nextElementSibling || document.querySelector('.slide:first-child'); // If there's no next slide, loops back to the first
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || document.querySelector('.slide-indicator:first-child'); // If there's no next indicator, loops back to the first

    updateSlideClasses(activeSlide, activeSlideIndicator, nextSlide, nextSlideIndicator); // Updates classes to show the next slide and its indicator; changes aria-current attribute to the next slide item
}


// Function to go to the previous slide
function prevSlide() {
    clearInterval(autoplayInterval); // Clears the autoplay interval when the user goes to previous slide

    // Gets the active and previous slides and their indicators
    const activeSlide = document.querySelector('.slide.active');
    const activeSlideIndicator = document.querySelector('.slide-indicator.checked');
    const prevSlide = activeSlide.previousElementSibling || document.querySelector('.slide:last-child'); // If there's no previous slide, loops back to the last
    const prevSlideIndicator = activeSlideIndicator.previousElementSibling || document.querySelector('.slide-indicator:last-child'); // If there's no previous indicator, loops back to the last

    updateSlideClasses(activeSlide, activeSlideIndicator, prevSlide, prevSlideIndicator); // Updates classes to show the previous slide and its indicator; changes aria-current attribute to the previous slide item

    startAutoplay(); // Restarts the autoplay after sliding manually
}


// Function to go to the next slide
function nextSlide() {
    clearInterval(autoplayInterval); // Clears the autoplay interval when the user goes to next slide

    // Gets the active next slides and their indicators
    const activeSlide = document.querySelector('.hero .slide.active');
    const activeSlideIndicator = document.querySelector('.hero .slide-indicator.checked');
    const nextSlide = activeSlide.nextElementSibling || document.querySelector('.hero .slide:first-child'); // If there's no next slide, loops back to the first
    const nextSlideIndicator = activeSlideIndicator.nextElementSibling || document.querySelector('.hero .slide-indicator:first-child'); // If there's no next indicator, loops back to the first

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
        document.querySelector('.hero .slide-indicator.checked').classList.remove('checked'); // Unchecks the currently checked indicator
        indicator.classList.add('checked'); // Checks the clicked indicator
        document.querySelector('.hero .slide.active').classList.remove('active'); // Deactivates the currently active slide
        document.querySelectorAll('.hero .slide')[index].classList.add('active'); // Activates the slide corresponding to the clicked indicator
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

    const slideIndicators = document.querySelectorAll('.hero .slide-indicator');

    // Binds manual sliding functions to slider indicators
    slideIndicators.forEach(indicator => indicator.addEventListener('click', slideThroughIndicators));
}


// Function to toggle navbar visibility when scrolling
export function toggleNavbarVisibility() {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    // Toggles the visibility of the navbar based on the scrolling position
    if (hamburger.classList.contains('closed') && currentScrollTop > lastScrollTop && currentScrollTop >= 100) {
        navbar.style.transform = 'translateY(-6.25rem)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScrollTop; // Sets the last scrolling position to the current one
}


// Function to handle clicks on hamburger menu
export function toggleHamburgerMenu() {
    // Toggles the 'open' and 'closed' classes of the hamburger
    hamburger.classList.toggle('open');
    hamburger.classList.toggle('closed');

    mainNavList.removeAttribute('style');

    // Locks the scrollbar of the body when the menu is open
    if (hamburger.classList.contains('open') && mediaQuery.matches) {
        document.body.style.overflowY = "hidden";
        mainNavList.removeAttribute('inert');
    } else {
        document.body.style.overflowY = "visible";
        mainNavList.setAttribute('inert', '');
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
    const scrollButtons = document.querySelectorAll('.scroll-btn'); // Selects the scroll buttons
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
export const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth', });


// Function to go back to the bottom of the page
export const goToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });


// Function to open the modal
export function openModal() {
    modal.style.display = "block";
    document.body.style.overflowY = "hidden";
}


// Function to close the modal
export function closeModal() {
    modal.style.display = "none";
    document.body.style.overflowY = "visible";
}