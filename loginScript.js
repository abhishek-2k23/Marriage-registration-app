console.log("login form script");
const form = document.getElementById("loginform");
const loginBtn = document.getElementById("loginBtn");
const getuser = document.getElementById("getUser");
const userData = document.getElementById("userData");
const formfield = document.getElementById("form-field");
const loggedin = document.getElementById("logged-in");
const userName = document.getElementById("userName");
const logout = document.getElementById("logout");
const errorOccur = document.getElementById("errorOccur");
const dots = document.getElementById("dots");


loggedin.classList.add("hide");
logout.addEventListener('click',(event)=>{
    event.preventDefault();
    loggedin.classList.toggle("hide");
    errorOccur.classList.toggle("hide");
    if(loggedin.classList.contains("hide")){
        console.log("logged in contains hide after logount click.")
    }else{
        console.log("not contan hide after logout")
    }
    formfield.classList.toggle("hide")
});
// container.classList.toggle("hide");
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formdata = new FormData(form);
    const data = Object.fromEntries(formdata);
    console.log(JSON.stringify(data));

    login(data);
})

loginBtn.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
      submitBtn.style.backgroundColor = 'red';
      submitBtn.style.color = 'white';
    }
  })
function login(data){
    {
        console.log("on login function");
        dots.classList.remove("hide");
        loginBtn.value = "wait";
        loginBtn.disabled = true;
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST','https://form-data-submission-2ew5.onrender.com/login');
    xhr.setRequestHeader('content-type','application/json');
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                console.log("logged in");
                formfield.classList.toggle("hide");
                
                loggedin.classList.toggle("hide");
                
                const userdata = JSON.parse(xhr.responseText);
                userName.innerText = `Hi, ${userdata.user.firstName}`
                console.log(xhr.responseText);
                form.reset();
            }else if(xhr.status === 404){
                console.log("check you password",xhr.responseText);
                errorOccur.classList.remove("hide");
                errorOccur.innerText = `Incorrect username or password.`;
            }else{
                console.log("Error",xhr.response);
                errorOccur.innerText = `some error occured. Try after sometime`;
            }
            
    dots.classList.add("hide");
    loginBtn.value = "Login";
        }
    }
    xhr.send(JSON.stringify(data));
    
    loginBtn.disabled = false;
}


// getuser.addEventListener('click',fetchdata);

// function fetchdata(){
//     // window.location.reload();
//   var userHTML = ""
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET','http://localhost:4000/getusers',true);
//   xhr.onreadystatechange = function(){
//     if(xhr.readyState === XMLHttpRequest.DONE){
//       if(xhr.status === 200){
//         console.log("data fetched");
//         var jsondata = JSON.parse(xhr.responseText);
        
//         jsondata.data.forEach(user => {
//           console.log(user);
//            userHTML = `<p>Name : ${user.firstName} ${user.lastName} ,Email : ${user.Email}, Number : ${user.phoneNumber}, Age : ${user.Age}, gender : ${user.gender}</p>`
//         userData.innerHTML += userHTML;
//         });
//       }else{
//         console.log("Error : ",xhr.statusText);
//       }
//     }
//   }
//   xhr.send();
// }