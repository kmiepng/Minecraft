let experience_points = Math.random(); // quantidade de xp ganha ao abater monstro, usada para aprimorar certas habilidades de uma determinada ferramenta

const bloco_de_terra_com_grama = { //objeto com características simples de um bloco de terra com grama
    nome: "Terra com Grama", cor: "marrom e verde"
};

const pack_espaco_1 = new Array(64).fill(bloco_de_terra_com_grama); //simulei um pack de blocos, que pode ser preenchido com no máximo 64 blocos
                                                                    // essa variavel é const apenas para testar a função a seguir

function verificar_Qtd_blocos(pack){ //função simples para verificar se pode pegar mais um objeto para o pack ou não
    if (pack.length === 64) {
        console.log("Não é mais possível adicionar blocos nesse pack, criando novo pack para preencher")
        let pack_espaco_2 = new Array(64)
    }
}

function drop_Minerio(min_drop, max_drop){  //quantidade de minério que dropa após minerar um bloco de minério
    return Math.floor(Math.random() * (max_drop-min_drop +1)) + min_drop;
}