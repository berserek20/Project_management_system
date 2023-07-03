// Popup script code
console.log("first")


// document.addEventListener("DOMContentLoaded", function () {
//   // Find the copyButton element
//   const copyButton = document.getElementById("copyButton");

  // Add a click event listener to the copyButton
//   copyButton.addEventListener("click", function () {
//     // Send a message to the background script
//     chrome.runtime.sendMessage({ message: "Hello, kem cho!" });
//   });
// });
// const workspaceList = document.getElementById("workspaceList");

// workspaceList.addEventListener('click',
//   ()=> {
//     // Send a message to the background script
//     //  chrome.runtime.sendMessage({ message: "Hello, kem cho!" });
//     // location.replace('./cextension.html');
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       const tabId = tabs[0].id;
//       // Change the popup for the current tab
//       chrome.action.setPopup({ tabId, popup: "./cextension.html" });
//       console.log(tabId);
//     });
//   }
// )
let tokn={};
if(tokn.token){
  document.getElementById('credentials').style.display="none";
  document.getElementById('workspaceList').style.display="block";
}

const login = document.getElementById('login');
// document.addEventListener("DOMContentLoaded", function () {
login.addEventListener('click', async () => {

  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
    
      console.log(email,password)
      const res =  await fetch('http://localhost:3001/auth/login', {
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({ mail_id:email,password:password})
      });
      // console.log(await res.json(),res.token)
        tokn = await res.json();
        console.log(tokn.token)
      if(tokn.token){
        document.getElementById('credentials').style.display="none";
        document.getElementById('workspaceList').style.display="block";
      }
          // location.replace('./cextension.html')
  });
// });
const workspaceList = document.getElementById('workspaceList');

workspaceList.addEventListener('click',
  async() => {
    // Send a message to the background script
    //  chrome.runtime.sendMessage({ message: "Hello, kem cho!" });
    // const token = localStorage.getItem('token');
    const res =  await fetch('http://localhost:3001/user', {
            method: "GET",
            headers:{
              Authorization:`Bearer ${tokn.token}`,
                credentials:'include'
            }
        });
     
      const data=await res.json();
      console.log("res.text",data);     
      let arr=[];
      arr.push(data[0]._id);
      arr.push(data[1]._id);
        console.log(arr);

        const buttonContainer = document.getElementById("button-container");
        
        
        arr.forEach((buttonText) => {
          const button = document.createElement("button");
          button.textContent = buttonText;
          button.addEventListener("click", (event) => {
            const clickedButtonValue = event.target.textContent;
            // event.target.style.borderColor='blue;'
            console.log(clickedButtonValue);
            // Perform further actions with the clickedButtonValue
            chrome.runtime.sendMessage({ value: clickedButtonValue });

          });
          buttonContainer.appendChild(button);
        });
        
        
    // });
  }
)
