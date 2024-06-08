var app = new Vue({
    el: "#mydiv",
    data: {
      clicked: false,
      loginStatus: false,
      user: [],
      userEvents: [],
      userBranches: [],
      showPopUp: false,
      imgErr: false,
      form: {
        name: '',
        location: '',
        date: '',
        description: ''
      }
    },
    created() {
      this.getUser();
      this.fetchUserEvents();
      this.fetchUserBranches();
    },
    methods: {
      toggleDropdown() {
        this.clicked = !this.clicked;
      },
      getUser() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
            var data = JSON.parse(xhttp.responseText);
            this.user = data;
            this.loginStatus = true;
          }
        };
        xhttp.open("GET", "/auth/getUser", true);
        xhttp.send();
      },
      fetchUserEvents() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/api/read/your_events", true);
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            this.userEvents = data;
            console.log(this.userEvents);
          }
        };
        xhttp.send();
      },
      fetchUserBranches() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/api/read/your_branches", true);
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            this.userBranches = data;
            console.log(this.userBranches);
          }
        };
        xhttp.send();
      },


      isUserInBranch(branchID) {
        return this.userBranches.some(item => item.BranchID === branchID);
      },
      async leave(branchID) {
        try {
          await fetch(`/api/leave/branches/${branchID}`);
          this.fetchUserBranches();
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      },
      async cancelRsvp(eventID) {
        try {
          await fetch(`/api/leave/event/${eventID}`);
          this.fetchUserEvents();
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      },
      formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
      },
      formatTime(time) {
        if (!time) return '';
        const t = new Date(time);
        return `${t.getUTCHours()}:${t.getUTCMinutes()}`;
      }
    }
  });
