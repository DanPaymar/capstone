'use strict';

// sign up form
const login = document.getElementById('login');
const loginBtn = document.getElementById('loginBtn')


login.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('login up form')

    const emailInput = document.getElementById('floatingInput');
    const passwordInput = document.getElementById('floatingPassword');

    const userData = {
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        const response = await axios.post('/login', userData);
        console.log('new user created successfully');
        // Redirect to the profile page after updating the UI
        window.location.href = "/profile.html";
    }
    catch (error) {
        console.log('Error signing up user', error);
    }



});



