// Set the date we're counting down to
const countDownDate = new Date("December 31, 2024 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const timerElement = document.getElementById("timer");
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!timerElement || !daysElement || !hoursElement || !minutesElement || !secondsElement) {
        console.warn("Countdown timer elements not found in the DOM.");
        return;
    }

    if (distance < 0) {
        timerElement.innerHTML = "<div>🎉 The day has arrived! 🎉</div>";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
}

// Update countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

// Initial call to display immediately
updateCountdown();

// Carousel functionality
const track = document.querySelector('.carousel-track');
const slides = track ? Array.from(track.children) : [];
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

if (!track || slides.length === 0) {
    console.warn("Carousel track or slides not found.");
}

if (!nextButton || !prevButton) {
    console.warn("Carousel navigation buttons not found.");
}

let slideWidth = slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;

// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Move to target slide
const moveToSlide = (track, currentSlide, targetSlide) => {
    if (!track || !currentSlide || !targetSlide) return;
    const targetLeft = parseFloat(targetSlide.style.left) || 0;
    track.style.transform = 'translateX(-' + targetLeft + 'px)';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

// Event listeners for navigation buttons
if (prevButton) {
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide ? currentSlide.previousElementSibling : null;
        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
        }
        moveToSlide(track, currentSlide, prevSlide);
    });
}

if (nextButton) {
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide ? currentSlide.nextElementSibling : null;
        if (!nextSlide) {
            nextSlide = slides[0];
        }
        moveToSlide(track, currentSlide, nextSlide);
    });
}

// Handle window resize to recalculate slide width and reposition slides
window.addEventListener('resize', () => {
    if (slides.length === 0) return;
    slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach(setSlidePosition);
    const currentSlide = track.querySelector('.current-slide');
    if (currentSlide) {
        const currentLeft = parseFloat(currentSlide.style.left) || 0;
        track.style.transform = 'translateX(-' + currentLeft + 'px)';
    }
});
