var appdiv = new Vue ({
    el: "#app",
    data: {
      Branches: [],
      User_Event: [],
      User_Branch: [],
        name: '',
        description: '',
        date: '',
        location: '',
        image: '',
        comments: [],
        newCommentText: '',
        eventID: '',
        BranchID: '',
        BranchName: ''
    },
    mounted: function() {
        this.getQuerypara();
        this.getComments();
      this.fetch_User_Branch();
      this.fetch_User_Events();



    },
    methods: {
      fetch_Branch(BranchID) {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", `/api/read/branches/${BranchID}`, true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            console.log(data[0]["BranchID"]);
            this.Branches = data;
            this.BranchName = data[0]["Branch_name"];
            console.log(this.BranchName);
          }
        };

        xhttp.send();
      },
      fetch_User_Events() {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "/api/read/User_Events", true);

        xhttp.onreadystatechange = () => {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            var data = JSON.parse(xhttp.responseText);
            this.User_Event = data;
            console.log(this.User_Event);
          }
        };

        xhttp.send();
      },
      fetch_User_Branch() {
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
        getQuerypara(){
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", `/api/read/events/${queryParams.get('id')}`, true);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var data = JSON.parse(xhttp.responseText);
                    console.log(data);
                    this.name = data[0]['Name'];
                    this.description = data[0]['Description'];
                    this.date = data[0]['Date'];
                    this.location = data[0]['Location'];
                    this.image = `${data[0]['Image']}`;
                    this.eventID = data[0]['EventID'];
                    this.BranchID = data[0]['BranchID'];
                    this.fetch_Branch(this.BranchID);

                }
            };
            xhttp.send();
        },
        buildNestedComments(rawComments) {
            const commentMap = {};

            // Initialize the commentMap with each comment and an empty replies array
            rawComments.forEach(comment => {
              const parentID = comment.ParentCommentID;
              const replyID = comment.ReplyCommentID;

              if (!commentMap[parentID]) {
                commentMap[parentID] = {
                  CommentID: parentID,
                  CommentText: comment.ParentCommentText,
                  First_name: comment.ParentFirstName,
                  Last_name: comment.ParentLastName,
                  Timestamp: comment.ParentTimestamp,
                  replies: [],
                  showReplyForm: false,
                  replyText: ''
                };
              }

              if (replyID) {
                if (!commentMap[replyID]) {
                  commentMap[replyID] = {
                    CommentID: replyID,
                    CommentText: comment.ReplyCommentText,
                    First_name: comment.ReplyFirstName,
                    Last_name: comment.ReplyLastName,
                    Timestamp: comment.ReplyTimestamp,
                    replies: [],
                    showReplyForm: false,
                    replyText: ''
                  };
                }
                // Add the reply to the parent's replies array
                commentMap[parentID].replies.push(commentMap[replyID]);
              }
            });

            // Return only the top-level comments (those without a ParentCommentID)
            return Object.values(commentMap).filter(comment => !rawComments.some(rc => rc.ReplyCommentID === comment.CommentID));
          },
          getComments() {
            const queryParams = new URLSearchParams(window.location.search);
            const xhttp = new XMLHttpRequest();

            xhttp.open('GET', `/api/manager/read/comments/${queryParams.get('id')}`, true);

            xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                const rawComments = JSON.parse(xhttp.responseText);
                const nestedComments = this.buildNestedComments(rawComments);
                console.log(nestedComments);
                this.comments = nestedComments;
              }
            };

            xhttp.send();
          },
          toggleReplyForm(commentID) {
            const comment = this.findCommentByID(commentID);
            if (comment) {
              comment.showReplyForm = !comment.showReplyForm;
            }
          },
          submitReply(parentID) {
            const parentComment = this.findCommentByID(parentID);
            const replyText = parentComment.replyText;
            if (replyText) {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', '/api/manager/post/comments/reply/', true);
              xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
              xhr.onload = () => {
                if (xhr.status === 200) {
                  const newReply = JSON.parse(xhr.responseText);
                  newReply.replies = [];
                  newReply.showReplyForm = false;
                  newReply.replyText = '';
                  parentComment.replies.push(newReply);
                  parentComment.replyText = ''; // Clear the reply text area
                }
              };
              xhr.send(JSON.stringify({
                ParentID: parentID,
                EventID: this.eventID,
                CommentText: replyText
              }));
            }
          },
          postComment() {
            const commentText = this.newCommentText;
            if (!commentText) return;
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/api/manager/post/comments/', true);
            xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                const newComment = JSON.parse(xhttp.responseText);
                newComment.replies = [];
                newComment.showReplyForm = false;
                newComment.replyText = '';
                console.log(newComment);
                this.comments.unshift(newComment);
                this.newCommentText = ''; // Clear the comment text area
              }
            };
            xhttp.send(JSON.stringify({
              ParentID: null,
              EventID: this.eventID,
              CommentText: commentText
            }));
          },
          findCommentByID(commentID) {
            const find = (comments) => {
              for (const comment of comments) {
                if (comment.CommentID === commentID) return comment;
                const nestedComment = find(comment.replies);
                if (nestedComment) return nestedComment;
              }
              return null;
            };
            return find(this.comments);
          },
          leave(EventID) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
            const queryParams = new URLSearchParams(window.location.search);


        window.location.href = `http://localhost:3000/EventDescription.html?${queryParams}`;


                } else {
                  console.error('There was a problem with the fetch operation:', xhttp.responseText);
                }
              }
            };
            xhttp.open('GET', `/api/leave/events/${EventID}`, true);
            xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhttp.send();
          },
          join(EventID, BranchID) {
            // Check if the user is in the branch of the event
            var isUserInBranch = this.User_Branch.some(userBranch => userBranch.BranchID === BranchID);

            if (!isUserInBranch) {
              alert("Cannot join the event because the user is not in that branch.");
            } else {
              var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = () => {
                if (xhttp.readyState === 4) {
                  if (xhttp.status === 200) {
            const queryParams = new URLSearchParams(window.location.search);

        window.location.href = `http://localhost:3000/EventDescription.html?${queryParams}`;

                  } else {
                    console.error('There was a problem with the fetch operation:', xhttp.responseText);
                  }
                }
              };
              xhttp.open('get', `/api/join/events/${EventID}`, true);
              xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
              xhttp.send();
            }
          },

      isUserInEvent(eventID) {
        return this.User_Event.some(item => item.EventID === eventID);
      },

    }
});

var app = new Vue({
    el: "#mydiv",
    data: {
        clicked: false,
        loginStatus: false,
        user: []
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
