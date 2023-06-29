// Content script code
console.log(" hello my name is Sagar" );

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message === "backgroundReady") {
    document.addEventListener("copy", async function () {
      var arr =[];
      arr[0]='content.js'
      
      const nav = await navigator.clipboard.readText();
        console.log(nav);
        arr.push(nav);
        
      
          // Send a message to the background script
          chrome.runtime.sendMessage({ msg: arr },(res)=>{
                const resp = res.message;
                console.log(`ARRAY :- ${JSON.stringify(resp)}`)
          }
          )
      });
//   }
// });