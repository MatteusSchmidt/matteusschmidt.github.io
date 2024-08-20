document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a')
function highlightClosestSection() {
    let highlightedSection = null;
    let closestTop = Number.NEGATIVE_INFINITY;
    let cutoff = (window.innerHeight / 10) * 3;
    sections.forEach(section => {
        section.classList.remove('active')
        const rect = section.getBoundingClientRect();
        if (rect.top <= cutoff && rect.top > closestTop) {
            closestTop = rect.top;
            highlightedSection = section;
        }
    });
    if (highlightedSection) {
        highlightedSection.classList.add('active');
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === highlightedSection.id);
        });
    }
}
window.addEventListener('scroll', highlightClosestSection);
document.addEventListener('DOMContentLoaded', highlightClosestSection);


const projects = document.querySelectorAll(".project");
const projectsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const scale = 0.7 + (0.3 * entry.intersectionRatio);
        entry.target.style.transform = `scale(${scale})`;
        entry.target.style.transform = `opacity(${scale})`
    });
}, {
    threshold: Array.from({length: 101}, (_, i) => i / 100),
    rootMargin: "-20px",
});
projects.forEach(project => {
    projectsObserver.observe(project);
});


const skills = document.querySelectorAll(".skill-object")
const skillsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const leftValue = entry.boundingClientRect.left;
        if (entry.isIntersecting) {
            const waitTime = leftValue;
            setTimeout(() => {
                entry.target.classList.add("fade-in-up");
            }, waitTime);
            skillsObserver.unobserve(entry.target)
        }
    })
}, {
    rootMargin: "-50px"
});
skills.forEach(skill => {
    skillsObserver.observe(skill);
});

const experience1 = document.querySelectorAll(".experience-container-1 .experience-text-container, .arrow")
const experience1Observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("bounce-left")
            experience1Observer.unobserve(entry.target);
        }
    })
}, {
    // rootMargin: "-400px"
});
experience1.forEach(experience => {
    experience1Observer.observe(experience);
})

const experience2 = document.querySelectorAll(".experience-container-2 .experience-text-container, .arrow-2")
const experience2Observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("bounce-right")
            experience2Observer.unobserve(entry.target);
        }
    })
}, {
    // rootMargin: "-200px"
});
experience2.forEach(experience => {
    experience2Observer.observe(experience);
})

function setSpacerHeight() {
    var height = document.getElementById("experience-spacer").offsetHeight;
    var firstOuterCircle = document.getElementById("first-outer-circle");
    firstOuterCircle.style.setProperty('--before-height', height - 30 + 'px');
}
window.onload = setSpacerHeight;
window.onresize = setSpacerHeight;

const submitButton = document.getElementById('submit');

document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    submitButton.disabled = true;
    const formData = new FormData(this);
    fetch('script.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            if (data.includes("Message has been sent successfully")) {
                this.reset();
            } else {
                alert("Failed to send email: " + data);
            }
            submitButton.disabled = false;
        })
        .catch(error => {
            console.error('Error: ', error);
            submitButton.disabled = false;
        });
});