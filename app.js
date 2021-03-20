let internetCheck = document.querySelector(".internetCheck");
let err = document.querySelector(".error");
let dataErr;
let newBtn = document.querySelector(".newUser");
const putData = (data) => { //this function filling data on web page dynamicaly....
  let lables = document.querySelectorAll(".lable");
  let userContent = document.querySelectorAll(".userData");
  const userName = document.querySelector(".name");
  const pic = document.querySelector(".userPic");
  const age = document.querySelector(".age");
  const gender = document.querySelector(".gender");
  const phone = document.querySelector(".phone");
  const sName = document.querySelector(".sName");
  const para = document.querySelector(".para");
  let lable = ["Name : ", "Age : ", "Gender : ", "Phone : "];
  lables.forEach((e, i) => {
    e.innerText = lable[i];//adding lable
  });
  userContent.forEach((e) => {
    e.style.backgroundColor = "white"; //when data loaded then remove background color of details section 
  });
  userName.innerText = `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`;
  pic.src = data.results[0].picture.large;
  age.innerText = data.results[0].dob.age + " Years Old";
  let g = data.results[0].gender.toUpperCase()[0];//for capitalize gender text
  gender.innerText = data.results[0].gender.replace(g.toLowerCase(),g);
  phone.innerText = data.results[0].phone;
  sName.innerText = data.results[0].name.first;
  para.innerHTML = `Hi i am <b>${data.results[0].name.first}</b>, from <b>${data.results[0].location.country}</b>, my city is <b>${data.results[0].location.city}</b> . <br> my email is 
            <a href = "mailto:${data.results[0].email}">${data.results[0].email}</a>`;
  if (newBtn.hasAttribute("disabled")) {
    newBtn.attributes.removeNamedItem("disabled");
  }
  if (!newBtn.classList.contains("enable")) {
    newBtn.classList.add("enable");
  }
};
fetch("https://randomuser.me/api/")//data fetching
  .then((res) => res.json())
  .then((data) => {
    putData(data);
  })
  .catch((e) => {//error handiling if data fatching failed..
    err.innerText = `Something Went Wrong ${e}`;
    err.style.color = "red";
    err.classList.add("active");
    dataErr = true;
  });
newBtn.addEventListener("click", () => {
  fetch("https://randomuser.me/api/") //data fetching
    .then((res) => res.json())
    .then((data) => {
      putData(data);
    })
    .catch((e) => {//error handiling if data fatching failed..
      err.innerText = `Something Went Wrong ${e}`;
      err.style.color = "red";
      err.classList.add("active");
      dataErr = true;
    });
});
window.addEventListener("offline", () => { //if network is lost
  internetCheck.innerText = "Internet cunection is lost....";
  internetCheck.style.color = "red";
  internetCheck.classList.add("active");
});
window.addEventListener("online", () => { //if network back again ...
  internetCheck.innerText = "You are online now....";
  internetCheck.style.color = "green";
  internetCheck.classList.add("active");
  err.classList.remove("active");
  if(dataErr){ //if allrady data error ==>>
    fetch("https://randomuser.me/api/") //data fetching
      .then((res) => res.json())
      .then((data) => {
        putData(data);
      })
      .catch((e) => {//error handiling if data fatching failed..
        err.innerText = `Something Went Wrong ${e}`;
        err.style.color = "red";
        err.classList.add("active");
        dataErr = true;
      });
      dataErr = false; //data goted then data Error false
  }
  setTimeout(() => {
    internetCheck.classList.remove("active");
  }, 2000);
});
if (!navigator.onLine) { 
  internetCheck.innerText = "Internet cunection is lost....";
  internetCheck.style.color = "red";
  internetCheck.classList.add("active");
  
}
