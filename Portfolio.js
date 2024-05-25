document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px 0px',
    threshold: 1
};

const IObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    IObserver.observe(section);
});

const projects = document.querySelectorAll(".project")

const projectsObserver = new IntersectionObserver(entries =>  {
    entries.forEach(entry => {
        entry.target.classList.toggle("show")
    })
})

projects
