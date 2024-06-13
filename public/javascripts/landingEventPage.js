var appdiv = new Vue({
    el: "#user-event-page",
    data: {
    User_Branch: [],
    User_Event: [],
      events: [],
      showPopUp: false,
      imgErr: false,
      form: {
        name: '',
        location: '',
        date: '',
        description: ''
      },
      filteredEvents: [],
      query_name: '',
      query_location: '',
      showSearch: false,
    },
    mounted: function() {
      this.fetch_event();
      this.fetch_User_Events();
      this.fetch_User_Branch();

    },
    methods: {
      search() {
        const query_name = this.query_name ? this.query_name.toLowerCase() : "";
        const query_location = this.query_location ? this.query_location.toLowerCase() : "";
        if (query_name && query_location) {
          this.filteredEvents = this.events.filter(event => {
            return event.Name.toLowerCase().includes(query_name) ||
                   event.Location.toLowerCase().includes(query_location);
          });
        }
        else if (query_name && !query_location){
          this.filteredEvents = this.events.filter(event => {
            return event.Name.toLowerCase().includes(query_name);
          });
        } else if (!query_name && query_location) {
          this.filteredEvents = this.events.filter(event => {
            return event.Location.toLowerCase().includes(query_location);
          });
        } else{
          this.filteredEvents = this.events;
        }
        this.showSearch = true;
      },
      fetch_event() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/read/events", true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var data = JSON.parse(xhttp.responseText);
                this.events = data;
            }
        };

        xhttp.send();
      },
      fetch_User_Events() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/read/User_Events", true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            this.User_Event = data;
          }
        };

        xhttp.send();
      },
      fetch_User_Branch() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/read/User_Branch", true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            this.User_Branch = data;
          }
        };

        xhttp.send();
      },
      // async join(EventID) {
      //   try {
      //     const [eventsResponse, userResponse] = await Promise.all([
      //       fetch(`/api/join/events/${EventID}`),
      //       fetch("/auth/getUser")
      //     ]);

      //     if (!eventsResponse.ok || !userResponse.ok) {
      //       throw new Error('Network response was not ok');
      //     }

      //     const eventsData = await eventsResponse.json();
      //     const userData = await userResponse.json();

      //     console.log("Events:", eventsData);
      //     console.log("User:", userData);

      //     this.fetch_User_Events();
      //   } catch (error) {
      //     console.error('There was a problem with the fetch operation:', error);
      //   }
      // window.location.href = `http://localhost:3000/landingEventPage.html`;

      // },
      // async leave(EventID) {
      //   try {
      //     const [eventsResponse, userResponse] = await Promise.all([
      //       fetch(`/api/leave/events/${EventID}`),
      //       fetch("/auth/getUser")
      //     ]);

      //     if (!eventsResponse.ok || !userResponse.ok) {
      //       throw new Error('Network response was not ok');
      //     }

      //     const eventsData = await eventsResponse.json();
      //     const userData = await userResponse.json();

      //     console.log("Events:", eventsData);
      //     console.log("User:", userData);

      //     this.fetch_User_Events();
      //   } catch (error) {
      //     console.error('There was a problem with the fetch operation:', error);
      //   }
      // },

      leave(EventID) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {

        window.location.href = `http://localhost:3000/landingEventPage.html`;

            } else {
              console.error('There was a problem with the fetch operation:', xhttp.responseText);
            }
          }
        };
        xhttp.open('GET', `/api/leave/events/${EventID}`, true);
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send();
      },
      join(EventID, BranchID) {
        // Check if the user is in the branch of the event
        var isUserInBranch = this.User_Branch.some(userBranch => userBranch.BranchID === BranchID);

        if (!isUserInBranch) {
          alert("Cannot join the event because the user is not in that branch.");
        } else {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = () => {
            if (xhttp.readyState === 4) {
              if (xhttp.status === 200) {
                window.location.href = `http://localhost:3000/landingEventPage.html`;
              } else {
                console.error('There was a problem with the fetch operation:', xhttp.responseText);
              }
            }
          };
          xhttp.open('get', `/api/join/events/${EventID}`, true);
          xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          xhttp.send();
        }
      },




      isUserInEvent(eventID) {
        return this.User_Event.some(item => item.EventID === eventID);
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
};