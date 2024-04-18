'strict';


//
// change the login button to user menu
const updateLoginButton = function () {
    console.log(updateLoginButton);
    const loginBtn = document.getElementById('loginBtn');

    axios.get('/sessionCheck')
        .then((response) => {

            if (response.data.signedIn) {
                loginBtn.innerHTML = `
            <button class="btn btn-outline-theme-primary me-2 dropdown-toggle dropdown-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                User
            </button>
            <ul class="dropdown-menu dropdown-menu" aria-labelledby="userDropdown">
                <li><a class="dropdown-item" href="/profile.html">Profile</a></li>
                <li><a class="dropdown-item" href="/logout">Logout</a></li>
            </ul>
        `;
            }
        })
        .catch(error => { console.log(error) })
}
updateLoginButton()