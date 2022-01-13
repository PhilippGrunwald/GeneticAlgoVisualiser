let burger = document.querySelector(".burger");
let menu = document.querySelector(".menu");


burger.addEventListener('click', () => {
  menu.classList.toggle("toggleanim");
  burger.classList.toggle("burger--toggle-anim")
  console.log("Hello");
})