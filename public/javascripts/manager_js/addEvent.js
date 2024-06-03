var appdiv = new Vue({
    el: "#manager-home-page",
    data: {
        imgErr: false,
        form: {
            name: '',
            location: '',
            date: '',
            description: '',
            image: ''
        }
    },
    mounted: function() {
    },
    methods: {
        async submitForm() {
            const formData = new FormData();
            formData.append('name', this.form.name);
            formData.append('location', this.form.location);
            formData.append('date', this.form.date);
            formData.append('description', this.form.description);
            formData.append('image', this.$refs.image.files[0]);  // Add the file to FormData

            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/manager/create/events', true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    window.location.href = `http://localhost:3000/manager/Event.html`;
                    alert('Add event Successfully');
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