var app = new Vue({
    el: '#app',
    data: {
        username: "",
        password: "",
        WrongInfo: false,
        SU_username: "",
        SU_firstname: "",
        SU_lastname: "",
        SU_phonenum: "",
        SU_email: "",
        SU_password: "",
        SU_passwordCF: "",
        SU_invalid: false,
        SU_invalid_name: "",
    },
    methods: {
        login(){
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    this.WrongInfo = false;
                    console.log(xhttp.responseText);
                    if (xhttp.responseText === "User") window.location.href = `http://localhost:3000/user/landingPage.html`;
                    else if (xhttp.responseText === "Manager") window.location.href = `http://localhost:3000/manager/home.html`;
                    else if (xhttp.responseText === "Administrator") window.location.href = `http://localhost:3000/admin/admin.html`;
                    console.log("Login successfull");
                }
                else if (xhttp.status === 400){
                    this.WrongInfo = true;
                    return;
                }
            };

            xhttp.open("post", "/auth/login", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({param1: this.username, param2: this.password}));
        },

        signup(){
            if (this.SU_password !== this.SU_passwordCF) {
                this.SU_invalid = true;
                this.SU_invalid_name = "Passwords don't match !";
                return;
            }
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    this.SU_invalid = false;
                    window.location.href = `http://localhost:3000/auth/login`;
                    console.log("Sign up successfull");
                }
                else if (xhttp.status === 400){
                    this.SU_invalid = true;

                }
            };

            xhttp.open("post", "/auth/signup", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({param1: this.SU_username,
                                       param2: this.SU_firstname,
                                       param3: this.SU_lastname,
                                       param4: this.SU_phonenum,
                                       param5: this.SU_email,
                                       param6: this.SU_password
                                    }));
        }
    }
});

function do_google_login(response){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            this.WrongInfo = false;
            window.location.href = `http://localhost:3000/user/landingPage.html`;
        }
    };

    xhttp.open("post", "/auth/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(response));
}

