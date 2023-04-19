const checkbox = document.getElementById("terms");
const btns = document.querySelectorAll(".my-form button");
const nameval = document.getElementById("name");
const id = document.getElementById("idno");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const pass = document.getElementById("pass");
const cnfpass = document.getElementById("cnfpass");
const age = document.getElementById("age");
const branch = document.getElementById("branch");
const err = document.getElementById("error_box");
const sub = document.getElementById("submit_button");

checkbox.addEventListener("change", function () {
  const checked = this.checked;
  for (const btn of btns) {
    checked ? (btn.disabled = false) : (btn.disabled = true);
  }
});

sub.addEventListener("click", (e) => {
  //console.log(age.value);
  e.preventDefault();
  if (age.value < 18 || age.value > 25) {
    err.innerHTML = "* age should be between 18 and 25";
    if (err.style.display === "none") {
      err.style.display = "block";
    } else {
      err.style.display = "none";
    }
  }
  if (pass.value !== cnfpass.value) {
    err.innerHTML = "* Confirmed password should be same as password";
    if (err.style.display === "none") {
      err.style.display = "block";
    } else {
      err.style.display = "none";
    }
  }
  if (phone.value.length !== 10) {
    err.innerHTML = "* phone number should be a 10 digit";
    if (err.style.display === "none") {
      err.style.display = "block";
    } else {
      err.style.display = "none";
    }
  }
});
