
// background script
console.log("Second");
let copycontent = {};
let id ;

// In the background script

  chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
    // const msg = message;

        if(message.value){
          console.log("Received message:", message,"sender:",sender);
          console.log(message.value)
          id=message.value;
        }
        // Process the message
        else if(message.msg[0]=="content.js"){
          console.log("Received message from content:", message,"sender:",sender);
          // if (url in copycontent == true){
            
          //   copycontent[url].push(msg.message[1]);

          // }
          // else{
            // copycontent[url] = [];
            copycontent.id=id;
            copycontent.url= sender.url;
            copycontent.content=message.msg[1];


          // }
          console.log(copycontent);
        
       
        fetch('http://localhost:3001/user/item',{
          method: "POST",
          headers:{
              // Authorization:`Bearer ${tokn.token}`,
                credentials:'include',
                "Content-Type":"application/json"
          },

          body: JSON.stringify(copycontent)
        }
        ).then((res)=>{

          console.log(res);
          sendResponse({message: JSON.stringify(copycontent)})
        })
      }       });
      // chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
      //     if (message.msg[0]=="content.js") {
      //         console.log(message.msg[1]);
      //     }
      //     })