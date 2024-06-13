var app = new Vue({
  el: "#app",
  data: {
    user: {
      First_name: '',
      Last_name: '',
      Phone_number: '',
      Email: '',
      Password: '',
      Receive_noti: 0
    },
    confirmPassword: '',
    invalid: false,
    invalidMessage: '',
    Receive_noti: false
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            var data = JSON.parse(xhttp.responseText);
            console.log(data); // Debugging to check the data structure
            this.user.First_name = data.First_name || '';
            this.user.Last_name = data.Last_name || '';
            this.user.Phone_number = data.Phone_num || '';
            this.user.Email = data.Email || '';
            this.user.Password = data.Password || ''; // Clear password fields
            this.confirmPassword = '';
          } else {
            console.error('Failed to fetch user data');
          }
        }
      };

      xhttp.open("get", "/auth/getUser", true);
      xhttp.send();
    },
    updateUser() {


      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
    this.getUser();
    setTimeout(() => {
      window.location.href = `http://localhost:3000/user/profile.html`;
    }, 500);

          } else {
            this.invalid = true;
            this.invalidMessage = 'Failed to update user information';
          }
        }
      };

      if (this.Receive_noti) {
        this.user.Receive_noti = 1;
      }

      xhttp.open("post", "/auth/updateUser", true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(JSON.stringify(this.user));
    }

  }
});
