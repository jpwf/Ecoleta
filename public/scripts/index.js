const buttonsearch = document.querySelector("#page-home main button")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal header button")
const admway = document.getElementById("admb")
const createpoint = document.getElementById("create-point")






buttonsearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})


close.addEventListener("click", () => {
    modal.classList.add("hide")

})

admway.addEventListener("click", () =>{
    window.location = "/adm"
})

createpoint.addEventListener("click", () =>{
    window.location = "/create-point"
})