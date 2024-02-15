window.addEventListener('scroll', function () {
    let scroll = document.querySelectorAll('.scrollBtn');
    let isOnBottom = (window.innerHeight + window.scrollY + 50) >= document.documentElement.offsetHeight;
    let scrollTop = scroll[0];
    let scrollBottom = scroll[1];

    scrollTop.classList.toggle('active', window.scrollY > 0);
    scrollBottom.classList.toggle('active', !isOnBottom);

    // Positioning the scrolling buttons based on the position inside the page 
    if (this.window.scrollY <= 0 || isOnBottom) {
        scrollTop.style.marginBottom = '-50px';
    } else {
        scrollTop.style.marginBottom = '0'
    }
})

// Function to go back to the top of the page
function goToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

// Function to go back to the bottom of the page
function goToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
    })
}