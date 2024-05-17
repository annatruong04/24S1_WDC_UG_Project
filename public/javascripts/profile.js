const app = new Vue({
  el: '#app',
  data: {
    user: {}
  },



  mounted: function() {
    this.fetch_event();
  },
  methods: {
    fetch_event() {
      var xhttp = new XMLHttpRequest();

      xhttp.open("GET", "/api/get/user", true);
      
      xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
              var data = JSON.parse(xhttp.responseText);
              console.log(data[0]);
              // console.log(data[0]["Eventconsole.log(dataID"]);
              this.user = data[0];

          }
      };

      xhttp.send(this.user);
    },
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const profilePicture = document.getElementById('profilePicture');
  const dropdownMenu = document.getElementById('dropdownMenu');

  profilePicture.addEventListener('click', function () {
      const isShown = dropdownMenu.getAttribute('data-show') === 'true';
      dropdownMenu.setAttribute('data-show', !isShown);
  });

  // Optional: Close the dropdown when clicking outside
  document.addEventListener('click', function (event) {
      if (!profilePicture.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.setAttribute('data-show', 'false');
      }
  });
});