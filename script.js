console.log("script file");
const form = document.getElementById("formid");
const submitBtn = document.getElementById("submitBtn");
const successP = document.getElementById("submitted-Data");
const getuser = document.getElementById("getUser");
const userData = document.getElementById("userData");


submitBtn.addEventListener("click",(event)=>{
    event.preventDefault();
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata);
    const jsondata = JSON.stringify(data);
    sendData(data);

    console.log(data);
    console.log(jsondata);
});


// function sendData(jsondata){

//   fetch('http://localhost:4000/register',{
//     method: 'POST',
//     headers : {
//       'content-type' : 'application/json'
//     },
//     body : jsondata
//   })
//   .then((res) => res.json())
//   .then(data => {
//     console.log("data submitted successfully",data);
//   })
//   .catch(error => {
//     console.log("Error occured ",error);
//   })
// }


function sendData(data){
  let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://form-data-submission-2ew5.onrender.com/register');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log('Data sent successfully:', response);
            successP.innerHTML = `<p style="color:green">Congratualitions You are registed </p>`;
            form.reset();
          } else {
            if(xhr.status === 409){
              console.log("User Exist already");
              successP.innerHTML = `<p style="color:red">sorry You are already registed. Try to login with your email </p>`
            }else{

              console.error('Error:', xhr.statusText);
              successP.innerHTML = `<p style="color:red">sorry! Server is not connected. Try after sometime. </p>`
            }

          }
        }
      };
      xhr.send(JSON.stringify(data));

}



getuser.addEventListener('click',fetchdata);

function fetchdata(){
  var userHTML = ""
  let xhr = new XMLHttpRequest();
  xhr.open('GET','https://form-data-submission-2ew5.onrender.com/getusers',true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE){
      if(xhr.status === 200){
        console.log("data fetched");
        var jsondata = JSON.parse(xhr.responseText);
        
        jsondata.data.forEach(user => {
          console.log(user);
           userHTML = `<p>Name : ${user.firstName} ${user.lastName} ,Email : ${user.Email}, Number : ${user.phoneNumber}, Age : ${user.Age}, gender : ${user.gender}</p>`
        userData.innerHTML += userHTML;
        });
      }else{
        console.log("Error : ",xhr.statusText);
      }
    }
  }
  xhr.send();
}
