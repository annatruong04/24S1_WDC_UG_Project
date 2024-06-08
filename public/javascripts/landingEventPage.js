var appdiv = new Vue({
    el: "#user-event-page",
    data: {
    User_Event: [],
      events: [],
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
      this.fetch_event();
      this.fetch_User_Events();
    },
    methods: {
      fetch_event() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/read/events", true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var data = JSON.parse(xhttp.responseText);
                console.log(data[0]["EventID"]);
                this.events = data;
                console.log(this.events);
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
            console.log(this.User_Event);
          }
        };

        xhttp.send();
      },
      async join(EventID) {
        try {
          const [eventsResponse, userResponse] = await Promise.all([
            fetch(`/api/join/events/${EventID}`),
            fetch("/auth/getUser")
          ]);

          if (!eventsResponse.ok || !userResponse.ok) {
            throw new Error('Network response was not ok');
          }

          const eventsData = await eventsResponse.json();
          const userData = await userResponse.json();

          console.log("Events:", eventsData);
          console.log("User:", userData);

          this.fetch_User_Events();
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      window.location.href = `http://localhost:3000/landingEventPage.html`;

      },
      async leave(EventID) {
        try {
          const [eventsResponse, userResponse] = await Promise.all([
            fetch(`/api/leave/events/${EventID}`),
            fetch("/auth/getUser")
          ]);

          if (!eventsResponse.ok || !userResponse.ok) {
            throw new Error('Network response was not ok');
          }

          const eventsData = await eventsResponse.json();
          const userData = await userResponse.json();

          console.log("Events:", eventsData);
          console.log("User:", userData);

          this.fetch_User_Events();
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
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
          // Add other event details as needed
        }).toString();

        window.location.href = `http://localhost:3000/EventDescription.html?${queryParams}`;
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