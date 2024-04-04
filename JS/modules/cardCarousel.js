const menuContent = document.querySelector('.menu__content'); // Selects the menu content
const menuCarousels = document.querySelectorAll('.menu__card-list'); // Selects the menu carousels
const menuCarouselBtns = document.querySelectorAll('.menu__slider-btn'); // Selects the control buttons of each menu carousel
const cardWidth = document.querySelector('.menu__card').offsetWidth; // Stores the offset width of menu carousel cards
const gapWidth = parseFloat(getComputedStyle(menuContent).getPropertyValue('--gap')); // Stores the offset gap of each menu carousel card
const totalCardWidth = cardWidth + gapWidth; // Stores the offset plus the gap offset of each menu carousel card

let isDragging = false, // Stores whether the menu is being dragged
    startX, // Stores initial mouse position for menu carousel
    initialScrollLeft; // Stores initial scrollLeft value for menu carousel


// --- Function: handle mousedown event on menu ---
function handleMouseDown(event, carousel) {
    isDragging = true; // Sets isDragging to true to indicate that menu dragging has started
    carousel.classList.add('dragging'); // Adds 'dragging' class to the menu carousel

    // Stores the initial mouse position and scrollLeft value
    startX = event.pageX;
    initialScrollLeft = carousel.scrollLeft;
}
// ------------------------------------------------


// --- Function: handle mousemove event on menu ---
function handleMouseMove(event, carousel) {
    if (!isDragging) return; // If menu dragging is not in progress, exit the function

    // Calculates the new scrollLeft value based on mouse movement and sets it to the carousel
    carousel.scrollLeft = initialScrollLeft - (event.pageX - startX);
}
// ------------------------------------------------


// ---- Function: handle mouseup event on menu ----
function handleMouseUp(carousel) {
    isDragging = false; // Resets the isDragging flag to indicate that menu dragging has ended
    carousel.classList.remove('dragging'); // Removes the 'dragging' class from the menu carousel
}
// ------------------------------------------------


// ---- Function: move carousel cards on click ----
function moveCarouselCards(btn) {
    const carousel = btn.parentElement.parentElement.querySelector('.menu__card-list'); // Selects the parent carousel of the button
    const numCards = parseInt(getComputedStyle(carousel).getPropertyValue('--num-cards'));

    const directionMultiplier = btn.classList.contains('prev') ? -1 : 1;
    const offsetMultiplier = btn.classList.contains('sliding-multiplier') ? numCards : 1;

    carousel.scrollLeft += directionMultiplier * offsetMultiplier * totalCardWidth;


    // Checks for the scroll position and classes of buttons, updating the carousel accordingly
    if (carousel.scrollLeft === 0 && btn.classList.contains('prev')) {
        carousel.scrollLeft = carousel.scrollWidth - carousel.totalCardWidth;
    } else if (carousel.scrollLeft === carousel.scrollWidth - carousel.totalCardWidth && btn.classList.contains('next')) {
        carousel.scrollLeft = 0;
    }
}
// ------------------------------------------------


// ------------------- Exports --------------------
export {
    // Functions
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    moveCarouselCards,

    // Variables
    menuCarousels,
    menuCarouselBtns,
};
// ------------------------------------------------