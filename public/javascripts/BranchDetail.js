var appdiv = new Vue ({
    el: "#app",
    data: {
        updates: [],
        User_Branch: [],
        id: '',
        name: '',
        description: '',
        location: '',
        MemberCount: '',
        events: [],
    },
    mounted: function() {
        this.getQuerypara();
        this.fetch_update();
        this.fetch_event();
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
        truncateMessage(message, wordLimit) {
            const words = message.split(' ');
            if (words.length > wordLimit) {
              return words.slice(0, wordLimit).join(' ') + '...';
            }
            return message;
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
        directUpdate(update) {
          const queryParams = new URLSearchParams({
            id: update.UpdateID,
            // Add other update details as needed
          }).toString();

          window.location.href = `http://localhost:3000/updateDetail.html?${queryParams}`;
        },
        getQuerypara(){
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", `/api/read/branches/${queryParams.get('id')}`, true);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var data = JSON.parse(xhttp.responseText);

                    this.id = data[0]['BranchID'];
                    this.name = data[0]['Branch_name'];
                    this.description = data[0]['Description'];
                    this.location = data[0]['Location'];
                    this.MemberCount = data[0]['MemberCount'];

                }
            };
            xhttp.send();
        },
        fetch_update() {
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();
            console.log(this.id);

            xhttp.open("GET", `/api/read/updates/${queryParams.get('id')}`, true);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var data = JSON.parse(xhttp.responseText);
                    this.updates = data;
                    console.log(this.updates);
                }
            };
            xhttp.send();
          },
          fetch_event() {
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", `/api/read/branches/events/${queryParams.get('id')}`, true);

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
        getDaySuffix(day) {
          if (day > 3 && day < 21) return 'th';
          switch (day % 10) {
              case 1:  return 'st';
              case 2:  return 'nd';
              case 3:  return 'rd';
              default: return 'th';
          }
      },
        formatDate(inputDate) {
          const date = new Date(inputDate);

          const day = date.getDate();
          const month = date.toLocaleString('default', { month: 'long' });

          const daySuffix = this.getDaySuffix(day);

          return `${day}${daySuffix}, ${month}`;
        },
    }
});

var app = new Vue({
    el: "#mydiv",
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
