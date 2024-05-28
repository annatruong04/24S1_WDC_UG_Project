var app = new Vue({
    el: "#mydiv",
    data: {
        clicked: false,
        loginStatus: false
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
                    this.loginStatus = true;
                }
            };

            xhttp.open("get", "/auth/getUser", true);
            xhttp.send();
        }
    }
});
