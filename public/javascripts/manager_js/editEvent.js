var appdiv = new Vue ({
    el: "#manager-home-page",
    data: {
        form: {
            id: '',
            name: '',
            location: '',
            date: '',
            description: '',
            image: ''
        }
    },
    mounted: function() {
        this.getQuerypara();
    },
    methods: {
        getQuerypara(){
            const queryParams = new URLSearchParams(window.location.search);
            this.form.id = queryParams.get('id');
            this.form.name = queryParams.get('name');
            this.form.description = queryParams.get('description');

            const date = new Date(queryParams.get('date'));
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const day = String(date.getUTCDate()).padStart(2, '0');

            this.form.date = `${year}-${month}-${day}`;

            this.form.location = queryParams.get('location');
            console.log(this.form.date);
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('id', this.form.id);
            formData.append('name', this.form.name);
            formData.append('location', this.form.location);
            formData.append('date', this.form.date);
            formData.append('description', this.form.description);
            formData.append('image', this.$refs.image.files[0]);  // Add the file to FormData

            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/manager/edit/events', true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    window.location.href = `http://localhost:3000/manager/Event.html`;
                    alert('Edit event Successfully');
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

window.onload = function () {
    var app = new Vue({
      el: "#mydiv",
      data: {
        clicked: false
      },
      methods: {
        toggleDropdown() {
          console.log(this.clicked);
          this.clicked = !this.clicked;
        }
      }
    });
  }