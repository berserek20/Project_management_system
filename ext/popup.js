// Popup script code
console.log("first")


document.addEventListener("DOMContentLoaded", function () {
  // Find the copyButton element
  const copyButton = document.getElementById("copyButton");

  // Add a click event listener to the copyButton
  copyButton.addEventListener("click", function () {
    // Send a message to the background script
    chrome.runtime.sendMessage({ message: "Hello, kem cho!" });
  });
});
const workspaceList = document.getElementById("workspaceList");

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


const submit = document.getElementById('submit');
document.addEventListener("DOMContentLoaded", function () {
submit.addEventListener('click', async () => {

  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
      // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var arrpop =[];
      arrpop.push('popup.js');
      arrpop.push(email);
      arrpop.push(password);
      chrome.tabs.sendMessage(tabs[0].id, { message: "popup.js "});
    });
  });
});
