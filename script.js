console.log("script file");
const form = document.getElementById("formid");
const submitBtn = document.getElementById("submitBtn");
const successP = document.getElementById("submitted-Data");
const getuser = document.getElementById("getUser");
const userData = document.getElementById("userData");
const dots = document.getElementById("dots");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata);
  const jsondata = JSON.stringify(data);
  sendData(data);

  console.log(jsondata);
});

// async function sendData(jsondata) {

//   submitBtn.disabled = true;
//   console.log("in the sendData function")
//   await fetch("https://form-data-submission-2ew5.onrender.com/register", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: jsondata,
//   })
//     .then((res) => {
//       res.json();
//       successP.innerHTML = `<p style="color:green">Congratualitions You are registed </p>`;
//       console.log("registration successfull")
//       form.reset();
//       console.log("Respose is : ",res);
//     })
//     .then((data) => {
//       console.log("data submitted successfully", data);
//     })
//     .catch((error) => {
//       console.log("Error occured :", error.message,error.name,error.status);
//       successP.innerHTML = `<p style="color:red">sorry! Server issue. Try after sometime. </p>`
//     });
//     submitBtn.disabled = false;
//     dots.classList.add("hide");
// }

function sendData(data){
  submitBtn.disabled = true;
  dots.classList.remove("hide");
  submitBtn.value = "wait";
  let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://form-data-submission-2ew5.onrender.com/register');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onloadstart = () =>{
      }
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          submitBtn.disabled = false;
          if (xhr.status === 200) {

            var response = JSON.parse(xhr.responseText);
            console.log('Data sent successfully:', response);
            successP.innerHTML = `<p style="color:green">Congratualitions You are registed </p>`;
            
          } else {
            if(xhr.status === 409){
              console.log("User Exist already",JSON.parse(xhr.responseText),"\n",xhr.responseText);
              successP.innerHTML = `<p style="color:red">sorry You are already registed. Try to login with your email </p>`
            }else{

              console.error('Error:', xhr.statusText);
              successP.innerHTML = `<p style="color:red">sorry! Server is not connected. Try after sometime. </p>`
            }

          }
          dots.classList.add("hide");
          submitBtn.value = "Register";
          submitBtn.classList.remove("disable");
        }
      };
      xhr.send(JSON.stringify(data));

}

// getuser.addEventListener('click',fetchdata);

function fetchdata() {
  var userHTML = "";
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://form-data-submission-2ew5.onrender.com/getusers",
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log("data fetched");
        var jsondata = JSON.parse(xhr.responseText);

        jsondata.data.forEach((user) => {
          console.log(user);
          userHTML = `<p>Name : ${user.firstName} ${user.lastName} ,Email : ${user.Email}, Number : ${user.phoneNumber}, Age : ${user.Age}, gender : ${user.gender}</p>`;
          userData.innerHTML += userHTML;
        });
      } else {
        console.log("Error : ", xhr.statusText);
      }
    }
  };
  xhr.send();
}
