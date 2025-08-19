const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

//flag to prevent observer interference when progrma is scrolling
let isScrollingProgrammatically = false;

//click handler
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        isScrollingProgrammatically = true;
        setTimeout(() => {
            isScrollingProgrammatically = false;
        }, 1000);
    });
});

//scroll handler that highlights the section taking up most of the screen
window.addEventListener("scroll", () => {
    if (isScrollingProgrammatically) return;

    let maxVisibleHeight = 0;
    let currentSectionId = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

        if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(link => link.classList.remove("active"));
    const activeLink = document.querySelector(`.nav-links a[href="#${currentSectionId}"]`);
    if (activeLink) activeLink.classList.add("active");
});
