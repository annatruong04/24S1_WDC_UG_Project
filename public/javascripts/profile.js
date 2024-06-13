var app = new Vue({
  el: "#mydiv",
  data: {
      clicked: false,
      loginStatus: true,
      user: [],
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
    user: [],
    updates: [],

  },
  mounted: function(){
    this.getUser();
    this.fetchUpdates();

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

    },
    fetchUpdates() {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          this.updates = JSON.parse(xhttp.responseText);
          console.log(this.updates);
        }
      };
      xhttp.open('GET', '/api/read/updates', true);
      xhttp.send();
    },
    sendEmail() {
      // Make an AJAX call to your server to send the email with the updates
      const xhttp = new XMLHttpRequest();
      xhttp.open('POST', '/send-email', true);
      xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhttp.send(JSON.stringify(this.updates));
    }

  }
});