var appdiv = new Vue({
    el: "#manager-page",
    data: {
      users: [],
      showPopUp: false,
      form: {
        name: '',
        location: '',
        date: '',
        description: ''
      }
    },
    mounted: function() {
      this.fetch_users();
    },
    methods: {
      fetch_users() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/read/users", true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var data = JSON.parse(xhttp.responseText);
                this.users = data;
            }
        };

        xhttp.send();
      },

      directUser(users) {
        const queryParams = new URLSearchParams({
          name: users.Name,
          description: users.Description,
          date: users.Date,
          location: users.Location,
          // Add other users details as needed
        }).toString();

        window.location.href = `http://localhost:3000/users-description.html?${queryParams}`;
      },
      deleteUser(Username){
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                console.log(xhttp.responseText);
                window.location.href = `http://localhost:3000/manager/Member.html`;
                console.log("Delete successfull");
            }
        };
        xhttp.open("post", "/api/delete/user", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({username: Username}));

      }
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
          this.clicked = !this.clicked;
        }
      }
    });
  }