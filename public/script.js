const carousel = document.querySelector(".review-container")
const arrowBtn = document.querySelectorAll(".review button")
const firstCardWidth = carousel.querySelector(".review-cards").offsetWidth;

arrowBtn.forEach( function(btn) { 
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? - firstCardWidth : + firstCardWidth;
    })
})


const faqs = document.querySelectorAll(".FAQ")

faqs.forEach(function(faq) {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active")
    })
})

const products = document.querySelectorAll(".products")
const cart = document.querySelector(".cart")

console.log(cart);

products.forEach(function(mover) {
    mover.addEventListener("mouseover", () => {
        cart.classList.toggle("add")
    })
})

