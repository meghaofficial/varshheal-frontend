function recolorImage(imageSrc, hexColor, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageSrc;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = hexColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    callback(canvas.toDataURL());
  };
}

function getColoredImage(publicId, hex) {
  return `https://res.cloudinary.com/YOUR_CLOUD/image/upload/e_colorize:80,co_rgb:${hex.replace('#','')}/${publicId}`;
}

export default recolorImage;