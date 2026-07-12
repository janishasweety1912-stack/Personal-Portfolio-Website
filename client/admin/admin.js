// =========================
// AUTH CHECK
// =========================
let token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

// =========================
// ELEMENTS
// =========================
const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search");
const menuItems = document.querySelectorAll(".menu-item");
const dashboardPage = document.getElementById("dashboardPage");
const messagesPage = document.getElementById("messagesPage");
const projectsPage = document.getElementById("projectsPage");
const profilePage = document.getElementById("profilePage");
const portfolioPage = document.getElementById("portfolioPage");
const addProjectBtn = document.getElementById("addProjectBtn");
const projectForm = document.getElementById("projectForm");

let allContacts = [];
let allProjects = [];
let skills = [];
let editingSkill = -1;
let editingProjectId = null;

// =========================
// SKILLS VARIABLES
// =========================

const addSkillBtn = document.getElementById("addSkillBtn");

const skillName = document.getElementById("skillName");
const skillCategory = document.getElementById("skillCategory");
const skillPercentage = document.getElementById("skillPercentage");
const skillIcon = document.getElementById("skillIcon");
const skillsList = document.getElementById("skillsList");
const skillDatabase = {

    "Java": {
        category: "Languages",
        icon: "fa-brands fa-java",
        description: "OOP & Backend Development"
    },

    "Python": {
        category: "Languages",
        icon: "fa-brands fa-python",
        description: "Automation & AI"
    },

    "C": {
        category: "Languages",
        icon: "devicon-c-plain",
        description: "Programming Fundamentals"
    },

    "C++": {
        category: "Languages",
        icon: "devicon-cplusplus-plain",
        description: "OOP & Performance"
    },

    "HTML": {
        category: "Frontend",
        icon: "fa-brands fa-html5",
        description: "Web Structure"
    },

    "CSS": {
        category: "Frontend",
        icon: "fa-brands fa-css3-alt",
        description: "Responsive Design"
    },

    "JavaScript": {
        category: "Frontend",
        icon: "fa-brands fa-js",
        description: "Interactive Web"
    },

    "React": {
        category: "Frontend",
        icon: "fa-brands fa-react",
        description: "Frontend Library"
    },

    "Node.js": {
        category: "Backend",
        icon: "fa-brands fa-node-js",
        description: "Backend Runtime"
    },

    "Express.js": {
        category: "Backend",
        icon: "fa-solid fa-server",
        description: "REST APIs"
    },

    "MySQL": {
        category: "Database",
        icon: "fa-solid fa-database",
        description: "Relational Database"
    },

    "MongoDB": {
        category: "Database",
        icon: "devicon-mongodb-plain",
        description: "NoSQL Database"
    },

    "Git": {
        category: "Tools",
        icon: "fa-brands fa-git-alt",
        description: "Version Control"
    },

    "GitHub": {
        category: "Tools",
        icon: "fa-brands fa-github",
        description: "Code Repository"
    },

    "VS Code": {
        category: "Tools",
        icon: "devicon-vscode-plain",
        description: "Code Editor"
    },

    "Figma": {
        category: "Tools",
        icon: "fa-brands fa-figma",
        description: "UI/UX Design"
    }
};

// =========================
// EDUCATION VARIABLES
// =========================

let education = [];
let editingEducation = -1;

const degree = document.getElementById("degree");
const college = document.getElementById("college");
const location = document.getElementById("location");
const duration = document.getElementById("duration");
const result = document.getElementById("result");

const addEducationBtn =
    document.getElementById("addEducationBtn");

const educationList =
    document.getElementById("educationList");

