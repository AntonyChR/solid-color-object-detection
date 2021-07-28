import processVideo from "./processVideo.js";

const d = document;
export default function webCam() {
  
  const $video  = d.getElementById("video");
  const $canvas = d.getElementById("canvas");
  var colorToDetect = { r: 255, g:255, b:0 };
  var tolerableRange = 150;
  const heightVid = 360;
  const widthVid  = 360;
  var options = {
    audio: false,
    video: {
      width: widthVid,
      height: heightVid,
    },
  };

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(options)
      .then((stream) => {
        $video.srcObject = stream;
        processVideo($video, $canvas,colorToDetect, tolerableRange);
      })
      .catch((error) => console.log("error: ", error));
  } else {
    console.log("there is no getUserMedia() function");
  }
}
