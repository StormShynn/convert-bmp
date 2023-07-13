// Get references to the necessary elements
const imageInput = document.getElementById("imageInput");
const convertButton = document.getElementById("convertButton");

// Add a listener to the convert button
convertButton.addEventListener("click", convertTo8BitBMP);

// Function to handle the conversion process
function convertTo8BitBMP() {
  const file = imageInput.files[0];
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      // Convert the image to an 8-bit BMP format using UPNG.js
      const bmpData = UPNG.encode(
        [img],
        img.width,
        img.height,
        256,
        [0, 1, 2, 3]
      );

      // Compress the BMP data using pako
      const compressedData = pako.deflate(bmpData);

      // Create a Blob object from the compressed data
      const blob = new Blob([compressedData], { type: "image/bmp" });

      // Generate a temporary download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "converted_image.bmp";

      // Programmatically trigger the download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}
