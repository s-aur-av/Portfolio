function generateQR() {
  let text = document.getElementById("text").value;

  if (!text) {
    alert("Enter something!");
    return;
  }

  document.getElementById("qrcode").innerHTML = "";

  new QRCode(document.getElementById("qrcode"), {
    text: text,
    width: 200,
    height: 200
  });
}

function downloadQR() {
  let canvas = document.querySelector("#qrcode canvas");

  if (!canvas) {
    alert("Generate QR first!");
    return;
  }

  let link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "qr-code.png";
  link.click();
}