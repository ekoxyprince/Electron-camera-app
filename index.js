let ImageTag = document.getElementById("image-tag");
window.electronAPI.getImage((event,data)=>{
    console.log(event,data)
    ImageTag.src = data
  new Notification("image Captured",{body: "Image Captured Successfully"})
    window.electronAPI.closeWin2();
});


//https://levelup.gitconnected.com/creating-browser-notification-in-javascript-79e91bfb76c8