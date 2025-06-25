import { funil, funilDeque } from "./funil.js";
import { cobblestone, coal, sword_d, diamant, gold } from "./itens.js";
import { empilhamentoItens } from "./empilhamentoItens.js";
import { trouxa } from "./trouxa.js";
//Fila com Node
funil.add_item(cobblestone);
funil.add_item(coal);
funil.print();
funil.peek();
funil.add_item(cobblestone);
funil.remove_item();
funil.add_item(diamant);
funil.print();
//Fila Deque
funilDeque.addBack(gold);
funilDeque.addFront(sword_d);
funilDeque.addBack(cobblestone);
funilDeque.toString();
funilDeque.isEmpty();
funilDeque.addFront(coal);
funilDeque.removeBack();
funilDeque.addBack(cobblestone);
funilDeque.removeFront();
funilDeque.toString();
//Pilha com Node
trouxa.isEmpty();
trouxa.push(coal);
trouxa.push(sword_d);
trouxa.push(diamant);
trouxa.peek();
trouxa.print();
trouxa.pop();
trouxa.print();
//Pilha como objeto
empilhamentoItens.isEmpty();
for (let i = 0; i < 65; i++) {
    empilhamentoItens.push('Pedregulho');
}
empilhamentoItens.peek();
empilhamentoItens.pop();
empilhamentoItens.toString();
empilhamentoItens.push('Pedregulho');
