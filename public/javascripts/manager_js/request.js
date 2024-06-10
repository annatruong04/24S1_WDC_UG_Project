var appdiv = new Vue({
    el: "#manager-page",
    data: {
      requests: [],
    },
    mounted: function() {
      this.fetch_BranchRequest();
    },
    methods: {
    fetch_BranchRequest(){
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/manager/read/BranchRequest", true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);

            this.requests = data;
            console.log(this.requests);
          }
        };
        xhttp.send();
      },
      approve(requestID){
        var xhttp = new XMLHttpRequest();

        xhttp.open("post", "/api/manager/approve/BranchRequest", true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.href = `http://localhost:3000/manager/Request.html`;
          }
        };
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send(JSON.stringify({
          RequestID: requestID
        }));
      },
      reject(requestID){
        var xhttp = new XMLHttpRequest();

        xhttp.open("post", "/api/manager/reject/BranchRequest", true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.href = `http://localhost:3000/manager/Request.html`;
          }
        };
        xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhttp.send(JSON.stringify({
          RequestID: requestID
        }));
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