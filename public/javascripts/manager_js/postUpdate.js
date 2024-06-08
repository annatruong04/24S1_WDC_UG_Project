var appdiv = new Vue({
    el: "#manager-home-page",
    data: {
        imgErr: false,
        form: {
            Title: '',
            Message: '',
            Type: '',
        }
    },
    mounted: function() {
    },
    methods: {
        updateMessage(event) {
            this.form.Message = event.target.innerHTML;
        },
        async submitForm() {
            const formData = new FormData();

            formData.append('Title', this.form.Title);
            formData.append('Message', this.form.Message);
            formData.append('Type', this.form.Type);

            for (var pair of formData.entries()) {
                console.log(pair[0]+ ': ' + pair[1]);
            }

            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/api/manager/create/updates', true);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    window.location.href = `http://localhost:3000/manager/Update.html`;
                    alert('Add update Successfully');
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