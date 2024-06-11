var appdiv = new Vue({
    el: "#manager-page",
    data: {
      updates: [],
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
      this.fetch_update();
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
      gotoPostUpdate(){
        window.location.href = `http://localhost:3000/manager/postUpdate.html`;
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
      el: "#mydiv",
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