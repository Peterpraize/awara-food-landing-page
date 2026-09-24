/* =====================================================
   AWARA WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   WHATSAPP ORDER FROM HERO
===================================================== */

function orderAwara(product, price) {

    const phoneNumber = "2347087057376";

    const message =
`Hello AWARA 👋

I would like to place an order.

🍽️ Product: ${product}
💰 Price: ${price}
📦 Quantity: 1

Please confirm availability and delivery/pickup details.

Thank you!`;

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
}



/* =====================================================
   CHANGE PRODUCT QUANTITY
===================================================== */

function changeQuantity(button, change) {

    // Find the product card containing the button
    const card = button.closest(".product-card");

    if (!card) {
        return;
    }


    // Find quantity number
    const quantityElement =
        card.querySelector(".quantity-value");


    // Find total price
    const totalElement =
        card.querySelector(".total-price strong");


    // Find original product price
    const priceElement =
        card.querySelector(".price");


    if (
        !quantityElement ||
        !totalElement ||
        !priceElement
    ) {
        return;
    }


    // Get current quantity
    let quantity =
        parseInt(quantityElement.textContent);


    // Get product price
    const price =
        parseInt(
            priceElement.textContent
                .replace(/[₦,]/g, "")
        );


    // Change quantity
    quantity += change;


    // Never allow quantity below 1
    if (quantity < 1) {
        quantity = 1;
    }


    // Update quantity on screen
    quantityElement.textContent = quantity;


    // Calculate total
    const total = price * quantity;


    // Update total on screen
    totalElement.textContent =
        "₦" + total.toLocaleString("en-NG");
}



/* =====================================================
   ORDER PRODUCT WITH QUANTITY
===================================================== */

function orderProduct(button, product, price) {

    // Find the product card
    const card =
        button.closest(".product-card");


    if (!card) {
        return;
    }


    // Get selected quantity
    const quantityElement =
        card.querySelector(".quantity-value");


    const quantity =
        parseInt(quantityElement.textContent);


    // Calculate total
    const total =
        price * quantity;


    // WhatsApp number
    const phoneNumber =
        "2347087057376";


    // Create WhatsApp message
    const message =
`Hello AWARA 👋

I would like to place an order.

🍽️ Product: ${product}
💰 Unit Price: ₦${price.toLocaleString("en-NG")}
📦 Quantity: ${quantity}
💵 Total: ₦${total.toLocaleString("en-NG")}

Please confirm availability and delivery/pickup details.

Thank you!`;


    // Create WhatsApp URL
    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    // Open WhatsApp
    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );
}



/* =====================================================
   HERO CAROUSEL
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const slides =
            document.querySelectorAll(".hero-slide");

        const dots =
            document.querySelectorAll(".carousel-dot");

        const previousButton =
            document.querySelector(
                ".carousel-arrow.prev"
            );

        const nextButton =
            document.querySelector(
                ".carousel-arrow.next"
            );


        // Make sure carousel exists
        if (
            slides.length === 0 ||
            dots.length === 0
        ) {

            console.error(
                "AWARA carousel: slides or dots were not found."
            );

            return;
        }


        let currentSlide = 0;

        let autoSlide;



        /* =================================================
           SHOW SLIDE
        ================================================= */

        function showSlide(index) {

            // Loop back to first slide
            if (index >= slides.length) {
                index = 0;
            }


            // Loop to last slide
            if (index < 0) {
                index = slides.length - 1;
            }


            // Remove active from all slides
            slides.forEach(
                function (slide) {

                    slide.classList.remove(
                        "active"
                    );

                }
            );


            // Remove active from all dots
            dots.forEach(
                function (dot) {

                    dot.classList.remove(
                        "active"
                    );

                }
            );


            // Activate selected slide
            slides[index].classList.add(
                "active"
            );


            // Activate selected dot
            dots[index].classList.add(
                "active"
            );


            currentSlide = index;
        }



        /* =================================================
           NEXT SLIDE
        ================================================= */

        function nextSlide() {

            showSlide(
                currentSlide + 1
            );
        }



        /* =================================================
           PREVIOUS SLIDE
        ================================================= */

        function previousSlide() {

            showSlide(
                currentSlide - 1
            );
        }



        /* =================================================
           NEXT BUTTON
        ================================================= */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextSlide();

                    restartAutoSlide();

                }
            );
        }



        /* =================================================
           PREVIOUS BUTTON
        ================================================= */

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    previousSlide();

                    restartAutoSlide();

                }
            );
        }



        /* =================================================
           CAROUSEL DOTS
        ================================================= */

        dots.forEach(
            function (dot, index) {

                dot.addEventListener(
                    "click",
                    function () {

                        showSlide(index);

                        restartAutoSlide();

                    }
                );

            }
        );



        /* =================================================
           AUTOMATIC SLIDE
        ================================================= */

        function startAutoSlide() {

            autoSlide =
                setInterval(
                    function () {

                        nextSlide();

                    },
                    5000
                );
        }



        /* =================================================
           RESTART AUTOMATIC SLIDE
        ================================================= */

        function restartAutoSlide() {

            clearInterval(autoSlide);

            startAutoSlide();
        }



        // Start carousel
        showSlide(0);

        startAutoSlide();



        /* =================================================
           PAUSE CAROUSEL ON HOVER
        ================================================= */

        const carousel =
            document.querySelector(
                ".hero-carousel"
            );


        if (carousel) {

            carousel.addEventListener(
                "mouseenter",
                function () {

                    clearInterval(autoSlide);

                }
            );


            carousel.addEventListener(
                "mouseleave",
                function () {

                    startAutoSlide();

                }
            );

        }



        /* =================================================
           MOBILE SWIPE
        ================================================= */

        let touchStartX = 0;

        let touchEndX = 0;


        if (carousel) {

            carousel.addEventListener(
                "touchstart",
                function (event) {

                    touchStartX =
                        event.changedTouches[0]
                            .screenX;

                },
                {
                    passive: true
                }
            );


            carousel.addEventListener(
                "touchend",
                function (event) {

                    touchEndX =
                        event.changedTouches[0]
                            .screenX;


                    const swipeDistance =
                        touchEndX -
                        touchStartX;


                    // Swipe left
                    if (
                        swipeDistance < -50
                    ) {

                        nextSlide();

                        restartAutoSlide();

                    }


                    // Swipe right
                    if (
                        swipeDistance > 50
                    ) {

                        previousSlide();

                        restartAutoSlide();

                    }

                },
                {
                    passive: true
                }
            );

        }

    }
);