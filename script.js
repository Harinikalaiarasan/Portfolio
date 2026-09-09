const roles = [
    "Java Full Stack Developer",
    "Software Developer",
    "Java Developer",
    "Frontend Developer"
];

let roleIndex = 0;
let charIndex = 0;

const typingText = document.getElementById("typing");


function typeEffect() {

    if (charIndex < roles[roleIndex].length) {

        typingText.textContent += roles[roleIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 90);

    } else {

        setTimeout(deleteEffect, 1500);

    }
}


function deleteEffect() {

    if (charIndex > 0) {

        typingText.textContent =
            roles[roleIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(deleteEffect, 50);

    } else {

        roleIndex++;

        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }

        setTimeout(typeEffect, 300);
    }
}


typeEffect();



// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

    });

});



// ========================================
// ACTIVE NAVIGATION
// ========================================

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});



// ========================================
// ABOUT TABS
// ========================================

function openTab(tabName, button) {

    const contents =
        document.querySelectorAll(".tab-content");

    contents.forEach(content => {

        content.classList.remove("active");

    });


    const buttons =
        document.querySelectorAll(".tab-btn");

    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    document.getElementById(tabName)
        .classList.add("active");


    button.classList.add("active");

}



// ========================================
// SKILL BAR ANIMATION
// ========================================

const skillBars = document.querySelectorAll(".skill-bar-fill");

const skillObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const bar = entry.target;

                const width = bar.getAttribute("data-width");

                bar.style.width = width + "%";

                observer.unobserve(bar);
            }

        });

    },
    {
        threshold: 0.3
    }
);


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});

// ========================================
// ACHIEVEMENT COUNTER ANIMATION
// ========================================

const counters = document.querySelectorAll(".counter-num");

let counterStarted = false;

const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !counterStarted) {

                counterStarted = true;

                counters.forEach(counter => {

                    const target =
                        parseInt(counter.dataset.target);

                    let current = 0;

                    const increment =
                        target / 50;

                    function updateCounter() {

                        if (current < target) {

                            current += increment;

                            counter.textContent =
                                Math.ceil(current);

                            setTimeout(updateCounter, 30);

                        } else {

                            counter.textContent = target;

                        }

                    }

                    updateCounter();

                });

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.4
    }
);


const achievements =
    document.querySelector(".achievements");

if (achievements) {
    counterObserver.observe(achievements);
}

// ========================================
// SCROLL TO TOP
// ========================================

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});


scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

    // FORMS

const form = document.getElementById("form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = form.querySelector("button[type='submit']");
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = "Sending...";
    submitButton.disabled = true;

    const formData = new FormData(form);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert("✅ Message sent successfully!");

            form.reset();

        } else {
            alert("❌ Message failed to send. Please try again.");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("❌ Something went wrong. Please try again.");
    }

    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
});

