var appdiv = new Vue ({
    el: "#app",
    data: {
        name: '',
        description: '',
        date: '',
        location: '',
        image: '',
        comments: [],
        newMessage: ""
    },
    mounted: function() {
        this.getQuerypara();
        this.getComment();
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
                }
            };

            xhttp.send();
        },

        getComment(){
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();

            xhttp.open("GET", `/api/manager/read/comments/${queryParams.get('id')}`, true);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    const rawComments = JSON.parse(xhttp.responseText);
                    const commentsMap = {};
                    rawComments.forEach(comment => {
                      if (!commentsMap[comment.ParentCommentID]) {
                        commentsMap[comment.ParentCommentID] = {
                          ParentCommentID: comment.ParentCommentID,
                          ParentCommentText: comment.ParentCommentText,
                          ParentTimestamp: comment.ParentTimestamp,
                          ParentFirstName: comment.ParentFirstName,
                          ParentLastName: comment.ParentLastName,
                          replies: [],
                          showReplyForm: false,
                          replyText: ''
                        };
                      }
                      if (comment.ReplyCommentID) {
                        commentsMap[comment.ParentCommentID].replies.push({
                          ReplyCommentID: comment.ReplyCommentID,
                          ReplyCommentText: comment.ReplyCommentText,
                          ReplyTimestamp: comment.ReplyTimestamp,
                          ReplyFirstName: comment.ReplyFirstName,
                          ReplyLastName: comment.ReplyLastName,
                          showReplyForm: false,
                          replyText: ''
                        });
                      }
                    });
                    this.comments = Object.values(commentsMap);
                }
            };

            xhttp.send();
        },
        showReplyForm(commentID) {
            this.comments.forEach(comment => {
              if (comment.ParentCommentID === commentID) {
                comment.showReplyForm = !comment.showReplyForm;
              }
              comment.replies.forEach(reply => {
                if (reply.ReplyCommentID === commentID) {
                  reply.showReplyForm = !reply.showReplyForm;
                }
              });
            });
        },
        postReply(parentCommentID) {
            const parentComment = this.comments.find(comment => comment.ParentCommentID === parentCommentID);
            const replyText = parentComment.replyText;
            if (replyText) {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', 'http://localhost:3000/comments', true);
              xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
              xhr.onload = () => {
                if (xhr.status === 201) {
                  const newReply = JSON.parse(xhr.responseText);
                  parentComment.replies.push({
                    ReplyCommentID: newReply.CommentID,
                    ReplyCommentText: replyText,
                    ReplyTimestamp: newReply.Timestamp,
                    ReplyFirstName: newReply.First_name,
                    ReplyLastName: newReply.Last_name,
                    showReplyForm: false,
                    replyText: ''
                  });
                  parentComment.replyText = '';
                  parentComment.showReplyForm = false;
                } else {
                  console.error('Failed to post reply');
                }
              };
              xhr.send(JSON.stringify({
                ParentID: parentCommentID,
                EventID: this.eventID,
                UserID: 1, // Replace with the actual user ID
                CommentText: replyText
              }));
            }
        },
        PostComment(){
            const queryParams = new URLSearchParams(window.location.search);
            var xhttp = new XMLHttpRequest();

            xhttp.open("POST", `/api/manager/post/comments/${queryParams.get('id')}`, true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log("Post Comment successfully");
                }
            };

            xhttp.send(JSON.stringify({
                ParentID: null,
                CommentText: this.newMessage
            }));
        }

    }
});