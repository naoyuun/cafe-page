const targets = document.querySelectorAll(".fadeUp");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

/*nav */
targets.forEach((target) => observer.observe(target));

const hamburger = document.querySelector(".header__hamburger");
const menu = document.querySelector(".header__nav");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
});
