const btn = document.getElementById("workBtn");

btn.addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({
    behavior: "smooth"
  });
});
