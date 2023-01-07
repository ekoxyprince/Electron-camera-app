// var video = document.createElement('video');
// video.setAttribute('playsinline', '');
// video.setAttribute('autoplay', '');
// video.setAttribute('muted', '');
// video.style.width = '200px';
// video.style.height = '200px';

// /* Setting up the constraint */
// var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
// var constraints = {
//   audio: false,
//   video: {
//    facingMode: facingMode
//   }
// };

// /* Stream it to video element */
// navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
//   video.srcObject = stream;
// });
// Notification.requestPermission().then(function (permission) {
//     console.log(permission);
// });
var video = document.getElementById('camera'); 
var captureBtn = document.getElementById('capture-image')
var imageTag = document.getElementById('img')
var facingMode = "user"
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = '200px';
video.style.height = '200px';
captureBtn.addEventListener('click',function(){
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    let image_data_url = canvas.toDataURL('image/jpeg');
    // let image_data_url = canvas.toDataURL();
    // imageTag.src = image_data_url;
    window.electronAPI.sendImage(image_data_url)
    // if(typeof Notification !== "undefined"){
    // new Notification("image Captured",{body: "Image Captured Successfully"})
    // }
    // data url of the image
    // console.log(image_data_url); 
})
navigator.mediaDevices.getUserMedia({video: {facingMode:facingMode}, audio: false}).then(function success(stream){
    // console.log(stream)
    video.srcObject = stream;
})
console.log(window.electronAPI);
