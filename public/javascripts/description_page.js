var appdiv = new Vue ({
    el: "#app",
    data: {
        name: '',
        description: '',
        date: '',
        location: '',
        image: ''
    },
    mounted: function() {
        this.getQuerypara();
    },
    methods: {
        getQuerypara(){
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", "/api/manager/read/events", true);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var data = JSON.parse(xhttp.responseText);
                    console.log(data[0]["EventID"]);
                    this.events = data;
                    console.log(this.events);
                }
            };

            xhttp.send();
            this.name = queryParams.get('name');
            this.description = queryParams.get('description');
            this.date = queryParams.get('date');
            this.location = queryParams.get('location');
            this.image = queryParams.get('image');
        }
    }
});