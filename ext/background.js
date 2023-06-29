// // Retrieve the CSRF token from the cookie
// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== '') {
//       const cookies = document.cookie.split(';');
//       for (let i = 0; i < cookies.length; i++) {
//           const cookie = cookies[i].trim();
//           // Extract the CSRF token
//           if (cookie.substring(0, name.length + 1) === (name + '=')) {
//               cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//               break;
//           }
//       }
//   }
//   return cookieValue;
// }
// background script
console.log("Second");
let copycontent = {};

// chrome.tabs.onActivated.addListener((tab)=>{
//     console.log(tab.tabId.documentElement);

// }
  // );
  chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
        // Process the message
        const msg = message;
        if(msg.message[0]=='content.js'){
          console.log("Received message from content:", message,"sender:",sender);
          // if (url in copycontent == true){
            
          //   copycontent[url].push(msg.message[1]);

          // }
          // else{
            // copycontent[url] = [];
            copycontent.url= sender.url;
            copycontent.content=msg.message[1];

          // }
          console.log(copycontent)
        }
        else{
          console.log("Received message:", message,"sender:",sender);

        }
        // const csrfToken = getCookie('csrftoken'); // Get the CSRF token

         fetch('http://localhost:3000',{
          method: "POST",
          headers:{
            "Content-Type":"application/json",
            // "X-CSRFToken": csrfToken // Include the CSRF token in the headers

          },

          body: JSON.stringify(copycontent)
        }
        ).then((res)=>{
          console.log(res);
        })
        sendResponse({message: JSON.stringify(copycontent)})
        // console.log(text)
      });


// background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageCookie,
  });
});








  