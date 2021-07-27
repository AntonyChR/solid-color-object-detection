export default function processVideo($video, $canvas){
    //color of the object to detect in RGB
    const colorToDetect = { r: 255, g: 255, b: 0 };
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 360, 360, 0, 0, $canvas.width, $canvas.height);
    var imgData = context.getImageData(0, 0, $canvas.width, $canvas.height);
    var pixels  = imgData.data;

    var tolerableRange = 184,
        xSum = 0,
        ySum = 0,
        numPixelsFound = 0;
        
    for(let p = 0; p < pixels.length; p+=4){
        const red = pixels[p],
            green = pixels[p + 1],
            blue  = pixels[p + 2],
            alpha = pixels[p + 3];

        var distance = Math.sqrt(
            Math.pow(colorToDetect.r - red  , 2) +
            Math.pow(colorToDetect.g - green, 2) +
            Math.pow(colorToDetect.b - blue , 2) 
        );
        
        if(distance < tolerableRange){
            pixels[p] = 250;
            pixels[p + 1] = 0;
            pixels[p + 2] = 0;
            var y = Math.floor(p / 4 / $canvas.width),
                x = (p / 4) % $canvas.width;
            xSum += x;
            ySum += y;
            numPixelsFound ++;
        }
    }
    
    context.putImageData(imgData,0, 0);
    if(numPixelsFound > 0){
        context.fillStyle = "#00f";
        context.beginPath();
        context.arc(xSum / numPixelsFound, ySum / numPixelsFound, 10, 0, 2 * Math.PI);
        context.fill();
    }
    setTimeout(() => {
        processVideo($video, $canvas);
    }, 20);
}
