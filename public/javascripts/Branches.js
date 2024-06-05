var appdiv = new Vue({
    el: "#user-event-page",
    data: {
      Branches: [],
      showPopUp: false,
      imgErr: false,
      form: {
        name: '',
        location: '',
        date: '',
        description: ''
      }
    },
    mounted: function() {
      this.fetch_Branch();
    },
    methods: {
      fetch_Branch() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/read/Branches", true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var data = JSON.parse(xhttp.responseText);
                console.log(data[0]["BranchID"]);
                this.Branches = data;
                console.log(this.Branches);
            }
        };

        xhttp.send();
      },

      directEvent(event) {
        const queryParams = new URLSearchParams({
          name: event.Name,
          description: event.Description,
          date: event.Date,
          location: event.Location,
          // Add other event details as needed
        }).toString();

        window.location.href = `http://localhost:3000/manager/event-description.html?${queryParams}`;
      },
      popup(){
        this.showPopUp = true;
      },
      async submitForm() {
        console.log(this.form);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/api/create/events', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {

            alert('Data submitted successfully');
          } else {

            console.error('The request failed:', xhr.statusText);
          }
        };


        xhr.onerror = () => {
          console.error('Network error');
        };


        xhr.send(JSON.stringify(this.form));
      },
      join(){
        
      }
    }
});

window.onload = function () {
    var app = new Vue({
        el: "#mydiv-login",
        data: {
            clicked: false,
            loginStatus: false,
            user: []
        },
        mounted(){
            this.getUser();
        },
        methods: {
            toggleDropdown() {
                this.clicked = !this.clicked;
            },
            getUser(){
                var xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState === 4 && xhttp.status === 200) {
                        var data = JSON.parse(xhttp.responseText);
                        this.user = data;
                        this.loginStatus = true;
                    }
                };

                xhttp.open("get", "/auth/getUser", true);
                xhttp.send();
            }
        }
    });
}