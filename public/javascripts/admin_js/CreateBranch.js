// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
});


var appdiv = new Vue({
    el: "#mydiv",
    data: {
      Branches: [],
      form: {
        name: '',
        location: '',
        date: '',
        description: '',
        manager: ''
      },
      filteredBranches: [],
      query_name: '',
      showSearch: false,
    },
    mounted: function () {
    },
    computed: {
        truncatedBranches() {
          return this.Branches.map(Branch => {
            return {
              ...Branch,
              truncatedMessage: this.truncateMessage(Branch.Description, 19), // Adjust the number of words as needed
            };
          });
        }
    },
    methods: {
        async submitForm() {
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('location', this.form.location);
            formData.append('description', this.form.description);
            formData.append('email', this.form.manager);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/admin/create/branches', true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    alert('Create new Branch Successfully');
                    window.location.href = `http://localhost:3000/admin/Branches.html`;
                } else {
                    console.error('The request failed:', xhr.statusText);
                }
            };

            xhr.onerror = () => {
                console.error('Network error');
            };

            xhr.send(formData);  // Send FormData instead of JSON
        },
    }
  });
