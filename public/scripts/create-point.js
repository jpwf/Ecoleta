function populateUfs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

        .then((res) => { return res.json() })
        .then(states => {
            

            // busca dos nomes de estado e cidade
            for (const state of states) {
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
    stateInput.value = event.target.options[indexSS].text



    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`
    citiyselect.innerHTML = "<option value>Selecione a cidade</option>"
    citiyselect.disabled = true
    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citiyselect.innerHTML += `<option value="${city.nome}">${city.nome} </option>`
            }

            citiyselect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getcities)



// items de coleta
// pegar todos os lis
const ItemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of ItemsToCollect) {
    item.addEventListener("click", handleSelectedItem)

}

const collecteditems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    // adicionar ou remover uma classe com javascript
    const itemli = event.target

    itemli.classList.toggle("selected")

    const itemid = itemli.dataset.id
    console.log("ITEM ID: ", itemid)


    // verificar se existem itens selecionados
    // se sim pegar os itens selecionados

    const alreadyselected = selectedItems.findIndex(item => {
        const itemfound = item == itemid //isso será true ou false
        return itemfound
    })

    // se já estiver selecionado, retirar da seleção

    if (alreadyselected >= 0) {
        // tirar da seleção
        const filtereditems = selectedItems.filter(item => {
            const itemisdifferent = item != itemid //false
            return itemisdifferent
        })
        selectedItems = filtereditems
    } else {
        // adicionar à seleção
        selectedItems.push(itemid)

    }

    console.log("selecteditems: ",selectedItems)
    // se não estiver selecionado, adicionar à seleção

    // atualizar o campo escondido com os itens selecionados

    collecteditems.value = selectedItems
}