// =========================
// SIDEBAR
// =========================

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        // Remove active class
        menuItems.forEach(menu => menu.classList.remove("active"));
        item.classList.add("active");

        // Hide every page first
        dashboardPage.style.display = "none";
        messagesPage.style.display = "none";
        projectsPage.style.display = "none";
        
        if(profilePage)
            profilePage.style.display = "none";

        if(portfolioPage)
            portfolioPage.style.display = "none";

        // Show selected page
        if(item.dataset.page === "dashboard"){
            dashboardPage.style.display="block";

            loadDashboard();

        }
        else if(item.dataset.page === "messages"){

            messagesPage.style.display = "block";

        }

        else if(item.dataset.page === "projects"){

            projectsPage.style.display = "block";
            loadProjects();

        }

        else if(item.dataset.page === "profile"){

            profilePage.style.display = "block";
            loadProfile();

        }

        else if(item.dataset.page === "portfolio"){

            portfolioPage.style.display = "block";
            loadPortfolio();

        }

    });

});

// =========================
// CONTACTS
// =========================

async function loadContacts() {

    try {

        const response = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/contact"
        );

        const contacts = await response.json();

        allContacts = contacts;

        document.getElementById("totalMessages").textContent =
            contacts.length;

        displayContacts(contacts);

    }

    catch (error) {

        console.log(error);

    }

}

function displayContacts(contacts) {

    tableBody.innerHTML = "";

    contacts.forEach(contact => {

        const date = new Date(contact.createdAt);

        const formattedDate =
            date.toLocaleDateString() +
            " " +
            date.toLocaleTimeString([], {

                hour: "2-digit",
                minute: "2-digit"

            });

        tableBody.innerHTML += `

        <tr>

            <td>${contact.name}</td>

            <td>${contact.email}</td>

            <td>${contact.mobile}</td>

            <td>${contact.purpose}</td>

            <td>${contact.message}</td>

            <td>${formattedDate}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteContact('${contact._id}')">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

messagesPage.style.display = "block";
projectsPage.style.display = "none";

// =========================
// SEARCH
// =========================

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = allContacts.filter(contact =>

        contact.name
        .toLowerCase()
        .includes(value)

    );

    displayContacts(filtered);

});

// =========================
// DELETE CONTACT
// =========================

async function deleteContact(id) {
    if (!confirm("Delete this message?"))
        return;
    try {
        await fetch(
            `https://personal-portfolio-website-923p.onrender.com/api/contact/${id}`,
            {
                method: "DELETE"
            }
        );
        loadContacts();
    }
    catch (error) {
        console.log(error);
    }
}

// =========================
// LOAD PROJECTS
// =========================

async function loadProjects() {
    try {
        const response = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/projects"
        );
        const projects = await response.json();
        allProjects = projects;
        const container =
            document.getElementById("projectsTable");
        container.innerHTML = "";
        projects.forEach(project => {
            container.innerHTML += `
            <div class="project-card">
                <img
                    src="https://personal-portfolio-website-923p.onrender.com/${project.image}"
                    class="project-image"
                    alt="${project.title}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-actions">
                    <button
                        class="edit-btn"
                        onclick="editProject('${project._id}')">
                        <i class="fa-solid fa-pen"></i>
                        Edit
                    </button>
                    <button
                        class="delete-btn"
                        onclick="deleteProject('${project._id}')">
                        <i class="fa-solid fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
            `;
        });
    }
    catch (error) {
        console.log(error);
    }
}

// =========================
// SHOW / HIDE PROJECT FORM
// =========================

addProjectBtn.addEventListener("click", () => {

    if (editingProjectId) {
        editingProjectId = null;
        projectForm.reset();
        addProjectBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Project';
    }

    projectForm.style.display =
        projectForm.style.display === "grid"
            ? "none"
            : "grid";

});

// =========================
// SAVE / UPDATE PROJECT
// =========================

