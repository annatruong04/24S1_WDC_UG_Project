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
      },
      my_user: [],
      newUserEmail: ""
    },
    mounted: function() {
      this.fetch_users();
      this.getUser();
    },
    computed: {
      console: () => console,
      window: () => window,
    },
    methods: {
      fetch_users() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/manager/read/users", true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var data = JSON.parse(xhttp.responseText);
                console.log(data);
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
      deleteUser(UserID,UserName){
        if (window.confirm(`Are you sure you want to delete ${UserName}?`)) {
          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                  console.log(xhttp.responseText);
                  window.location.href = `http://localhost:3000/manager/Member.html`;
                  console.log("Delete successfull");
              }
          };
          xhttp.open("post", "/api/manager/delete/user", true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(JSON.stringify({userID: UserID}));
        }
      },
      getUser(){
          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                  var data = JSON.parse(xhttp.responseText);
                  this.my_user = data;
                  this.loginStatus = true;
              }
          };

          xhttp.open("get", "/auth/getUser", true);
          xhttp.send();
      },
      addMember(){
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                window.location.href = `http://localhost:3000/manager/Member.html`;
                console.log("Add new member successful successfull");
            }
        };
        xhttp.open("post", "/api/manager/add/user", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({userEmail: this.newUserEmail}));
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