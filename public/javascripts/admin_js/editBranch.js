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
        id: '',
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
        this.getQuerypara();
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
        getQuerypara(){
            const queryParams = new URLSearchParams(window.location.search);
            this.form.id = queryParams.get('id');
            this.form.name = queryParams.get('name');
            this.form.description = queryParams.get('description');
            this.form.location = queryParams.get('location');
            console.log(this.form.date);
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('id', this.form.id);
            formData.append('name', this.form.name);
            formData.append('location', this.form.location);
            formData.append('description', this.form.description);
            formData.append('email', this.form.manager);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/admin/edit/branches', true);

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
