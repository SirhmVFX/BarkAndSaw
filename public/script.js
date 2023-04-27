const carousel = document.querySelector(".review-container")
const arrowBtn = document.querySelectorAll(".review i")
const firstCardWidth = carousel.querySelector(".review-cards").offsetWidth;

arrowBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn === "left" ? -firstCardWidth : firstCardWidth;
    })
})


