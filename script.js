/* =========================================
   AGROSMART JAVASCRIPT
   ========================================= */


/* ---------- MOBILE MENU ---------- */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu when clicking link */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ---------- DARK MODE ---------- */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "dark");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "light");
    }

});


/* Load saved theme */

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    const icon = themeToggle.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
}


/* ---------- COUNTER ANIMATION ---------- */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = target / 50;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent = Math.ceil(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;
            }
        };

        updateCounter();

    });

}


/* Detect statistics section */

const statsSection = document.querySelector(".stats-section");

const statsObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounters();

            }

        });

    },

    {
        threshold: 0.3
    }

);

statsObserver.observe(statsSection);


/* ---------- TECHNOLOGY SEARCH ---------- */

const searchInput = document.getElementById("technologySearch");

const technologyCards =
    document.querySelectorAll(".technology-card");


searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    technologyCards.forEach(card => {

        const cardText =
            card.textContent.toLowerCase();

        if (cardText.includes(searchValue)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });

});


/* ---------- CONTACT FORM ---------- */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !subject || !message) {

        formMessage.textContent =
            "Please fill in all fields.";

        formMessage.style.color = "#d9534f";

        return;
    }


    formMessage.textContent =
        `Thank you, ${name}! Your message has been received.`;

    formMessage.style.color = "#2f7d4b";


    contactForm.reset();

});


/* ---------- SCROLL REVEAL ---------- */

const revealElements =
    document.querySelectorAll(
        ".crop-card, .method-card, .technology-card, .feature"
    );


const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* ---------- ACTIVE NAVIGATION ---------- */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");
        }

    });

});