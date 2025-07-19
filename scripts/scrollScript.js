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

//scroll handler
const observerOptions = {
    //triggers when 80% of section visible
    threshold: 0.8,
    //offset for header
    rootMargin: '-62px 0px -62px 0px'
};

const observer = new IntersectionObserver((entries) => {
    if (isScrollingProgrammatically) {
        return;
    }
    
    entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove("active");
            });
            
            if (navLink) {
                navLink.classList.add("active");
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});