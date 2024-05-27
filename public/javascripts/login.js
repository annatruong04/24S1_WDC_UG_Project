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
                    console.log(xhttp.responseText);
                    if (xhttp.responseText === "User") window.location.href = `http://localhost:3000/`;
                    else if (xhttp.responseText === "Manager") window.location.href = `http://localhost:3000/manager/home.html`;
                    else if (xhttp.responseText === "Administrator") window.location.href = `http://localhost:3000/admin/admin.html`;
                    console.log("insert successfull");
                }
            };

            xhttp.open("post", "/auth/login", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({param1: this.username, param2: this.password}));
        }
    }

});