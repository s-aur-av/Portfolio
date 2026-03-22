function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}
// function handleSubmit() {
//   document.getElementById("success-msg").innerText = "🚀 Sending...";

//   setTimeout(() => {
//     document.getElementById("success-msg").innerText = "✅ Message sent successfully!";
//   }, 1500);

//   return true; // VERY IMPORTANT
// }
function handleSubmit() {
  const msg = document.getElementById("success-msg");

  msg.innerText = "🚀 Sending...";

  setTimeout(() => {
    msg.innerText = "✅ Message sent successfully!";
    document.querySelector("form").reset();
  }, 1500);

  return true;
}
