const textInput = document.getElementById("text");
const qrCode = document.getElementById("qrcode");
const downloadBtn = document.getElementById("downloadBtn");
const statusText = document.getElementById("status");

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle("error", isError);
}

function resetQR() {
  qrCode.innerHTML = "<span>QR preview</span>";
  qrCode.classList.add("qr-placeholder");
  downloadBtn.disabled = true;
}

function generateQR() {
  const text = textInput.value.trim();

  if (!text) {
    setStatus("Enter text or a URL first.", true);
    textInput.focus();
    return;
  }

  qrCode.innerHTML = "";
  qrCode.classList.remove("qr-placeholder");

  new QRCode(qrCode, {
    text,
    width: 200,
    height: 200,
    colorDark: "#111827",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  downloadBtn.disabled = false;
  setStatus("QR code is ready.");
}

function downloadQR() {
  const canvas = document.querySelector("#qrcode canvas");
  const image = document.querySelector("#qrcode img");

  if (!canvas && !image) {
    setStatus("Generate a QR code before downloading.", true);
    return;
  }

  const link = document.createElement("a");
  const borderSize = 24;
  const sourceWidth = canvas ? canvas.width : image.naturalWidth;
  const sourceHeight = canvas ? canvas.height : image.naturalHeight;
  const outputCanvas = document.createElement("canvas");
  const context = outputCanvas.getContext("2d");

  outputCanvas.width = sourceWidth + borderSize * 2;
  outputCanvas.height = sourceHeight + borderSize * 2;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, outputCanvas.width, outputCanvas.height);

  if (canvas) {
    context.drawImage(canvas, borderSize, borderSize);
  } else {
    context.drawImage(image, borderSize, borderSize, sourceWidth, sourceHeight);
  }

  link.href = outputCanvas.toDataURL("image/png");
  link.download = "premium-qr-code.png";
  link.click();

  setStatus("Download started.");
}

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    generateQR();
  }
});

textInput.addEventListener("input", () => {
  if (!textInput.value.trim()) {
    resetQR();
    setStatus("");
  }
});
