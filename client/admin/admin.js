// =========================
// AUTH CHECK
// =========================

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

// =========================
// ELEMENTS
// =========================

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("search");

const menuItems = document.querySelectorAll(".menu-item");

const messagesPage = document.getElementById("messagesPage");
const projectsPage = document.getElementById("projectsPage");
const profilePage = document.getElementById("profilePage");
const portfolioPage = document.getElementById("portfolioPage");

const addProjectBtn = document.getElementById("addProjectBtn");
const projectForm = document.getElementById("projectForm");

let allContacts = [];
let allProjects = [];
let editingProjectId = null;

// =========================
// SIDEBAR
// =========================

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        // Remove active class
        menuItems.forEach(menu => menu.classList.remove("active"));
        item.classList.add("active");

        // Hide every page first
        messagesPage.style.display = "none";
        projectsPage.style.display = "none";

        if(profilePage)
            profilePage.style.display = "none";

        if(portfolioPage)
            portfolioPage.style.display = "none";

        // Show selected page
        if(item.dataset.page === "messages"){

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

loadContacts();

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

projectForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // ==========================
    // Upload Image First
    // ==========================

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

            throw new Error(result.message);

        }

        if (editingProjectId) {

            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Project Updated Successfully",
                timer: 1800,
                showConfirmButton: false
            });

        } else {

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Project Added Successfully",
                timer: 1800,
                showConfirmButton: false
            });

        }

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

    document.getElementById("technologies").value =
        project.technologies.join(", ");

    document.getElementById("demoLink").value =
        project.demoLink;

    document.getElementById("githubLink").value =
        project.githubLink;

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

    try {

        const response = await fetch(

            `https://personal-portfolio-website-923p.onrender.com/api/projects/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: `Bearer ${token}`

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

    }

    catch (error) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message
        });

    }

}

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

// ======================
// LOAD PROFILE
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

        document.getElementById("profileUsername").textContent = admin.username;
        const profileImage = document.getElementById("profileImage");

        if (!admin.profileImage) {

            profileImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.username)}&background=B89C8E&color=fff&size=200`;

        }else {

            profileImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.username)}&background=B89C8E&color=fff&size=200`;

        }

        document.getElementById("profileEmail").textContent = admin.email;

        document.getElementById("newUsername").value = admin.username;

    }

    catch (error) {

        console.log(error);

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
        document.getElementById("profileEmail").textContent = admin.email;
        if(admin.profileImage){

            document.getElementById("profileImage").src =
                `https://personal-portfolio-website-923p.onrender.com/${admin.profileImage}`;

        }
        document.getElementById("newUsername").value = admin.username;

    }

    catch (error) {

        console.log(error);

    }

}

document
.getElementById("profileImageInput")
.addEventListener("change", function(){

    const file = this.files[0];

    if(file){

        document.getElementById("profileImage").src =
            URL.createObjectURL(file);

    }

});

// =========================
// LOAD PORTFOLIO
// =========================

async function loadPortfolio() {

    try {

        const response = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/portfolio"
        );

        const data = await response.json();

        document.getElementById("portfolioName").value = data.name || "";

        document.getElementById("portfolioRole").value = data.role || "";
        document.getElementById("heroDescription").value = data.heroDescription || "";

        document.getElementById("heroDescription2").value = data.heroDescription2 || "";

        document.getElementById("portfolioAbout").value = data.about || "";

        document.getElementById("portfolioAbout2").value = data.about2 || "";

        document.getElementById("portfolioAbout3").value = data.about3 || "";

        document.getElementById("portfolioAbout4").value = data.about4 || "";

        document.getElementById("portfolioEmail").value = data.email || "";

        document.getElementById("portfolioMobile").value = data.mobile || "";

        document.getElementById("portfolioLocation").value = data.location || "";

        document.getElementById("portfolioGithub").value = data.github || "";

        document.getElementById("portfolioLinkedin").value = data.linkedin || "";

        document.getElementById("portfolioResume").value = data.resume || "";

    }

    catch(error){

        console.log(error);

    }

}

// =========================
// SAVE PORTFOLIO
// =========================

document.getElementById("portfolioForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const portfolio = {

        name: document.getElementById("portfolioName").value,

        role: document.getElementById("portfolioRole").value,
        heroDescription:
        document.getElementById("heroDescription").value,

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

        resume: document.getElementById("portfolioResume").value

    };

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