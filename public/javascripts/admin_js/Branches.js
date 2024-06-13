// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
});


var appdiv = new Vue({
    el: "#mydiv",
    data: {
      Branches: [],
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
    mounted: function () {
      this.fetch_Branch();
    },
    computed: {
        truncatedBranches() {
          return this.Branches.map(Branch => {
            return {
              ...Branch,
              truncatedMessage: this.truncateMessage(Branch.Description, 19), // Adjust the number of words as needed
            };
          });
        }
    },
    methods: {
    //   search() {
    //     const query_name = this.query_name ? this.query_name.toLowerCase() : "";

    //     if (query_name) {
    //       this.filteredBranches = this.Branches.filter(branch => {
    //         console.log(branch.Branch_name);
    //         return branch.Branch_name.toLowerCase().includes(query_name)
    //       });
    //     } else{
    //       this.filteredBranches = this.Branches;
    //     }
    //     this.showSearch = true;
    //     console.log(this.filteredEvents);
    //   },
    truncateMessage(message, wordLimit) {
        const words = message.split(' ');
        if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(' ') + '...';
        }
        return message;
      },
      editBranch(branch){
        const queryParams = new URLSearchParams({
          id: branch.BranchID,
          name: branch.Branch_name,
          description: branch.Description,
          location: branch.Location,
          // Add other event details as needed
        }).toString();

        window.location.href = `http://localhost:3000/admin/editBranch.html?${queryParams}`;
      },
      fetch_Branch() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/read/Branches", true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            this.Branches = data;
          }
        };

        xhttp.send();
      },
      gotoCreateBranch(){
        window.location.href = `http://localhost:3000/admin/CreateBranch.html`;
      },

      deleteBranch(BranchID, Branch_name){
        if (window.confirm(`Are you sure you want to delete ${Branch_name}?`)) {
          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                  window.location.href = `http://localhost:3000/admin/Branches.html`;
                  console.log("Delete Branches successfull");
              }
          };
          xhttp.open("post", "/api/admin/delete/branches", true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(JSON.stringify({branchID: BranchID}));
    }
}
    }
  });
