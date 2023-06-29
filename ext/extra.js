// // //manifest 
// {
//     "manifest_version": 3,
//     "name": "Content Copy Extension",
//     "version": "1.0",
//     "permissions": [
//       "scripting",
//       "activeTab",
//       "tabs"
//     ],
//     "action": {
//       "default_popup": "popup.html",
//       "default_icon": {
//         "16": "save.png",
//         "48": "save.png",
//         "128": "save.png"
//       }
//     },
//     "background": {
//       "service_worker": "./background.js"
//     },
//     "icons": {
//       "16": "save.png",
//       "48": "save.png",
//       "128": "save.png"
//     },
//     "host_permissions": [
//       "https://example.com/*"

//     ],
//     "content_scripts": [
//       {
//         "js": ["content.js"],
//         "matches": ["<all_urls>"],
//         "run_at": "document_end"
//       }
//     ]
//   }
  
// // Content script code
// console.log(" hello my name is Sagar" );
// document.addEventListener("copy", async function () {
//   var arr =[];
//   arr[0]='content.js'
//   const tName=document.activeElement.tagName
//   console.log(tName);
//   // document.getElementById(tName).style.backgroundColor="yellow";
//   const nav = await navigator.clipboard.readText();
//     console.log(nav);
//     arr.push(nav);
    
//       // Send a message to the background script
//        chrome.runtime.sendMessage({ message: arr },(res)=>{
//          const resp = res.message;
//          console.log(`ARRAY ;- ${resp}`)
//           }
//       );
    
//   });



// // background script
// console.log("Second");
// var copycontent = {};

// chrome.tabs.onActivated.addListener((tab)=>{
//     console.log(tab.tabId.documentElement);

// }
//   );
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//         // Process the message
//         const msg = message;
//         if(msg.message[0]=='content.js'){
//           const url =sender.url;
//           console.log("Received message from content:", message,"sender:",sender);
//           if (url in copycontent == true){
            
//             copycontent[url].push(msg.message[1]);

//           }
//           else{
//             copycontent[url] = [];
//             copycontent[url].push(msg.message[1]);

//           }
//           console.log(copycontent)
//         }
//         else{
//           console.log("Received message:", message,"sender:",sender);

//         }

//         fetch('/',{
//           method: "POST",
//           headers:{
//             "Content-Type":"applicatio/json",

//           },

//           body: JSON.stringify(copycontent)
//         }
//         )
//         sendResponse({message: JSON.stringify(copycontent)})
//       });








  
// // //   // Popup script code
// // // Popup script code
// // Popup script code
// console.log("first")

// document.addEventListener("DOMContentLoaded", function () {
//   // Find the copyButton element
//   const copyButton = document.getElementById("copyButton");

//   // Add a click event listener to the copyButton
//   copyButton.addEventListener("click", function () {
//     // Send a message to the background script
//     chrome.runtime.sendMessage({ message: "Hello, kem cho!" });
//   });
// });




// const submit = document.getElementById('submit');
// submit.addEventListener('click', async () => {
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const response = await fetch('http://localhost:3001/auth/login', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",

//     },

//     body: JSON.stringify({ mail_id: email, password: password })
//   });
//   const responseData = await response.text(); // Parse response body as JSON

//   console.log(response,responseData);

//   if (responseData === 'Auth Successful') {
//     // console.log(responseData);
//     // location.replace('./cextension.html');
//   } 
//   // else {
//   //   location.replace('./popup.html');
//   // }
// });

// //  //backend index.js     
// const express  = require('express');
// const bodyParser =require('body-parser')
// const app = express();
// const Port = 3000;
// app.use(bodyParser.json());
// app.get('/',(req,res)=>{
//     console.log(JSON.stringify(req.body.json()));

//   // Send the response back to the client
//   res.send('hello world');

// })
// app.listen(3000,()=>{
//     console.log(`http://localhost:${Port}`)
//     }
// )

// //cextension.js

// workspaceList.addEventListener('click',
//   async() => {
//     // Send a message to the background script
//     //  chrome.runtime.sendMessage({ message: "Hello, kem cho!" });
//     const res =  await fetch('http://localhost:3001/user');
    
//         console.log(await res.text());     
   
//     // });
//   }
// )

