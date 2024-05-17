var appdiv = new Vue({
    el: "#manager-home-page",
    data: {
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
  
      directEvent(event) {
        const queryParams = new URLSearchParams({
          name: event.Name,
          description: event.Description,
          date: event.Date,
          location: event.Location,
          // Add other event details as needed
        }).toString();
      
        window.location.href = `http://localhost:3000/manager_page/event-description.html?${queryParams}`;
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