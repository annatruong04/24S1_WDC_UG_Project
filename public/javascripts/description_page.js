Vue.component('comment-list', {
    props: ['comments'],
    template: `
      <div class="comments">
        <comment-item v-for="comment in comments" :key="comment.CommentID" :comment="comment"></comment-item>
      </div>
    `
  });

  Vue.component('comment-item', {
    props: ['comment'],
    data() {
      return {
        showReplyForm: false,
        replyText: ''
      };
    },
    template: `
      <div class="comment">
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-author">{{ comment.FirstName }} {{ comment.LastName }}</span>
            <span class="comment-date">{{ new Date(comment.Timestamp).toLocaleDateString() }}</span>
          </div>
          <div class="comment-text">{{ comment.CommentText }}</div>
          <button class="reply-button" @click="toggleReplyForm">Reply</button>
          <div class="comment-form reply-form" v-if="showReplyForm">
            <textarea v-model="replyText" placeholder="Write your reply here..." rows="2"></textarea>
            <button type="button" @click="postReply">Post Reply</button>
          </div>
          <comment-list v-if="comment.replies" :comments="comment.replies"></comment-list>
        </div>
      </div>
    `,
    methods: {
      toggleReplyForm() {
        this.showReplyForm = !this.showReplyForm;
      },
      postReply() {
        this.$emit('post-reply', {
          ParentID: this.comment.CommentID,
          CommentText: this.replyText
        });
        this.replyText = '';
        this.showReplyForm = false;
      }
    }
});

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
        buildNestedComments(comments) {
            const commentMap = {};
            comments.forEach(comment => {
              comment.replies = [];
              commentMap[comment.CommentID] = comment;
            });

            const nestedComments = [];
            comments.forEach(comment => {
              if (comment.ParentID === null) {
                nestedComments.push(comment);
              } else if (commentMap[comment.ParentID]) {
                commentMap[comment.ParentID].replies.push(comment);
              }
            });

            return nestedComments;
        },
        // getComment(){
        //     const queryParams = new URLSearchParams(window.location.search);
        //     var xhttp = new XMLHttpRequest();

        //     xhttp.open("GET", `/api/manager/read/comments/${queryParams.get('id')}`, true);

        //     xhttp.onreadystatechange = () => {
        //         if (xhttp.readyState == 4 && xhttp.status == 200) {
        //             const rawComments = JSON.parse(xhttp.responseText);
        //             const commentsMap = {};
        //             rawComments.forEach(comment => {
        //               if (!commentsMap[comment.ParentCommentID]) {
        //                 commentsMap[comment.ParentCommentID] = {
        //                   ParentCommentID: comment.ParentCommentID,
        //                   ParentCommentText: comment.ParentCommentText,
        //                   ParentTimestamp: comment.ParentTimestamp,
        //                   ParentFirstName: comment.ParentFirstName,
        //                   ParentLastName: comment.ParentLastName,
        //                   replies: [],
        //                   showReplyForm: false,
        //                   replyText: ''
        //                 };
        //               }
        //               if (comment.ReplyCommentID) {
        //                 commentsMap[comment.ParentCommentID].replies.push({
        //                   ReplyCommentID: comment.ReplyCommentID,
        //                   ReplyCommentText: comment.ReplyCommentText,
        //                   ReplyTimestamp: comment.ReplyTimestamp,
        //                   ReplyFirstName: comment.ReplyFirstName,
        //                   ReplyLastName: comment.ReplyLastName,
        //                   showReplyForm: false,
        //                   replyText: ''
        //                 });
        //               }
        //             });
        //             this.comments = Object.values(commentsMap);
        //         }
        //     };

        //     xhttp.send();
        // },
        // showReplyForm(commentID) {
        //     this.comments.forEach(comment => {
        //       if (comment.ParentCommentID === commentID) {
        //         comment.showReplyForm = !comment.showReplyForm;
        //       }
        //       comment.replies.forEach(reply => {
        //         if (reply.ReplyCommentID === commentID) {
        //           reply.showReplyForm = !reply.showReplyForm;
        //         }
        //       });
        //     });
        // },
        postReply(parentCommentID) {
            const queryParams = new URLSearchParams(window.location.search);
            const parentComment = this.comments.find(comment => comment.ParentCommentID === parentCommentID);
            const replyText = parentComment.replyText;
            if (replyText) {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', `/api/manager/post/comments/reply/${queryParams.get('id')}`, true);
              xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
              xhr.onload = () => {
                if (xhr.status === 200) {
                  const newReply = JSON.parse(xhr.responseText);
                  console.log(newReply);
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
                CommentText: replyText
              }));
            }
        },
        postComment(){
            const commentText = this.newMessage;
            var xhttp = new XMLHttpRequest();
            if (!commentText) return;
            xhttp.open("POST", `/api/manager/post/comments/`, true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    const newComment = JSON.parse(xhttp.responseText);
                    console.log(newComment);
                    this.comments.push({
                        ...newComment,
                        replies: []
                    });
                      this.newCommentText = '';
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