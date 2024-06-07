var appdiv = new Vue({
    el: "#manager-home-page",
    data: {
        imgErr: false,
        Title: '',
        Message: '',
        Branch_name: ''
    },
    mounted: function() {
        this.getQuerypara();
    },
    methods: {
        getQuerypara(){
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", `/api/manager/read/updates/${queryParams.get('id')}`, true);

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