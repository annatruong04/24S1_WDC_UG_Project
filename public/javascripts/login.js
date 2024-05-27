var app = new Vue({
    el: '#app',
    data: {
        username: "",
        password: ""
    },
    methods: {
        login(){
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    console.log("insert successfull");
                }
            };

            xhttp.open("post", "/auth/login", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({param1: this.username, param2: this.password}));
        }
    }

});