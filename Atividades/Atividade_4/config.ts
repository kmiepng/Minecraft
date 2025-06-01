import fs from "fs";
import { Itens, tipoArmadura, tipoItem } from "./typescript/itens";
import { Inventario_Armadura } from "./typescript/armadura_inventario";
import { Inventario } from "./typescript/inventario";

const configPath = "./jogoconfig.json";
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

let inventario = new Inventario();

config.inventario = inventario;

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

const html = `
  <html>
    <head><title>Relatório do Jogo</title></head>
    <body>
      <h1>${config.jogo}</h1>
      ${inventario.mostrarInventario()}
    </body>
  </html>
`;

fs.writeFileSync("relatorio.html", html);