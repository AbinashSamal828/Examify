const sub = document.getElementById("sub");
// const form = document.forms.namedItem("ofform");
const id_input = document.getElementById("id");
const username_input = document.getElementById("username");
const all_posts_element = document.getElementById("all_posts");
const name_greet=document.getElementById("name_greet");
const comment = document.getElementById("content");

name_greet.textContent=localStorage.getItem('username');

sub.addEventListener("click", (e) => {
  console.log(comment.value.trim().length);
  // const formData=new FormData(form);
  const id = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  // formData.append("id",id);
  console.log(comment.value);
  id_input.value = id;
  username_input.value = username;
  console.log(input.value);
  if (comment.value.trim().length == 0) alert("post cannot be empty");
});

async function all_posts() {
  const posts = await fetch("http://localhost:8081/all_posts");
  const data = await posts.json();
  console.log(data);
  create_post(data);
}
all_posts();

function create_post(data) {
  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = data[i].username;
    const p = document.createElement("p");
    p.textContent = data[i].content;
    const button = document.createElement("button");
    div.setAttribute('id',i);
    div.setAttribute('class','comment_class');
    const a = document.createElement("a");
    a.textContent = "REPLY";
    a.href = "ofreply.html";
    button.appendChild(a);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(button);
    all_posts_element.appendChild(div);
    // all_posts_element.addEventListener("click",(e)=>{
    //   console.log(e);
    // })
    button.addEventListener("click", (e)=>{
      const clickedButton = e.target;

    // Traverse up the DOM to find the parent div and get its ID
      const parentDiv = clickedButton.closest('.comment_class');
      const parentId = parentDiv.id;
      set_pos(parentId);
    });
  }
}
function set_pos(i){
  console.log('setting',i)
  localStorage.setItem('pos',i);
}