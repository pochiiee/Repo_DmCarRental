document.addEventListener("DOMContentLoaded", function () {
    // Timer and Resend Code Logic
    let timer = 60;
    let countdown = document.getElementById("timer");
    let resendText = document.getElementById("resend-text");
    let countdownContainer = document.getElementById("countdown");
    let resendLink = document.getElementById("resend-code");

    function startTimer() {
        countdown.textContent = timer;
        let interval = setInterval(() => {
            timer--;
            countdown.textContent = timer;

            if (timer <= 0) {
                clearInterval(interval);
                countdownContainer.style.display = "none";
                resendText.style.display = "block";
            }
        }, 1000);
    }

    if (countdown) startTimer();

    resendLink?.addEventListener("click", function (e) {
        e.preventDefault();
        resendText.style.display = "none";
        countdownContainer.style.display = "block";
        timer = 60;
        startTimer();

        fetch('/Guest/Account/ResendCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value
            }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.success ? "New verification code sent!" : data.message);
            })
            .catch(error => console.error('Error:', error));
    });

    // Mobile Menu Toggle
    const menuOpenButton = document.querySelector("#menu-open-button");
    const menuCloseButton = document.querySelector("#menu-close-button");

    menuOpenButton?.addEventListener("click", () => {
        document.body.classList.toggle("show-mobile-menu");
    });

    menuCloseButton?.addEventListener("click", () => menuOpenButton.click());

    // Highlight Active Navigation Link
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - section.clientHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href").includes(current));
        });
    });

    // Swiper Initialization
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
        }
    });

    // Adjust Car Card Heights
    function adjustCarHeight() {
        let maxHeight = 0;
        const cars = document.querySelectorAll(".car");

        cars.forEach(car => car.style.height = "auto");
        cars.forEach(car => maxHeight = Math.max(maxHeight, car.offsetHeight));
        cars.forEach(car => car.style.height = maxHeight + "px");
    }

    const carImages = document.querySelectorAll(".car img");
    let imagesLoaded = 0;

    carImages.forEach(img => {
        img.addEventListener("load", () => {
            imagesLoaded++;
            if (imagesLoaded === carImages.length) adjustCarHeight();
        });
        if (img.complete) imagesLoaded++;
    });

    window.addEventListener("resize", adjustCarHeight);
});
