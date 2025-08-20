const params = new URLSearchParams(window.location.search);
document.getElementById("name").textContent = params.get("name");
document.getElementById("email").textContent = params.get("email");