import { Itens } from "./itens";
import { Funil } from "./funil";

const pedregulho = new Itens('Pedregulho', 64);
const funil = new Funil();

funil.add_item(pedregulho)
funil.add_item(pedregulho)
funil.add_item(pedregulho)
funil.print()