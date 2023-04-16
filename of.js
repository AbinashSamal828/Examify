const comment = document.getElementById("comment");
const sub = document.getElementById("sub");

sub.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(comment.value);
  console.log(comment.value.trim().length);
  if (comment.value.trim().length == 0) alert("post cannot be empty");
});
