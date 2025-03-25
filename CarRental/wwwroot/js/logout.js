function logoutUser() {
    fetch('/Guest/Account/Logout', {
        method: 'POST', // Use POST para mas secure
        credentials: 'include' // Para maisama ang session cookies
    })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url; // Redirect sa login page
            } else {
                return response.text();
            }
        })
        .then(data => {
            console.log("Logout Response:", data);
            window.location.href = "/Guest/Account/Login"; // Redirect manually kung di auto-redirect
        })
        .catch(error => console.error('Logout Error:', error));
}
