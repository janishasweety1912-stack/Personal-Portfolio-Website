/* ===============================
   MOBILE NAVIGATION
================================ */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

/* ===============================
   HAMBURGER
================================ */

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

/* ===============================
   NAV CLICK
================================ */

navItems.forEach(link => {

    link.addEventListener("click", function () {

        // Remove active from all
        navItems.forEach(item => item.classList.remove("active"));

        // Add active to clicked item
        this.classList.add("active");

        // Close mobile menu
        if (window.innerWidth <= 768) {
            navLinks.classList.remove("active");
        }

    });

});

/* ===============================
   ACTIVE LINK WHILE SCROLLING
================================ */

function updateActiveLink() {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 150;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
            current = section.id;
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

}

/* ===============================
   CONTACT FORM
================================ */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = {

            name: document.getElementById("contact-name").value.trim(),
            email: document.getElementById("email").value.trim(),
            mobile: document.getElementById("mobile").value.trim(),
            purpose: document.getElementById("purpose").value,
            message: document.getElementById("message").value.trim()

        };

        try {

            const response = await fetch("http://localhost:5000/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)

            });

            const data = await response.json();

            if (data.success) {

                alert("✅ Message Sent Successfully!");

                contactForm.reset();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("❌ Unable to connect to the server.");

        }

    });

}

function getTechIcon(tech){

    switch(tech.toLowerCase()){

        case "html":
            return '<i class="devicon-html5-plain"></i>';

        case "css":
            return '<i class="devicon-css3-plain"></i>';

        case "javascript":
            return '<i class="devicon-javascript-plain"></i>';

        case "react":
            return '<i class="devicon-react-original"></i>';

        case "node.js":
        case "nodejs":
            return '<i class="devicon-nodejs-plain"></i>';

        case "express":
        case "express.js":
            return '<i class="devicon-express-original"></i>';

        case "mongodb":
            return '<i class="devicon-mongodb-plain"></i>';

        case "mysql":
            return '<i class="devicon-mysql-plain"></i>';

        case "python":
            return '<i class="devicon-python-plain"></i>';

        case "java":
            return '<i class="devicon-java-plain"></i>';

        case "c":
            return '<i class="devicon-c-plain"></i>';

        case "c++":
            return '<i class="devicon-cplusplus-plain"></i>';

        case "bootstrap":
            return '<i class="devicon-bootstrap-plain"></i>';

        case "tailwind":
        case "tailwindcss":
            return '<i class="devicon-tailwindcss-original"></i>';

        case "git":
            return '<i class="devicon-git-plain"></i>';

        case "github":
            return '<i class="devicon-github-original"></i>';

        default:
            return '<i class="fa-solid fa-code"></i>';

    }

}

/* ===============================
   LOAD PROJECTS
================================ */

async function loadProjects() {

    try {

        const response = await fetch("http://localhost:5000/api/projects");
        const projects = await response.json();

        const projectsContainer = document.getElementById("projects-container");

        projectsContainer.innerHTML = "";

        projects.forEach(project => {

            projectsContainer.innerHTML += `

                <div class="project-card">

                    <div class="project-img">
                        <img src="http://localhost:5000/${project.image}" alt="${project.title}">
                    </div>

                    <div class="project-content">

                        <h3>${project.title}</h3>

                        <p>${project.description}</p>

                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span>${getTechIcon(tech)} ${tech}</span>`).join("")}
                        </div>

                        <div class="project-links">

                            <a href="${project.demoLink}" target="_blank">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                Live Demo
                            </a>

                            <a href="${project.githubLink}" target="_blank">
                                <i class="fa-brands fa-github"></i>
                                GitHub
                            </a>

                        </div>

                    </div>

                </div>
            `;
        });
    } catch (error) {
        console.error(error);
    }
}

loadProjects();

/* ===============================
   SKILLS TAB SWITCHING
================================ */

const tabButtons = document.querySelectorAll(".tab-btn");
const skillContents = document.querySelectorAll(".skills-content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active from all buttons
        tabButtons.forEach(btn => btn.classList.remove("active"));

        // Remove active from all contents
        skillContents.forEach(content =>
            content.classList.remove("active")
        );

        // Active button
        button.classList.add("active");

        // Selected tab
        const tab = button.dataset.tab;

        // Show all skills
        if(tab === "all"){

            skillContents.forEach(content =>
                content.classList.add("active")
            );

        }

        // Show only selected category
        else{

            document
                .getElementById(tab)
                .classList.add("active");

        }

    });

});