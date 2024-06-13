var appdiv = new Vue({
    el: "#user-event-page",
    data: {
      Title: '',
      Message: '',
      Branch_name: '',
      showPopUp: false,
      imgErr: false,
      form: {
        name: '',
        location: '',
        date: '',
        description: ''
      }
    },
    mounted: function () {
      this.getQuerypara();
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
          getQuerypara(){
              const queryParams = new URLSearchParams(window.location.search);
              var xhttp = new XMLHttpRequest();

              xhttp.open("GET", `/api/read/updates-detail/${queryParams.get('id')}`, true);

              xhttp.onreadystatechange = () => {
                  if (xhttp.readyState == 4 && xhttp.status == 200) {
                      var data = JSON.parse(xhttp.responseText);
                      console.log(data);
                      this.Title = data[0]['Title'];
                      this.Message = data[0]['Message'];
                      this.Branch_name = data[0]['Branch_name'];
                  }
              };

              xhttp.send();
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
      mounted() {
        this.getUser();
      },
      methods: {
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

          xhttp.open("get", "/auth/getUser", true);
          xhttp.send();
        }
      }
    });
  }