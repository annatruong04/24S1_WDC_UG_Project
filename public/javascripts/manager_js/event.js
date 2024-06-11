var appdiv = new Vue({
    el: "#manager-home-page",
    data: {
      events: [],
      filteredEvents: [],
      showPopUp: false,
      imgErr: false,
      form: {
        name: '',
        location: '',
        date: '',
        description: ''
      },
      query_name: '',
      query_location: '',
      showSearch: false,
    },
    mounted: function() {
      this.fetch_event();
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
        console.log(this.filteredEvents);
      },
      fetch_event() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/manager/read/events", true);

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
      directEvent(event) {
        const queryParams = new URLSearchParams({
          id: event.EventID,
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
        xhr.open("POST", '/api/manager/create/events', true);
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
      gotoCreateEvent(){
        window.location.href = `http://localhost:3000/manager/addEvent.html`;
      },
      deleteEvent(EventID, EventName){
        if (window.confirm(`Are you sure you want to delete ${EventName}?`)) {
          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                  window.location.href = `http://localhost:3000/manager/Event.html`;
                  console.log("Delete Event successfull");
              }
          };
          xhttp.open("post", "/api/manager/delete/events", true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(JSON.stringify({eventID: EventID}));
      }
    },
    editEvent(event){
      const queryParams = new URLSearchParams({
        id: event.EventID,
        name: event.Name,
        description: event.Description,
        date: event.Date,
        location: event.Location,
        // Add other event details as needed
      }).toString();

      window.location.href = `http://localhost:3000/manager/editEvent.html?${queryParams}`;
    }
  }
});

window.onload = function () {
    var app = new Vue({
      el: "#mydiv-event",
      data: {
        clicked: false
      },
      methods: {
        toggleDropdown() {
          console.log(this.clicked);
          this.clicked = !this.clicked;
        }
      }
    });
  }