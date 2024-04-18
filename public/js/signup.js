'use strict';

// sign up form
const signUp = document.getElementById('sign-up');
console.log(signUp)

signUp.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('sign up form')

    const nameInput = document.getElementById('floatingName');
    const emailInput = document.getElementById('floatingInput');
    const passwordInput = document.getElementById('floatingPassword');

    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    try {
        await axios.post('/signup', userData);
        console.log('new user created successfully');
        // redirect to the profile page if created successfully
        window.location.href = "/profile.html"
    } catch (error) {
        console.log('Error signing up user', error);
    }
});
