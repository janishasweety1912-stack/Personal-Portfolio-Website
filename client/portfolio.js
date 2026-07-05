// ===============================
// LOAD PORTFOLIO DATA
// ===============================

async function loadPortfolio() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/portfolio"
        );

        if (!response.ok) {
            throw new Error("Failed to load portfolio data");
        }

        const data = await response.json();

        // =========================
        // HOME SECTION
        // =========================

        const heroName = document.getElementById("heroName");
        const heroRole = document.getElementById("heroRole");
        const heroDescription = document.getElementById("heroDescription");
        const heroDescription2 = document.getElementById("heroDescription2");

        if (heroName) heroName.textContent = data.name || "";
        if (heroRole) heroRole.textContent = data.role || "";
        if (heroDescription) heroDescription.textContent = data.heroDescription || "";
        if (heroDescription2) heroDescription2.textContent = data.heroDescription2 || "";

        // =========================
        // ABOUT SECTION
        // =========================

        const aboutText = document.getElementById("aboutText");
        const aboutText2 = document.getElementById("aboutText2");
        const aboutText3 = document.getElementById("aboutText3");
        const aboutText4 = document.getElementById("aboutText4");

        if (aboutText) aboutText.textContent = data.about || "";
        if (aboutText2) aboutText2.textContent = data.about2 || "";
        if (aboutText3) aboutText3.textContent = data.about3 || "";
        if (aboutText4) aboutText4.textContent = data.about4 || "";

    }

    catch (error) {

        console.error("Portfolio Load Error:", error);

    }

}

// ===============================
// LOAD WHEN PAGE OPENS
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadPortfolio();

});