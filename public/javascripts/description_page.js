var appdiv = new Vue ({
    el: "#app",
    data: {
        name: '',
        description: '',
        date: '',
        location: '',
        image: '',
        comments: [],
        newCommentText: '',
        eventID: '',
    },
    mounted: function() {
        this.getQuerypara();
        this.getComments();
    },
    methods: {
        getQuerypara(){
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", `/api/manager/read/events/${queryParams.get('id')}`, true);

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
          }
    }
});

window.onload = function () {
  var app = new Vue({
    el: "#mydiv",
    data: {
      clicked: false,
      showPopUp: false,
      users: []
    },
    methods: {
      PopUp(){
        const queryParams = new URLSearchParams(window.location.search);
        this.showPopUp = !this.showPopUp;
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                  var data = JSON.parse(xhttp.responseText);
                  this.users = data;
                  console.log("Read Event member successfull");
              }
          };
          xhttp.open("get", `/api/manager/read/events/member/${queryParams.get('id')}`, true);
          xhttp.send();
      },
      toggleDropdown() {
        console.log(this.clicked);
        this.clicked = !this.clicked;
      },
      deleteEvent(){
        const queryParams = new URLSearchParams(window.location.search);
        if (window.confirm(`Are you sure you want to delete ${queryParams.get('name')}?`)) {
          var xhttp = new XMLHttpRequest();

          xhttp.onreadystatechange = () => {
              if (xhttp.readyState === 4 && xhttp.status === 200) {
                  window.location.href = `http://localhost:3000/manager/Event.html`;
                  console.log("Delete Event successfull");
              }
          };
          xhttp.open("post", "/api/manager/delete/events", true);
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.send(JSON.stringify({eventID: queryParams.get('id')}));
      }
    },
    editEvent(){
      const queryParams = new URLSearchParams(window.location.search);

      window.location.href = `http://localhost:3000/manager/editEvent.html?${queryParams}`;
    },
    }
  });
}