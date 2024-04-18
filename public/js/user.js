'use strict';


// Edit user profile 
const editProfile = document.getElementById('editProfile');


// Event listener to profile button
editProfile.addEventListener('click', async (event) => {
    const profileView = document.getElementById('profileView');
    profileView.classList.add('hidden');

    const profileEdit = document.getElementById('profileEdit');
    profileEdit.classList.remove('hidden');
});

const saveButton = document.getElementById('saveProfile');

saveButton.addEventListener('click', async (event) => {

    console.log('edit user profile button clicked')

    const nameText = document.getElementById('nameInput');
    const cityText = document.getElementById('cityInput');

    const editUser = {
        name: nameText.value,
        city: cityText.value
    };

    try {
        await axios.put('/profile', editUser)
            .then((response) => {
                console.log('profile fields updated')
                console.log(response)
                document.getElementById('nameText').innerText = response.data[0].name
                document.getElementById('cityText').innerText = response.data[0].city
            })
        console.log('user profile updated')
    } catch (error) {
        console.log('Did not update user profile', error);
    }

    const profileView = document.getElementById('profileView');
    profileView.classList.remove('hidden');

    const profileEdit = document.getElementById('profileEdit');
    profileEdit.classList.add('hidden');


});




