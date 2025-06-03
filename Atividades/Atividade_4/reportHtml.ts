function escreverHtml(array : any[]){
    const dados = document.getElementById("Inventário")
    let html = '';
    for (let i = 0; i < array.length; i ++){
        html += `
        <h2><strong>Jogador(a):</strong> ${array[i].nome}</h2>
        <p><strong>Dificuldade:</strong> ${array[i].dificuldade}</p>
        `
        html += '<ul>'
        for (const slot of array[i].inventario){
            if (slot !== undefined){
                html += `<li>${slot.nome}, x${slot.quantidade}</li>`;
            } else {
                html += '<li>[   vazio   ]</li>';
            }
        }
    }
    html += '</ul>';
    dados!.innerHTML = html;
}

function escreverInventario(){
    document.addEventListener("DOMContentLoaded", async () =>{
        const response = await fetch("jogadores.json");
        const jogadores = await response.json();
        escreverHtml(jogadores)
    });
}

escreverInventario();