var appdiv = new Vue({
  el: "#user-event-page",
  data: {
    Branches: [],
    User_Branch: [],
    showPopUp: false,
    imgErr: false,
    form: {
      name: '',
      location: '',
      date: '',
      description: ''
    }
  },
  mounted: function () {
    this.fetch_Branch();
    this.fetch_User_Branch();
  },
  methods: {
    fetch_Branch() {
      var xhttp = new XMLHttpRequest();

      xhttp.open("GET", "/api/read/Branches", true);

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var data = JSON.parse(xhttp.responseText);
          console.log(data[0]["BranchID"]);
          this.Branches = data;
          console.log(this.Branches);
        }
      };

      xhttp.send();
    },

    fetch_User_Branch(){
      var xhttp = new XMLHttpRequest();

      xhttp.open("GET", "/api/read/User_Branch", true);

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var data = JSON.parse(xhttp.responseText);

          this.User_Branch = data;
          console.log(this.User_Branch);
        }
      };

      xhttp.send();
    },

    isUserInBranch(branchID) {
      // Assuming this.User_Branch is an array of objects with 'BranchID' property
      return this.User_Branch.some(item => item.BranchID === branchID);

  },

    directEvent(event) {
      const queryParams = new URLSearchParams({
        name: event.Name,
        description: event.Description,
        date: event.Date,
        location: event.Location,
        // Add other event details as needed
      }).toString();

      window.location.href = `http://localhost:3000/manager/event-description.html?${queryParams}`;
    },
    popup() {
      this.showPopUp = true;
    },
    async submitForm() {
      console.log(this.form);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", '/api/create/events', true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {

          alert('Data submitted successfully');
        } else {
          console.error('The request failed:', xhr.statusText);
        }
      };


      xhr.onerror = () => {
        console.error('Network error');
      };
      xhr.send(JSON.stringify(this.form));
    },
    // join(){
    //   var xhttp = new XMLHttpRequest();

    //   xhttp.open("GET", "/api/read/Branches", true);

    //   xhttp.onreadystatechange = () => {
    //       if (xhttp.readyState == 4 && xhttp.status == 200) {
    //           var data = JSON.parse(xhttp.responseText);
    //           console.log(data[0]["BranchID"]);
    //           this.Branches = data;
    //           console.log(this.Branches);
    //       }
    //   };


    //   xhttp.send();

    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = () => {
    //     if (xhttp.readyState === 4) {
    //       var data = JSON.parse(xhttp.responseText);
    //       console.log(data);
    //       this.user = data;
    //     }
    // };

    // xhttp.open("get", "/auth/getUser", true);
    // xhttp.send();
    // }
    async join(BranchID) {
      try {


        const queryParams = new URLSearchParams({
          // id: BranchID,

          // Add other event details as needed
        }).toString();
        const [branchesResponse, userResponse] = await Promise.all([
          fetch(`/api/join/branches/${BranchID}`),
          fetch("/auth/getUser")
        ]);

        if (!branchesResponse.ok || !userResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const branchesData = await branchesResponse.json();
        const userData = await userResponse.json();

        console.log("Branches:", branchesData);
        console.log("User:", userData);

        // this.Branches = branchesData;
        // this.user = userData;

        // // If you need to do a POST request with the fetched data
        // const postData = {
        //   branches: branchesData,
        //   user: userData
        // };

        // const postResponse = await fetch("/your-post-endpoint", {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(postData)
        // });

        // if (!postResponse.ok) {
        //   throw new Error('Network response was not ok');
        // }

        // const postResult = await postResponse.json();
        // console.log("POST response:", postResult);

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      };
      window.location.href = `http://localhost:3000/Branches.html`;

    },
    async leave(BranchID) {
      try {
        const [branchesResponse, userResponse] = await Promise.all([
          fetch(`/api/leave/branches/${BranchID}`),
          fetch("/auth/getUser")
        ]);

        if (!branchesResponse.ok || !userResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const branchesData = await branchesResponse.json();
        const userData = await userResponse.json();

        console.log("Branches:", branchesData);
        console.log("User:", userData);

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
      window.location.href = `http://localhost:3000/Branches.html`;



    },


  }
});

window.onload = function () {
  var app = new Vue({
    el: "#mydiv-login",
    data: {
      clicked: false,
      loginStatus: false,
      user: []
    },
    mounted() {
      this.getUser();
    },
    methods: {
      toggleDropdown() {
        this.clicked = !this.clicked;
      },
      getUser() {
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
}