projectForm.addEventListener("submit", async (e) => { e.preventDefault();

    // ==========================
    // Upload Image First
    // ==========================
    const token = localStorage.getItem("token");
    let imagePath = document.getElementById("existingImage").value;
    const imageInput = document.getElementById("image");

    if (imageInput.files.length > 0) {

        const imageData = new FormData();

        imageData.append("image", imageInput.files[0]);

        const uploadResponse = await fetch(

            "https://personal-portfolio-website-923p.onrender.com/api/projects/upload",

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                },

                body: imageData

            }

        );

        const uploadResult = await uploadResponse.json();
        imagePath = uploadResult.image;

    }


    const project = {

        title: document.getElementById("title").value.trim(),

        description: document.getElementById("description").value.trim(),
        image: imagePath,
        technologies: document
            .getElementById("technologies")
            .value
            .split(",")
            .map(item => item.trim()),

        demoLink: document.getElementById("demoLink").value.trim(),
        githubLink: document.getElementById("githubLink").value.trim()

    };
    console.log("Project Object:");
    console.log(project);
    console.log("Demo Link =", document.getElementById("demoLink").value);

    const url = editingProjectId
        ? `https://personal-portfolio-website-923p.onrender.com/api/projects/${editingProjectId}`
        : "https://personal-portfolio-website-923p.onrender.com/api/projects";

    const method = editingProjectId
        ? "PUT"
        : "POST";

    try {

        const response = await fetch(url, {

            method,

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(project)

        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to save project");
        }

        Swal.fire({
            icon: "success",
            title: editingProjectId ? "Updated!" : "Success!",
            text: editingProjectId
                ? "Project Updated Successfully"
                : "Project Added Successfully"
        });

        projectForm.reset();
        document.getElementById("existingImage").value = "";

        projectForm.style.display = "none";

        editingProjectId = null;
        document.getElementById("existingImage").value = "";

        projectForm.reset();

        addProjectBtn.innerHTML =
            '<i class="fa-solid fa-plus"></i> Add Project';

        loadProjects();

    }

    catch (error) {

        alert(error.message);

    }

});

// =========================
// EDIT PROJECT
// =========================

function editProject(id) {

    const project = allProjects.find(p => p._id === id);

    if (!project) return;

    document.getElementById("title").value = project.title;

    document.getElementById("description").value = project.description;

    document.getElementById("existingImage").value = project.image;

    document.getElementById("technologies").value = project.technologies.join(", ");

    document.getElementById("demoLink").value = project.demoLink;

    document.getElementById("githubLink").value = project.githubLink;

    editingProjectId = id;

    projectForm.style.display = "grid";

    addProjectBtn.innerHTML =
        '<i class="fa-solid fa-pen"></i> Editing Project';

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// =========================
// DELETE PROJECT
// =========================

async function deleteProject(id) {

    const result = await Swal.fire({
        title: "Delete Project?",
        text: "You won't be able to recover it.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, Delete"
    });

    if (!result.isConfirmed) return;

    // Get the latest token every time
    const token = localStorage.getItem("token");

    try {

        const response = await fetch(
            `https://personal-portfolio-website-923p.onrender.com/api/projects/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: data.message,
            timer: 1800,
            showConfirmButton: false
        });

        loadProjects();

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });

    }

}

// ======================
// LOAD ADMIN PROFILE
// ======================

async function loadProfile() {

    try {

        const response = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/admin/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const admin = await response.json();

        if (!response.ok) {
            throw new Error(admin.message);
        }

        document.getElementById("profileUsername").textContent = admin.username;
        document.getElementById("adminName").textContent = admin.username;
        document.getElementById("profileEmail").textContent = admin.email || "";

        document.getElementById("newUsername").value = admin.username;
        document.getElementById("newEmail").value = "";

        const profileImage = document.getElementById("profileImage");
        const profileInitials = document.getElementById("profileInitials");

        // Create initials (Anisha Sweety -> AS)
        const initials = admin.username
            .trim()
            .split(/\s+/)
            .map(name => name.charAt(0))
            .join("")
            .substring(0, 2)
            .toUpperCase();

        profileInitials.textContent = initials;

        // Default state
        profileImage.style.display = "none";
        profileInitials.style.display = "flex";

        // If image exists in database
        if (admin.profileImage) {

            profileImage.onload = function () {
                profileImage.style.display = "block";
                profileInitials.style.display = "none";
            };

            profileImage.onerror = function () {
                profileImage.style.display = "none";
                profileInitials.style.display = "flex";
            };

            // Prevent browser cache
            profileImage.src =
                `https://personal-portfolio-website-923p.onrender.com/${admin.profileImage}?t=${Date.now()}`;

        }

    }
    catch (error) {
        console.error(error);
    }

}

// ======================
// SAVE PROFILE
// ======================

document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const body = {
        username: document.getElementById("newUsername").value.trim(),
        newEmail: document.getElementById("newEmail").value.trim(),
        currentPassword: document.getElementById("currentPassword").value,
        newPassword: document.getElementById("newPassword").value
    };
    try {
        const response = await fetch("https://personal-portfolio-website-923p.onrender.com/api/admin/profile",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.message
            });
            return;
        }
        Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message
        });
        loadProfile();
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Unable to connect to server."
        });
        console.error(err);
    }
});

