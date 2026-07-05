const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    try{

        const response = await fetch(
            "http://personal-portfolio-website-923p.onrender.com/api/admin/login",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    username,
                    password
                })

            }
        );

        const data = await response.json();

        if(!response.ok){

            alert(data.message);

            return;

        }

        // Save JWT Token

        localStorage.setItem("token", data.token);

        // Redirect

        window.location.href = "admin.html";

    }

    catch(error){

        console.log(error);

        alert("Unable to connect to server");

    }

});