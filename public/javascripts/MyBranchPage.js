window.onload = function () {
  var app = new Vue({
      el: "#login-div",
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
      },

    },
    created() {
      this.getUser();
      this.fetchUserEvents();
      this.fetchUserBranches();
    },
    computed: {
      truncatedBranches() {
        return this.userBranches.map(branch => {
          return {
            ...branch,
            truncatedDescription: this.truncateMessage(branch.Description, 10), // Adjust the number of words as needed
          };
        });
      },
      truncatedEvents() {
        return this.userEvents.map(event => {
          return {
            ...event,
            truncatedDescription: this.truncateMessage(event.Description, 10), // Adjust the number of words as needed
          };
        });
      }
    },
    methods: {
      directBranch(branch) {
        const queryParams = new URLSearchParams({
          id: branch.BranchID,
          name: branch.Branch_name,
          description: branch.Description,
          date: branch.Date,
          location: branch.Location,
          // Add other branch details as needed
      }).toString();

        window.location.href = `http://localhost:3000/BranchDetail.html?${queryParams}`;
      },
      directEvent(event) {
        const queryParams = new URLSearchParams({
          id: event.EventID,
          name: event.Name,
          description: event.Description,
          date: event.Date,
          location: event.Location,
          BranchID: event.BranchID
          // Add other event details as needed
        }).toString();

        window.location.href = `http://localhost:3000/EventDescription.html?${queryParams}`;
      },
      truncateMessage(message, wordLimit) {
        const words = message.split(' ');
        if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(' ') + '...';
        }
        return message;
    },
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
      // async leave(branchID) {
      //   try {
      //     await fetch(`/api/leave/branches/${branchID}`);
      //     this.fetchUserBranches();
      //   } catch (error) {
      //     console.error('There was a problem with the fetch operation:', error);
      //   }
      // },
      // async cancelRsvp(eventID) {
      //   try {
      //     await fetch(`/api/leave/event/${eventID}`);
      //     this.fetchUserEvents();
      //   } catch (error) {
      //     console.error('There was a problem with the fetch operation:', error);
      //   }
      // },

      leave(branchID) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
              this.fetchUserBranches();
              window.location.href = 'http://localhost:3000/user/myBranchPage.html';

            } else {
              console.error('There was a problem with the fetch operation:', xhttp.responseText);
            }
          }
        };
        xhttp.open('GET', `/api/leave/branches/${branchID}`, true);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send();
      },
      cancelRsvp(eventID) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
              this.fetchUserEvents();
              window.location.href = 'http://localhost:3000/user/myBranchPage.html';

            } else {
              console.error('There was a problem with the fetch operation:', xhttp.responseText);
            }
          }
        };
        xhttp.open('GET', `/api/leave/event/${eventID}`, true);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send();
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
