const all_replies_element = document.getElementById("all_replies");
const sub_rep = document.getElementById("submit_reply");
const id_input = document.getElementById("id");
const username_input = document.getElementById("username");
const comment = document.getElementById("comment");
const name_greet=document.getElementById("name_greet");
const post_element=document.getElementById("post")

name_greet.textContent=localStorage.getItem('username');

function create_comment(data) {
  if (data.length == 0) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = "No replies :)";
    // const p = document.createElement("p");
    // p.textContent = data[i].comment;
    // const button = document.createElement("button");
    // const a = document.createElement("a");
    // a.textContent = "REPLY";
    // a.href = "ofreply.html";
    // button.appendChild(a);
    div.appendChild(h3);
    // div.appendChild(p);
    // div.appendChild(button);
    all_replies_element.appendChild(div);
  }
  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = data[i].username;
    const p = document.createElement("p");
    p.textContent = data[i].comment;
    // const button = document.createElement("button");
    // const a = document.createElement("a");
    // a.textContent = "REPLY";
    // a.href = "ofreply.html";
    // button.appendChild(a);
    div.appendChild(h3);
    div.appendChild(p);
    // div.appendChild(button);
    all_replies_element.appendChild(div);
    // button.addEventListener('click',reply(i))
  }
}
async function reply() {
  const i = localStorage.getItem("pos");
  const posts = await fetch("http://localhost:8081/all_posts");
  const data = await posts.json();
  const post = data[i];
  const comments = post.comments;
  post_element.innerHTML=post.content;
  console.log("ohk", i);
  create_comment(comments);
  //   localStorage.removeItem('pos');
}
reply();
sub_rep.addEventListener("click", async (e) => {
  const pos = localStorage.getItem("pos");
  // const formData=new FormData(form);

  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  console.log(comment.value.trim().length);
  // formData.append("id",id);
  console.log(comment.value);
  const comment_content = comment.value;
  //   console.log(input.value);
  if (comment.value.trim().length == 0) {
    alert("reply cannot be empty");
    return;
  }
  await fetch("http://localhost:8081/reply/" + pos, {
    method: "POST",
    body: JSON.stringify({
      id,
      username,
      comment: comment_content,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});
