const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try{
        const response = await fetch(
            "https://personal-portfolio-website-923p.onrender.com/api/admin/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );
        const data = await response.json();
        if(!response.ok){
            alert(data.message);
            return;
        }
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("showDashboardPopup", "true");
        window.location.href = "admin.html";
    }
    catch(error){

        console.log(error);
        alert("Unable to connect to server");
    }
});