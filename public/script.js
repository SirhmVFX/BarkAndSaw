const carousel = document.querySelector(".review-container")
const arrowBtn = document.querySelectorAll(".review button")
const firstCardWidth = carousel.querySelector(".review-cards").offsetWidth;

arrowBtn.forEach( function(btn) { 
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? - firstCardWidth : + firstCardWidth;
    })
})