const carousel = document.querySelector(".review-container")
const arrowBtn = document.querySelectorAll(".review button")
const firstCardWidth = carousel.querySelector(".review-cards").offsetWidth;

arrowBtn.forEach( function(btn) { 
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? - firstCardWidth : + firstCardWidth;
    })
})


const faq = document.querySelectorAll(".faq-q").toArray()
const answer = document.querySelectorAll(".answer").toArray()


faq.forEach(function(item) {
    item.addEventListener("click", function() {
        answer.classList.toggle("show")
    })
})