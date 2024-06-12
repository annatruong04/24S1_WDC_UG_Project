// PROFILE DROPDOWN
const profile = document.querySelector('.body-container-profile nav .profile');
const imgProfile = profile.querySelector('.body-container-profile img');
const dropdownProfile = profile.querySelector('.body-container-profile .profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
});