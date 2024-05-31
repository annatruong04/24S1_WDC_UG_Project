document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0, 0);
});

var app = new Vue({
    el: "#interface",
    data: {
        clicked: false
    },
    methods: {
        toggleDropdown() {
            this.clicked = !this.clicked;
        }
    }
});
