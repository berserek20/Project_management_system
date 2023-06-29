// Content script code
console.log(" hello my name is Sagar" );
document.addEventListener("copy", async function () {
  var arr =[];
  arr[0]='content.js'
  const tName=document.activeElement.tagName
  console.log(tName);
  // document.getElementById(tName).style.backgroundColor="yellow";
  const nav = await navigator.clipboard.readText();
    console.log(nav);
    arr.push(nav);
    // const dat =await navigator;
    // console.log( dat);
  
      // Send a message to the background script
       chrome.runtime.sendMessage({ message: arr },(res)=>{
             const resp = res.message;
            console.log(`ARRAY :- ${JSON.stringify(resp)}`)
      }
      );
    
  });

//     // Listen for messages from the popup
// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//   if (request.message[0] === 'popup.js') {
//     console.log('Message received in content.js:', request.message);


//     // Do something in response to the message
//     const response = await fetch('http://localhost:3001/auth/login', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify({ mail_id: request.message[1], password: request.message[2] })
//     });
//     const responseData = await response.text();

//     console.log(response, responseData);

//     if (responseData === "Auth Successful") {
//       console.log("Auth Successful");
//       // Perform the desired action after successful authentication
//     }
//   }
// });

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "popup.js") {
    console.log("Message received in content.js:", request.message);
    // Handle the message from the popup script here

    // Send a response back to the popup script
    sendResponse({ message: "Response from content.js" });
  }
});