// =========================
// LOGOUT
// =========================

const logoutBtn = document.querySelector(".fa-right-from-bracket")?.parentElement;
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        const confirmLogout = confirm("Logout from Admin Panel?");
        if (!confirmLogout) return;
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
}

// =========================
// LOAD PORTFOLIO
// =========================

async function loadPortfolio() {
    try {
        const response = await fetch("https://personal-portfolio-website-923p.onrender.com/api/portfolio");
        const portfolio = await response.json();
        document.getElementById("portfolioName").value = portfolio.name || "";
        document.getElementById("portfolioRole").value = portfolio.role || "";
        document.getElementById("heroDescription").value = portfolio.heroDescription || "";
        document.getElementById("heroDescription2").value = portfolio.heroDescription2 || "";
        document.getElementById("portfolioAbout").value = portfolio.about || "";
        document.getElementById("portfolioAbout2").value = portfolio.about2 || "";
        document.getElementById("portfolioAbout3").value = portfolio.about3 || "";
        document.getElementById("portfolioAbout4").value = portfolio.about4 || "";
        document.getElementById("portfolioEmail").value = portfolio.email || "";
        document.getElementById("portfolioMobile").value = portfolio.mobile || "";
        document.getElementById("portfolioLocation").value = portfolio.location || "";
        document.getElementById("portfolioGithub").value = portfolio.github || "";
        document.getElementById("portfolioLinkedin").value = portfolio.linkedin || "";
        document.getElementById("portfolioResume").value = portfolio.resume || "";

        // =========================
        // LOAD SKILLS
        // =========================
        skills = [];
        skills = portfolio.skills || [];
        renderSkills();
    }
    catch (error) {
        console.log(error);
    }
}

// =========================
// SAVE PORTFOLIO
// =========================

document.getElementById("portfolioForm")
.addEventListener("submit", async function(e){e.preventDefault();
    const portfolio = {
        name: document.getElementById("portfolioName").value,
        role: document.getElementById("portfolioRole").value,
        heroDescription: document.getElementById("heroDescription").value,
        heroDescription2: document.getElementById("heroDescription2").value,
        about: document.getElementById("portfolioAbout").value,
        about2: document.getElementById("portfolioAbout2").value,
        about3: document.getElementById("portfolioAbout3").value,
        about4: document.getElementById("portfolioAbout4").value,
        email: document.getElementById("portfolioEmail").value,
        mobile: document.getElementById("portfolioMobile").value,
        location: document.getElementById("portfolioLocation").value,
        github: document.getElementById("portfolioGithub").value,
        linkedin: document.getElementById("portfolioLinkedin").value,
        resume: document.getElementById("portfolioResume").value,
        skills: skills
    };
    console.log("Portfolio being sent:", portfolio);
    console.log("Before Save:", JSON.stringify(skills));
    try{
        const response = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/portfolio",
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(portfolio)
            }
        );
        const data = await response.json();
        Swal.fire({
            icon:"success",
            title:"Saved!",
            text:"Portfolio Updated Successfully"
        });
    }
    catch(error){
        console.log(error);
    }
});

// ======================
// PROFILE IMAGE UPLOAD
// ======================

const profileImageInput = document.getElementById("profileImageInput");
profileImageInput.addEventListener("change", async () => {
    const file = profileImageInput.files[0];
    if (!file) 
        return;
    const formData = new FormData();
    formData.append("profileImage", file);
    try {
        const response = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/admin/upload-profile",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Profile picture updated"
        });
        loadProfile();
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: err.message
        });
    }
});

