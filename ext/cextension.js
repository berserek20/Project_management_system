
workspaceList.addEventListener('click',
  async() => {
    // Send a message to the background script
    //  chrome.runtime.sendMessage({ message: "Hello, kem cho!" });
    // const token = localStorage.getItem('token');
    const res =  await fetch('http://localhost:3000/ext', {
        method: "GET",
      });
        console.log(await res.text());     
   
    // });
  }
)

