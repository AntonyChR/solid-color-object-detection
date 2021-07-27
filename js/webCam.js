import processVideo from "./processVideo.js";

const d = document;
export default function webCam() {
  var $video  = d.getElementById("video");
  var $canvas = d.getElementById("canvas");

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
        processVideo($video, $canvas);
      })
      .catch((error) => console.log("error: ", error));
  } else {
    console.log("there is no getUserMedia() function");
  }
}
