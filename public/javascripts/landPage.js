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


var main_app = new Vue({
    el: "#welcome-div",
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