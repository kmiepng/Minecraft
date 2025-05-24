class Mob{ //estou criando um mob pra testar se as armaduras tão dando dano ou não
    constructor(nome : string, vida : number){
        this.nome = nome;
        this.vida = vida;
    }
    nome : string;
    vida : number;
    atacar(min_dano = 1, max_dano = 10){ //aqui retorna o dano q o mob deu
        let dano = Math.floor(Math.random() * (max_dano - min_dano + 1)) + min_dano;
        return dano;
    }
    receber_dano(dano : number){ //aqui retorna o dano q o mob recebeu
        this.vida > 0? this.vida -= dano : console.log(`${this.nome} morreu!`); //se a vida for 0, claramente morreu
        return this.vida;
    }
    info_mob(){
        let informacao = `${this.nome}, Vida: ${this.vida}` //informações do mob pra testar no código principal
    }
}

//essa vida aleaória é só pra eu n ter q pensar toda vez na hr de criar o mob aleatorio
function vida_aleatoria(max_vida = 20, min_vida = 10){
    let vida = Math.floor(Math.random() * (max_vida - min_vida + 1)) + min_vida;
    return vida
}

export {Mob, vida_aleatoria};