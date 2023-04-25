const reviewContainer = document.querySelector("review-container")
const btn1 = document.querySelector("btn1")
const btn2 = document.querySelector("btn2")

reviewContainer.forEach((item, i) => {
    let containerDimmensions = item.getBoundingClientRect();
    let containerWidth = containerDimmensions.width;

    btn1[i].addEventListener("click", () => {
        item.scrollLeft += containerWidth;
    })

    
    btn2[i].addEventListener("click", () => {
        item.scrollLeft -= containerWidth;
    })
})