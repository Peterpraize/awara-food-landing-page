function orderAwara(product, price) {

    const phoneNumber = "2347087057376";

    const message = `
Hello AWARA 👋

I would like to place an order.

🍽️ Product: ${product}
💰 Price: ${price}
📦 Quantity: 1

Please confirm availability and delivery/pickup details.

Thank you!
`;

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
}
/* =========================================================
   AWARA HERO CAROUSEL
========================================================= */

const slides = document.querySelectorAll(".hero-slide");

const dots = document.querySelectorAll(".carousel-dot");

let currentSlide = 0;

let carouselTimer;


/* Show slide */

function showSlide(index) {

    if (index >= slides.length) {
        index = 0;
    }

    if (index < 0) {
        index = slides.length - 1;
    }

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });


    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide = index;
}


/* Next / Previous */

function changeSlide(direction) {

    showSlide(currentSlide + direction);

    restartCarousel();
}


/* Specific slide */

function goToSlide(index) {

    showSlide(index);

    restartCarousel();
}


/* Automatic carousel */

function startCarousel() {

    carouselTimer = setInterval(() => {

        showSlide(currentSlide + 1);

    }, 5000);

}


/* Restart timer */

function restartCarousel() {

    clearInterval(carouselTimer);

    startCarousel();

}


/* Start */

showSlide(0);

startCarousel();