// ======================
// DASHBOARD
// ======================

async function loadDashboard() {
    try {
        const projectResponse = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/projects"
        );
        const projects = await projectResponse.json();
        const messageResponse = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/contact"
        );
        const messages = await messageResponse.json();
        document.getElementById("dashboardProjects").textContent = projects.length;
        document.getElementById("dashboardMessages").textContent = messages.length;
        // Popup only once immediately after login
        if (!sessionStorage.getItem("showDashboardPopup") === "true") {
            sessionStorage.removeItem("showDashboardPopup");
            const profileResponse = await fetch(
                "https://personal-portfolio-website-923p.onrender.com/api/admin/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const admin = await profileResponse.json();
            console.log(admin);
            console.log(admin.username);
            Swal.fire({
                icon: "success",
                title: `Welcome Back, ${admin.username} 👋`,
                html: `
                    📁<b>Total Projects :</b> ${projects.length}<br><br>
                    📩<b>Total Messages :</b> ${messages.length}
                `,
                confirmButtonText: "Continue"
            });
        }
    }
    catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message
        });
    }
}

loadDashboard();
loadPortfolio();
loadProfile();
loadContacts();

// =========================
// RENDER SKILLS
// =========================

function renderSkills() {
    skillsList.innerHTML = "";
    skills.forEach((skill, index) => {
        skillsList.innerHTML += `
        <div class="skill-card">
            <div>
                <strong>${skill.name}</strong>
                <br>
                ${skill.category}
                •
                ${skill.percentage}%
            </div>
            <div>
                <button type="button" onclick="editSkill(${index})" class="edit-btn">
                    Edit
                </button>
                <button type="button" onclick="deleteSkill(${index})" class="delete-btn">
                    Delete
                </button>
            </div>
        </div>
        `;
    });
}

// =========================
// ADD SKILL
// =========================

addSkillBtn.addEventListener("click", () => {
    if (
        skillName.value === "" ||
        skillPercentage.value.trim() === ""
    ) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please complete all fields."
        });
        return;
    }
    // Get selected skill details
    const selectedSkill = skillDatabase[skillName.value];
    const skill = {
        name: skillName.value,
        category: selectedSkill.category,
        percentage: Number(skillPercentage.value),
        icon: selectedSkill.icon,
        description: selectedSkill.description
    };
    console.log(skill);
    if (editingSkill === -1) {
        skills.push(skill);
    } else {
        skills[editingSkill] = skill;
        editingSkill = -1;
        addSkillBtn.innerHTML = "Add Skill";
    }
    // Reset Form
    skillName.selectedIndex = 0;
    skillPercentage.value = "";
    //skillDescription.value = "";
    renderSkills();
});

// =========================
// EDIT SKILL
// =========================

function editSkill(index) {
    const skill = skills[index];
    skillName.value = skill.name;
    skillPercentage.value = skill.percentage;
    editingSkill = index;
    addSkillBtn.innerHTML = "Update Skill";
    renderSkills();
}

// =========================
// DELETE SKILL
// =========================

function deleteSkill(index) {
    Swal.fire({
        title: "Delete Skill?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete"
    }).then(result => {
        if (!result.isConfirmed) return;
        skills.splice(index, 1);
        console.log("After Delete:", JSON.stringify(skills));
        renderSkills();
    });
}

// =========================
// RENDER EDUCATION
// =========================

function renderEducation() {
    educationList.innerHTML = "";
    education.forEach((item, index) => {
        educationList.innerHTML += `
        <div class="skill-card">
            <div>
                <strong>${item.degree}</strong>
                <br>
                ${item.college}
                <br>
                ${item.duration}
            </div>
            <div>
                <button type="button" class="edit-btn" onclick="editEducation(${index})">
                    Edit
                </button>
                <button type="button" class="delete-btn" onclick="deleteEducation(${index})">
                    Delete
                </button>
            </div>
        </div>
        `;
    });
}