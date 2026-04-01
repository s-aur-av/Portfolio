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

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

const counters = document.querySelectorAll(".count");

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;

    const increment = target / 50;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(update, 30);
    } else {
      counter.innerText = target;
    }
  };

  update();
});