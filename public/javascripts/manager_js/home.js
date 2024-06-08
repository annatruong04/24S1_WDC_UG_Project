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
    updates: [],
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
  computed: {
    truncatedUpdates() {
      return this.updates.map(update => {
        return {
          ...update,
          truncatedMessage: this.truncateMessage(update.Message, 19), // Adjust the number of words as needed
        };
      });
    }
  },
  mounted: function() {
    this.fetch_event();
    this.getUser();
    this.fetch_member();
    this.fetch_update();
  },
  methods: {
    sanitizeHTML(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const allowedTags = ['b', 'i', 'u', 'p', 'strong', 'em', 'br'];
      const walkDOM = (node) => {
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (child.nodeType === 1 && !allowedTags.includes(child.tagName.toLowerCase())) {
            child.replaceWith(...child.childNodes);
            i--;
          } else if (child.nodeType === 1) {
            walkDOM(child);
          }
        }
      };
      walkDOM(doc.body);
      return doc.body.innerHTML;
    },
    fetch_update() {
      var xhttp = new XMLHttpRequest();

      xhttp.open("GET", "/api/manager/read/updates", true);

      xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
              var data = JSON.parse(xhttp.responseText);
              this.updates = data;
              console.log(this.updates);
          }
      };

      xhttp.send();
    },
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
    directUpdate(update) {
      const queryParams = new URLSearchParams({
        id: update.UpdateID,
        // Add other update details as needed
      }).toString();

      window.location.href = `http://localhost:3000/manager/update-detail.html?${queryParams}`;
    },
    truncateMessage(message, wordLimit) {
      const words = message.split(' ');
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
      }
      return message;
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