var app = new Vue({
  el: "#mydiv",
  data: {
      clicked: false,
      loginStatus: true,
      user: []
  },
  mounted(){
    this.getUser();
  },
  methods: {
    getUser(){

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            var data = JSON.parse(xhttp.responseText);
            console.log(data);
            this.user = data;
          }
      };

      xhttp.open("get", "/auth/getUser", true);
      xhttp.send();
    },
    toggleDropdown() {
        this.clicked = !this.clicked;
    },
  }
});

var main_app = new Vue({
  el: "#app",
  data: {
    user: []
  },
  mounted: function(){
    this.getUser();
  },

  methods: {
    getUser(){

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            var data = JSON.parse(xhttp.responseText);
            console.log(data);
            this.user = data;
          }
      };

      xhttp.open("get", "/auth/getUser", true);
      xhttp.send();
    },
    LogOut(){
      window.location.href = `http://localhost:3000/auth/logout`;
    },
    Update() {
      // Navigate to the desired page
      window.location.href = 'updateUser.html';
      
    }

  }
});