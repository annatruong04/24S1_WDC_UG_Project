var appdiv = new Vue ({
    el: "#app",
    data: {
        name: '',
        description: '',
        date: '',
        location: '',
    },
    mounted: function() {
        this.getQuerypara();
    },
    methods: {
        getQuerypara(){
            const queryParams = new URLSearchParams(window.location.search);
            this.name = queryParams.get('name');
            this.description = queryParams.get('description');
            this.date = queryParams.get('date');
            this.location = queryParams.get('location');
            console.log(this.name);
        }
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
