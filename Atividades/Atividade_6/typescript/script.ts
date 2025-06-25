//Incompleto

import { diamant, gold, cobblestone, sword_d, coal } from "./itens";
import { funil, funilDeque } from "./funil";

const addBtn = document.querySelector<HTMLButtonElement>("#add_item")!;
const remBtn = document.querySelector<HTMLButtonElement>("#remove_item")!;
const list   = document.querySelector<HTMLUListElement>("#list")!;

// atualiza a lista na tela
function render() {
    list.innerHTML = "";
    funil.toArray().forEach(element => {
        const li = document.createElement("li");
        li.textContent = element;
        list.appendChild(li);
    });
}
addBtn.addEventListener("click", () => {
    const recursos = [diamant, gold, cobblestone, sword_d, coal];
    const r = recursos[Math.floor(Math.random() * recursos.length)];
    funil.add_item(r);
    render();
});

remBtn.addEventListener("click", () => {
  funil.remove_item();
  render();
});

render();