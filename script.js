// Get references to the necessary elements
const imageInput = document.getElementById('imageInput');
const convertButton = document.getElementById('convertButton');

// Add a listener to the convert button
convertButton.addEventListener('click', convertTo8BitBMP);

// Function to handle the conversion process
function convertTo8BitBMP() {
  const file = imageInput.files[0];
  if (!file) {
    alert('Please select a file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      // Convert the image to an 8-bit BMP format using UPNG.js
      const bmpData = UPNG.encode([img], img.width, img.height, 256, [0, 1, 2, 3]);

      // Create a Blob object from the BMP data
      const blob = new Blob([bmpData], { type: 'image/bmp' });

      // Create a temporary anchor element to trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'converted_image.bmp';
      document.body.appendChild(downloadLink);

      // Programmatically trigger the download
      downloadLink.click();

      // Remove the temporary anchor element
      document.body.removeChild(downloadLink);
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}