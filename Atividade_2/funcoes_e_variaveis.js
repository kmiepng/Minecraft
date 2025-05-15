class Ferramenta{
    constructor(nome, material, durabilidade, velocidade){
        this.nome = nome; //nome da ferramenta
        this.material = material; //de que material ela é feita, ex: picareta de ferro
        this.durabilidade = durabilidade; //quantos blocos consegue quebrar antes de acabar a ferramenta
        this.velocidade = velocidade; //velocidade de quebra dos blocos
    }
}

class Bloco{
    constructor(nome, cores, resistência){
        this.nome = nome; //nome do bloco
        this.cores = cores; //esquema de cores simples do bloco
        this.resistência = resistência; //depende da ferramenta que usa, se ta quebrando com a mao ou não
        // alguns blocos só quebram com picareta
    }
}

let experience_points = Math.random(); // quantidade de xp ganha ao abater monstro
// usada para aprimorar certas habilidades de uma determinada ferramenta

function verificar_Qtd_blocos(pack){ //função simples para verificar se pode pegar mais um objeto para o pack ou não
    if (pack.length === 64) {
        console.log("Não é mais possível adicionar blocos nesse pack, criando novo pack para preencher")
        let pack_espaco_2 = new Array(64)
    }
}

function drop_Minerio(min_drop, max_drop){  //quantidade de minério que dropa após minerar um bloco de minério
    return Math.floor(Math.random() * (max_drop-min_drop +1)) + min_drop;
}