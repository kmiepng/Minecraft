import { pedregulho } from "./itens.js";
import { funil } from "./funil.js";
const addBtn = document.querySelector("#add_item");
const remBtn = document.querySelector("#remove_item");
const list = document.querySelector("#list");
// atualiza a lista na tela
function render() {
    list.innerHTML = "";
    funil.toArray().forEach(element => {
        const p = document.createElement("p");
        p.textContent = element;
        list.appendChild(p);
    });
}
addBtn.addEventListener("click", () => {
    funil.add_item(pedregulho);
    render();
});
remBtn.addEventListener("click", () => {
    funil.remove_item();
    render();
});
render();
