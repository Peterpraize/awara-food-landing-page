/* =====================================================
   AWARA WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   HERO WHATSAPP ORDER
===================================================== */

function orderAwara(product, price) {

    const phoneNumber = "2347087057376";

    const message =
`Hello AWARA 👋

I would like to place an order.

🍽️ Product: ${product}
💰 Unit Price: ${price}
📦 Quantity: 1
💵 Total: ${price}

Please confirm availability and delivery/pickup details.

Thank you!`;

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(
        whatsappURL,
        "_blank"
    );
}


/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(button, change) {

    const card =
        button.closest(".product-card");

    if (!card) return;


    const quantityElement =
        card.querySelector(".quantity-value");

    const totalElement =
        card.querySelector(".total-price strong");

    const priceElement =
        card.querySelector(".price");


    if (
        !quantityElement ||
        !totalElement ||
        !priceElement
    ) {
        return;
    }


    let quantity =
        parseInt(
            quantityElement.textContent.trim()
        );


    const price =
        parseInt(
            priceElement.textContent
                .replace(/[₦,]/g, "")
                .trim()
        );


    quantity += change;


    // Minimum quantity is 1
    if (quantity < 1) {
        quantity = 1;
    }


    // Update quantity displayed
    quantityElement.textContent =
        quantity;


    // SAVE THE CURRENT QUANTITY
    card.dataset.quantity =
        quantity;


    // Calculate total
    const total =
        price * quantity;


    // Update total displayed
    totalElement.textContent =
        "₦" + total.toLocaleString("en-NG");
}



/* =====================================================
   PRODUCT ORDER
===================================================== */

function orderProduct(button, product, price) {

    const card =
        button.closest(".product-card");

    if (!card) {
        console.error("Product card not found.");
        return;
    }


    /*
       Get the quantity directly from
       the quantity displayed on the card.
    */

    const quantityElement =
        card.querySelector(".quantity-value");


    if (!quantityElement) {

        console.error(
            "Quantity element not found."
        );

        return;
    }


    const quantity =
        parseInt(
            quantityElement.textContent.trim()
        );


    /*
       Make sure quantity is valid.
    */

    if (
        isNaN(quantity) ||
        quantity < 1
    ) {

        console.error(
            "Invalid quantity:",
            quantity
        );

        return;
    }


    /*
       Calculate total.
    */

    const total =
        price * quantity;


    /*
       WhatsApp number.
    */

    const phoneNumber =
        "2347087057376";


    /*
       Create message.
    */

    const message =
`Hello AWARA 👋

I would like to place an order.

🍽️ Product: ${product}
💰 Unit Price: ₦${price.toLocaleString("en-NG")}
📦 Quantity: ${quantity}
💵 Total: ₦${total.toLocaleString("en-NG")}

Please confirm availability and delivery/pickup details.

Thank you!`;


    /*
       Create WhatsApp URL.
    */

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);


    /*
       Open WhatsApp.
    */

    window.open(
        whatsappURL,
        "_blank"
    );
}

/* =====================================================
   GO FROM HERO TO PRODUCT
===================================================== */

function goToProduct(product) {

    let productId = "";

    if (product === "chicken") {
        productId = "product-chicken";
    }

    if (product === "egg") {
        productId = "product-egg";
    }

    if (product === "fish") {
        productId = "product-fish";
    }


    const productCard =
        document.getElementById(productId);


    if (!productCard) {
        console.error(
            "AWARA product card not found:",
            productId
        );
        return;
    }


    /*
       Scroll to the selected product
    */

    productCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    /*
       Briefly highlight the product
    */

    productCard.classList.add(
        "product-highlight"
    );


    setTimeout(function () {

        productCard.classList.remove(
            "product-highlight"
        );

    }, 1500);
}

/* =====================================================
   HERO CAROUSEL
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const slides =
            document.querySelectorAll(
                ".hero-slide"
            );

        const dots =
            document.querySelectorAll(
                ".carousel-dot"
            );

        const previousButton =
            document.querySelector(
                ".carousel-arrow.prev"
            );

        const nextButton =
            document.querySelector(
                ".carousel-arrow.next"
            );


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



        /* =============================================
           SHOW SLIDE
        ============================================= */

        function showSlide(index) {

            if (
                index >=
                slides.length
            ) {
                index = 0;
            }


            if (index < 0) {
                index =
                    slides.length - 1;
            }


            slides.forEach(
                function (slide) {

                    slide.classList.remove(
                        "active"
                    );

                }
            );


            dots.forEach(
                function (dot) {

                    dot.classList.remove(
                        "active"
                    );

                }
            );


            slides[index].classList.add(
                "active"
            );


            dots[index].classList.add(
                "active"
            );


            currentSlide = index;
        }



        /* =============================================
           NEXT
        ============================================= */

        function nextSlide() {

            showSlide(
                currentSlide + 1
            );
        }



        /* =============================================
           PREVIOUS
        ============================================= */

        function previousSlide() {

            showSlide(
                currentSlide - 1
            );
        }



        /* =============================================
           NEXT BUTTON
        ============================================= */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    nextSlide();

                    restartAutoSlide();

                }
            );

        }



        /* =============================================
           PREVIOUS BUTTON
        ============================================= */

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    previousSlide();

                    restartAutoSlide();

                }
            );

        }



        /* =============================================
           DOTS
        ============================================= */

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



        /* =============================================
           AUTO SLIDE
        ============================================= */

        function startAutoSlide() {

            autoSlide =
                setInterval(
                    function () {

                        nextSlide();

                    },
                    5000
                );
        }



        /* =============================================
           RESTART AUTO SLIDE
        ============================================= */

        function restartAutoSlide() {

            clearInterval(
                autoSlide
            );

            startAutoSlide();
        }



        showSlide(0);

        startAutoSlide();



        /* =============================================
           PAUSE ON HOVER
        ============================================= */

        const carousel =
            document.querySelector(
                ".hero-carousel"
            );


        if (carousel) {

            carousel.addEventListener(
                "mouseenter",
                function () {

                    clearInterval(
                        autoSlide
                    );

                }
            );


            carousel.addEventListener(
                "mouseleave",
                function () {

                    startAutoSlide();

                }
            );

        }



        /* =============================================
           MOBILE SWIPE
        ============================================= */

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


                    if (
                        swipeDistance < -50
                    ) {

                        nextSlide();

                        restartAutoSlide();

                    }


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