import { funil, funilDeque } from "./funil";
import { cobblestone, coal, sword_d, diamant, gold } from "./itens";
import { empilhamentoItens } from "./empilhamentoItens";
import { trouxa } from "./trouxa";
//Fila com Node
console.log("=====Funil=====")
funil.add_item(cobblestone);
funil.add_item(coal);
console.log(funil.print());
console.log(funil.peek());
funil.add_item(cobblestone);
funil.remove_item();
funil.add_item(diamant);
console.log(funil.print());
//Fila Deque
console.log("===Funil Deque===")
funilDeque.addBack(gold);
funilDeque.addFront(sword_d);
funilDeque.addBack(cobblestone);
console.log(funilDeque.toString());
console.log(funilDeque.isEmpty());
funilDeque.removeBack();
funilDeque.addBack(coal);
funilDeque.addFront(cobblestone);
console.log(funilDeque.toString());
//Pilha com Node
console.log("=====Trouxa=====")
console.log(trouxa.isEmpty());
trouxa.push(coal);
trouxa.push(sword_d);
trouxa.push(diamant);
console.log(trouxa.peek());
console.log(trouxa.print());
trouxa.pop();
console.log(trouxa.print());
//Pilha como objeto
console.log("==Empilhando itens==")
empilhamentoItens.isEmpty();
for (let i = 0; i < 65; i++) {
    empilhamentoItens.push('Pedregulho');
}
console.log(empilhamentoItens.peek());
empilhamentoItens.pop();
console.log(empilhamentoItens.toString());
empilhamentoItens.push('Pedregulho');