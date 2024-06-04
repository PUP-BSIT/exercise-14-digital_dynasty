document.addEventListener("DOMContentLoaded", function () {
  const commentNameInput = document.getElementById("comment-name");
  const commentTextInput = document.getElementById("comment-text");
  const submitCommentButton = document.getElementById("submit-comment");
  const commentsContainer = document.getElementById("comments-container");
  const sortAscButton = document.getElementById("sort-asc");
  const sortDescButton = document.getElementById("sort-desc");

  let comments = [];

  function checkCommentValidity() {
    const nameValue = commentNameInput.value.trim();
    const textValue = commentTextInput.value.trim();
    submitCommentButton.disabled = !(nameValue && textValue);
  }

  checkCommentValidity();

  commentNameInput.addEventListener("input", checkCommentValidity);
  commentTextInput.addEventListener("input", checkCommentValidity);

  submitCommentButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = commentNameInput.value.trim();
    const text = commentTextInput.value.trim();

    if (!name || !text) {
      return;
    }

    addComment(name, text, new Date());
    commentNameInput.value = "";
    commentTextInput.value = "";
    checkCommentValidity();
  });

  function addComment(name, text, date) {
    const commentElement = document.createElement("p");
    commentElement.innerHTML = `Name: ${name}<br>Comment: 
        ${text}<br><small>${date.toLocaleString()}</small>`;
    commentsContainer.appendChild(commentElement);

    comments.push({ name, text, date });
  }

  sortAscButton.addEventListener("click", () => {
    sortComments(true);
  });

  sortDescButton.addEventListener("click", () => {
    sortComments(false);
  });

  function sortComments(ascending = true) {
    const sortedComments = [...comments];
    sortedComments.sort((a, b) =>
      ascending ? a.date - b.date : b.date - a.date
    );
    renderComments(sortedComments);
  }

  function renderComments(commentsToRender) {
    const existingComments = commentsContainer.querySelectorAll("p");
    existingComments.forEach(comment => comment.remove());
  
    commentsToRender.forEach((comment) => {
      const commentElement = document.createElement("p");
      commentElement.innerHTML = `Name: ${comment.name}<br>Comment: ${
        comment.text
      }<br><small>${comment.date.toLocaleString()}</small>`;
      commentsContainer.appendChild(commentElement);
    });
  }
});