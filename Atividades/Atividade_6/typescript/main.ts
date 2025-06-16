import { pedregulho, pickaxe_sword, Inventario } from "./itens";
import { funil, funilDeque } from "./funil";

const addBtn = document.querySelector<HTMLButtonElement>("#add_item")!;
const remBtn = document.querySelector<HTMLButtonElement>("#remove_item")!;
const list   = document.querySelector<HTMLUListElement>("#list")!;

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