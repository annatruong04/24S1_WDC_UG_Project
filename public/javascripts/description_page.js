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