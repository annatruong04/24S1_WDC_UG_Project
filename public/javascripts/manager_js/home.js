// var popup_event = () => {
//     var popup_div = document.getElementById("popupbox-event");
//     popup_div.style.display = "block";
// };
// var close_popup = () => {
//     var popup_div = document.getElementById("popupbox-event");
//     popup_div.style.display = "none";
// }

// var table = document.getElementById("table");
// table.addEventListener("click", popup_event);

// var close_btn = document.getElementById("closePopup");
// close_btn.addEventListener("click", close_popup);

// document.getElementById("popupbox-event").addEventListener("click", function(event) {
//     if (event.target == this) {
//       this.style.display = "none";
//     }
// });

// document.getElementById("close-icon").addEventListener("click", function() {
//     document.getElementById("popupbox-event").style.display = "none";
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const rows = document.querySelector("#table tbody").getElementsByTagName("tr");

//     for (const row of rows) {
//       row.addEventListener("click", function() {
//         const url = this.getAttribute("data-href");
//         if (url) {
//           window.location.href = url;
//         }
//       });
//     }
// });

// var xhttp = new XMLHttpRequest();

// xhttp.open("GET", "/api/events", true);

// xhttp.onreadystatechange = function () {
//     if (xhttp.readyState == 4 && xhttp.status == 200) {
//         var data = JSON.parse(xhttp.responseText);
//         console.log(data[0]["EventID"]);
//         const table = document.getElementById('table');

//         data.forEach(event => {
//             const row = table.insertRow();
//             const nameCell = row.insertCell(0);
//             const numCell = row.insertCell(1)
//             const dateCell = row.insertCell(2);
//             const locationCell = row.insertCell(3);
//             nameCell.textContent = event.name;
//             numCell.textContent = event.number;
//             dateCell.textContent = event.date;
//             locationCell.textContent = event.location;
//             row.addEventListener('click', () => {
//               const queryParams = new URLSearchParams({
//                   description: event.description,
//                   location: event.location,
//                   // Add other event details as needed
//               }).toString();

//               window.location.href = `http://localhost:3000/event-description.html?${queryParams}`;
//           });
//           row.style
//         });
//     }
// };



// // Sending the request
// xhttp.send();





var appdiv = new Vue({
  el: "#manager-page",
  data: {
    events: [],
    showPopUp: false,
    form: {
      name: '',
      location: '',
      date: '',
      description: '',
    },
    user: [],
    members: []
  },
  mounted: function() {
    this.fetch_event();
    this.getUser();
    this.fetch_member();
  },
  methods: {
    getUser(){
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = () => {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
              var data = JSON.parse(xhttp.responseText);
              console.log(data);
              this.user = data;
          }
      };

      xhttp.open("get", "/auth/getUser", true);
      xhttp.send();
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
        name: event.Name,
        description: event.Description,
        date: event.Date,
        location: event.Location,
        // Add other event details as needed
      }).toString();

      window.location.href = `http://localhost:3000/event-description.html?${queryParams}`;
    },
    popup(){
      this.showPopUp = true;
    },
    fetch_member() {
      var xhttp = new XMLHttpRequest();

      xhttp.open("GET", "/api/manager/read/users", true);

      xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
              var data = JSON.parse(xhttp.responseText);
              console.log(data);
              this.members = data;
          }
      };

      xhttp.send();
    },
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