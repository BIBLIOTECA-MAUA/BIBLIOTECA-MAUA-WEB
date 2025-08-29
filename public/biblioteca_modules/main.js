/**
 * Handles the setup of event listeners for community-related buttons on the community page.
 * No parameters.
 * Adds click event listeners to sign-in, sign-up, and recovery buttons to update the community content.
 */
const handleCommunity = async () => {
    try {
        const page = window.location.href.split("/").pop();
        if (page && page.toLowerCase() !== "community") {
            console.log("Not on community page, skipping community handler.");
        } else {
            const btn1 = document.getElementById("btn2SignIn");
            const btn2 = document.getElementById("btn2SignUp");
            const btn3 = document.getElementById("btn2Recovery");
            if (btn1) {
                btn1.addEventListener("click", (e) => {
                    const content = document.getElementById("box1");
                    content.innerHTML = "";
                    content.innerHTML = `<h2 class="display-4 fw-bold mb-5">Entre para nossa<span class="text-primary"> COMUNIDADE.</span></h2>`;
                });
            }
            if (btn2) {
                btn2.addEventListener("click", (e) => {
                    const content = document.getElementById("communityContent");
                    content.innerHTML = "";
                    content.innerHTML = `<h2 class="display-4 fw-bold mb-5">Entre para nossa<span class="text-primary">  SIGN-UP.</span></h2>`;
                });
            }
            if (btn3) {
                btn3.addEventListener("click", (e) => {
                    const content = document.getElementById("communityContent");
                    content.innerHTML = "";
                    content.innerHTML = `<h2 class="display-4 fw-bold mb-5">Entre para nossa<span class="text-primary"> SIGN-IN.</span></h2>`;
                });
            }
        }
    } catch (error) {
        console.error("Error fetching community data:", error);
    }
};

handleCommunity();
