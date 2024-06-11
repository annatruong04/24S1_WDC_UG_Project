var appdiv = new Vue ({
    el: "#mydiv",
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
      fetch_update() {
        const queryParams = new URLSearchParams(window.location.search);
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", `/api/read/updates/`, true);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var data = JSON.parse(xhttp.responseText);
                this.updates = data;
                console.log(this.updates);
            }
        };
        xhttp.send();
      },
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
        directUpdate(update) {
          const queryParams = new URLSearchParams({
            id: update.UpdateID,
            // Add other update details as needed
          }).toString();

          window.location.href = `http://localhost:3000/updateDetail.html?${queryParams}`;
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
    el: "#header-div",
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
