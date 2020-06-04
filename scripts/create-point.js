function populateUfs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    .then( states => {

for( const state of states ) {
    ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
}

        
    })
}
populateUfs()

function getcities(event) {
    const citiyselect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    

    const ufvalue = event.target.value
    

    const indexSS = event.target.selectedIndex
    stateInput.value= event.target.options[indexSS].text

    

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for( const city of cities ) {
            citiyselect.innerHTML += `<option value="${city.id}">${city.nome} </option>`
        }

        citiyselect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getcities)