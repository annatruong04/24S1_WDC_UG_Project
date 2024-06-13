var appdiv = new Vue({
  el: "#user-event-page",
  data: {
    Branches: [],
    User_Branch: [],
    BranchRequest: [],
    showPopUp: false,
    imgErr: false,
    form: {
      name: '',
      location: '',
      date: '',
      description: ''
    },
    filteredBranches: [],
    query_name: '',
    showSearch: false,
  },
  computed: {
    truncatedBranches() {
      return this.Branches.map(branch => {
        return {
          ...branch,
          truncatedDescription: this.truncateMessage(branch.Description, 8), // Adjust the number of words as needed
        };
      });
    },
    filter_truncatedBranches() {
      return this.filteredBranches.map(branch => {
        return {
          ...branch,
          truncatedDescription: this.truncateMessage(branch.Description, 8), // Adjust the number of words as needed
        };
      });
    }
  },
  mounted: function () {
    this.fetch_Branch();
    this.fetch_User_Branch();
    this.fetch_User_BranchRequest();
  },
  methods: {
    truncateMessage(message, wordLimit) {
      const words = message.split(' ');
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
      }
      return message;
  },
    search() {
      const query_name = this.query_name ? this.query_name.toLowerCase() : "";

      if (query_name) {
        this.filteredBranches = this.Branches.filter(branch => {
          console.log(branch.Branch_name);
          return branch.Branch_name.toLowerCase().includes(query_name)
        });
      } else{
        this.filteredBranches = this.Branches;
      }
      this.showSearch = true;
      console.log(this.filteredEvents);
    },
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

    fetch_User_BranchRequest(){
      var xhttp = new XMLHttpRequest();

      xhttp.open("GET", "/api/read/BranchRequest", true);

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var data = JSON.parse(xhttp.responseText);

          this.BranchRequest = data;
          console.log(this.BranchRequest);
        }
      };

      xhttp.send();
    },

    isUserInBranch(branchID) {
      // Assuming this.User_Branch is an array of objects with 'BranchID' property
      return this.User_Branch.some(item => item.BranchID === branchID);

    },

    isUserInBranchRequest(branchID) {
      // Assuming this.User_Branch is an array of objects with 'BranchID' property
      return this.BranchRequest.some(item => item.BranchID === branchID);

    },

    directBranch(branch) {
      const queryParams = new URLSearchParams({
        id: branch.BranchID,
        name: branch.Branch_name,
        description: branch.Description,
        date: branch.Date,
        location: branch.Location,
        // Add other branch details as needed
    }).toString();

      window.location.href = `http://localhost:3000/BranchDetail.html?${queryParams}`;
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
    // async join(BranchID) {
    //   try {


    //     const queryParams = new URLSearchParams({
    //       // id: BranchID,

    //       // Add other event details as needed
    //     }).toString();
    //     const [branchesResponse, userResponse] = await Promise.all([
    //       fetch(`/api/join/branches/${BranchID}`),
    //       fetch("/auth/getUser")
    //     ]);

    //     if (!branchesResponse.ok || !userResponse.ok) {
    //       throw new Error('Network response was not ok');
    //     }

    //     const branchesData = await branchesResponse.json();
    //     const userData = await userResponse.json();

    //     console.log("Branches:", branchesData);
    //     console.log("User:", userData);

    //     // this.Branches = branchesData;
    //     // this.user = userData;

    //     // // If you need to do a POST request with the fetched data
    //     // const postData = {
    //     //   branches: branchesData,
    //     //   user: userData
    //     // };

    //     // const postResponse = await fetch("/your-post-endpoint", {
    //     //   method: 'POST',
    //     //   headers: {
    //     //     'Content-Type': 'application/json'
    //     //   },
    //     //   body: JSON.stringify(postData)
    //     // });

    //     // if (!postResponse.ok) {
    //     //   throw new Error('Network response was not ok');
    //     // }

    //     // const postResult = await postResponse.json();
    //     // console.log("POST response:", postResult);

    //   } catch (error) {
    //     console.error('There was a problem with the fetch operation:', error);
    //   };
    //   window.location.href = `http://localhost:3000/Branches.html`;

    // },

    leave(branchID) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
      window.location.href = `http://localhost:3000/Branches.html`;
    } else {
      console.error('There was a problem with the fetch operation:', xhttp.responseText);
          }
        }
      };
      xhttp.open('GET', `/api/leave/branches/${branchID}`, true);
      xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhttp.send();
    },
    cancelRequest(BranchID){
      var xhttp = new XMLHttpRequest();

      xhttp.open("POST", "/api/cancel/BranchRequest", true);

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          window.location.href = `http://localhost:3000/Branches.html`;
          console.log(this.BranchRequest);
        }
      };
      xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhttp.send(JSON.stringify({
        Branch_ID: BranchID
      }));


    },
    join(branchID) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
      window.location.href = `http://localhost:3000/Branches.html`;


          } else {
            console.error('There was a problem with the fetch operation:', xhttp.responseText);
          }
        }
      };
      xhttp.open('GET', `/api/join/branches/${branchID}`, true);
      xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xhttp.send();
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