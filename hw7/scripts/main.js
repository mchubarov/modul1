const burgerIcon = document.getElementById("burgerIcon");
const mobileMenu = document.getElementById("mobileMenu");
const closeIcon = document.getElementById("closeIcon");
const rectangleIconWrapper = document.querySelector(".rectangle-icon-wrapper");

burgerIcon.addEventListener("click", () => {
	mobileMenu.style.display = "block";
	rectangleIconWrapper.style.display = "none";
	mobileMenu.classList.add("active");
});

closeIcon.addEventListener("click", () => {
	mobileMenu.style.display = "none";
	rectangleIconWrapper.style.display = "flex";
	mobileMenu.classList.remove("active");
});
